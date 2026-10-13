// Gera o mapa estático do estado de São Paulo usado na seção "Onde atendemos".
//
// Fonte: malha municipal do IBGE compilada em https://github.com/tbrugz/geodata-br
// (geojson/geojs-35-mun.json, licença CC0 1.0 — domínio público). O arquivo de origem
// não fica no repositório (1,9 MB); baixe-o e rode:
//
//   node src/tools/mapa-sp.mjs caminho/para/geojs-35-mun.json
//
// Saídas (versionadas):
//   src/data/mapa-sp.json                  contorno do estado (path SVG) e parâmetros da projeção
//   assets/img/mapa-sp-municipios.svg      divisas municipais, carregadas como imagem (cache)
//
// Sem dependências: projeção de Mercator ajustada ao quadro, contorno obtido dissolvendo
// os municípios (arestas que aparecem uma vez só) e simplificação de Douglas-Peucker.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const SRC = process.argv[2];
if (!SRC) {
  process.stderr.write("Uso: node src/tools/mapa-sp.mjs geojs-35-mun.json\n");
  process.exit(1);
}

const W = 640, H = 512, PAD = 24;
const geo = JSON.parse(readFileSync(SRC, "utf8"));

// 1. Arestas de todos os anéis, com vértices quantizados (as malhas do IBGE compartilham vértices).
const key = ([x, y]) => `${x.toFixed(6)},${y.toFixed(6)}`;
const coord = new Map();
const edges = new Map();
for (const f of geo.features) {
  const g = f.geometry;
  const polys = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
  for (const rings of polys) {
    for (const ring of rings) {
      for (let i = 0; i < ring.length - 1; i++) {
        const a = key(ring[i]), b = key(ring[i + 1]);
        if (a === b) continue;
        coord.set(a, ring[i]);
        coord.set(b, ring[i + 1]);
        const e = a < b ? `${a}|${b}` : `${b}|${a}`;
        edges.set(e, (edges.get(e) ?? 0) + 1);
      }
    }
  }
}

// 2. Separa contorno (aresta de um município só) e divisas internas (compartilhadas).
const outer = [], inner = [];
for (const [e, n] of edges) (n === 1 ? outer : inner).push(e.split("|"));

function chains(list) {
  const adj = new Map();
  const add = (a, b, id) => (adj.get(a) ?? adj.set(a, []).get(a)).push({ to: b, id });
  list.forEach(([a, b], id) => { add(a, b, id); add(b, a, id); });
  const used = new Uint8Array(list.length);
  const out = [];
  const walk = (start) => {
    const line = [start];
    let cur = start;
    for (;;) {
      const next = (adj.get(cur) ?? []).find((n) => !used[n.id]);
      if (!next) break;
      used[next.id] = 1;
      line.push(next.to);
      cur = next.to;
      if (cur === start || adj.get(cur).length !== 2) break;
    }
    return line;
  };
  for (const [v, ns] of adj) if (ns.length !== 2) while (ns.some((n) => !used[n.id])) out.push(walk(v));
  for (const [v, ns] of adj) if (ns.some((n) => !used[n.id])) out.push(walk(v));
  return out.map((l) => l.map((k) => coord.get(k)));
}

// 3. Projeção de Mercator ajustada ao quadro (mesmo enquadramento do componente original).
const merc = ([lon, lat]) => [(lon * Math.PI) / 180, Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))];
const outline = chains(outer);
let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
for (const l of outline) for (const p of l) {
  const [x, y] = merc(p);
  x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
}
const k = Math.min((W - 2 * PAD) / (x1 - x0), (H - 2 * PAD) / (y1 - y0));
const tx = (W - k * (x1 + x0)) / 2;
const ty = (H + k * (y1 + y0)) / 2;
const project = (p) => { const [x, y] = merc(p); return [k * x + tx, ty - k * y]; };

// 4. Simplificação (Douglas-Peucker) em pixels.
function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = pts[a], [bx, by] = pts[b];
    const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1;
    let max = 0, idx = -1;
    for (let i = a + 1; i < b; i++) {
      const d = dx === 0 && dy === 0
        ? Math.hypot(pts[i][0] - ax, pts[i][1] - ay)
        : Math.abs(dy * pts[i][0] - dx * pts[i][1] + bx * ay - by * ax) / len;
      if (d > max) { max = d; idx = i; }
    }
    if (max > tol) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}

const r1 = (n) => Math.round(n * 10) / 10;
const toPath = (l) => "M" + l.map(([x, y]) => `${r1(x)} ${r1(y)}`).join(" ");

const area = (l) => Math.abs(l.reduce((s, [x, y], i) => { const [nx, ny] = l[(i + 1) % l.length]; return s + x * ny - nx * y; }, 0) / 2);
const rings = outline
  .map((l) => simplify(l.map(project), 0.55))
  .filter((l) => l.length > 3 && area(l) > 3);
const mesh = chains(inner).map((l) => simplify(l.map(project), 1.1)).filter((l) => l.length > 1);

const outlineD = rings.map((l) => toPath(l) + "Z").join("");
const meshD = mesh.map(toPath).join("");

writeFileSync(
  join(ROOT, "src/data/mapa-sp.json"),
  JSON.stringify({
    source: "IBGE — malha municipal (geodata-br, CC0 1.0)",
    width: W,
    height: H,
    projection: { k: +k.toFixed(4), tx: +tx.toFixed(3), ty: +ty.toFixed(3) },
    outline: outlineD,
  }, null, 2) + "\n"
);
writeFileSync(
  join(ROOT, "assets/img/mapa-sp-municipios.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"><path d="${meshD}" fill="none" stroke="#fff" stroke-opacity=".09" stroke-width=".6" stroke-linejoin="round"/></svg>\n`
);
process.stdout.write(`contorno: ${rings.length} anéis, ${outlineD.length} bytes · divisas: ${mesh.length} linhas, ${meshD.length} bytes\n`);
