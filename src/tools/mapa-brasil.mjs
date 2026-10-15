// Gera o mapa estático do Brasil usado na seção "Onde atendemos" das páginas
// institucionais e principais (as páginas locais usam o mapa de SP, src/tools/mapa-sp.mjs).
// Mesmo desenho do <mapa-brasil> das landing pages, sem d3 e sem chamadas externas.
//
// Fontes (não versionadas):
//   contorno do país   Natural Earth 1:10m via world-atlas@2.0.2 (countries-10m.json, ISC / domínio público)
//   divisas estaduais  malha municipal do IBGE em https://github.com/tbrugz/geodata-br
//                      (geojson/geojs-100-mun.json, CC0 1.0), dissolvida por UF
//
//   node src/tools/mapa-brasil.mjs geojs-100-mun.json countries-10m.json
//
// Saídas (versionadas): src/data/mapa-brasil.json (contorno e projeção) e
// assets/img/mapa-brasil-estados.svg (divisas estaduais, carregadas como imagem).
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const [MUN, ATLAS] = process.argv.slice(2);
if (!MUN || !ATLAS) {
  process.stderr.write("Uso: node src/tools/mapa-brasil.mjs geojs-100-mun.json countries-10m.json\n");
  process.exit(1);
}
const W = 600, H = 612, PAD = 26;

// 1. Contorno do país (TopoJSON quantizado do world-atlas).
const topo = JSON.parse(readFileSync(ATLAS, "utf8"));
const [sx, sy] = topo.transform.scale, [ox, oy] = topo.transform.translate;
const arcs = topo.arcs.map((arc) => {
  let x = 0, y = 0;
  return arc.map(([dx, dy]) => { x += dx; y += dy; return [x * sx + ox, y * sy + oy]; });
});
const arcPts = (i) => (i >= 0 ? arcs[i] : arcs[~i].slice().reverse());
const br = topo.objects.countries.geometries.find((g) => g.properties?.name === "Brazil");
const polys = br.type === "Polygon" ? [br.arcs] : br.arcs;
const countryRings = polys.flatMap((rings) => rings.map((ring) => ring.flatMap((i, n) => arcPts(i).slice(n ? 1 : 0))));

// 2. Divisas estaduais: contorno de cada UF (arestas que aparecem uma vez entre os municípios da UF).
const geo = JSON.parse(readFileSync(MUN, "utf8"));
const key = ([x, y]) => `${x.toFixed(6)},${y.toFixed(6)}`;
const byUf = new Map();
for (const f of geo.features) {
  const code = String(f.properties.id).slice(0, 2);
  (byUf.get(code) ?? byUf.set(code, []).get(code)).push(f.geometry);
}
function chains(list, coord) {
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
const stateLines = [];
for (const geoms of byUf.values()) {
  const coord = new Map(), edges = new Map();
  for (const g of geoms) {
    for (const rings of g.type === "Polygon" ? [g.coordinates] : g.coordinates) {
      for (const ring of rings) {
        for (let i = 0; i < ring.length - 1; i++) {
          const a = key(ring[i]), b = key(ring[i + 1]);
          if (a === b) continue;
          coord.set(a, ring[i]); coord.set(b, ring[i + 1]);
          const e = a < b ? `${a}|${b}` : `${b}|${a}`;
          edges.set(e, (edges.get(e) ?? 0) + 1);
        }
      }
    }
  }
  const outer = [...edges].filter(([, n]) => n === 1).map(([e]) => e.split("|"));
  stateLines.push(...chains(outer, coord));
}

// 3. Projeção de Mercator ajustada ao contorno do país.
const merc = ([lon, lat]) => [(lon * Math.PI) / 180, Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))];
// Enquadramento pelo continente (ilhas oceânicas, como Trindade e Noronha, ficam de fora).
const mainland = countryRings.filter((r) => r.every(([lon]) => lon < -34.6));
let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
for (const r of mainland) for (const p of r) {
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

const outline = mainland.map((r) => simplify(r.map(project), 0.45)).filter((l) => l.length > 3 && area(l) > 4);
const states = stateLines.map((l) => simplify(l.map(project), 0.8)).filter((l) => l.length > 1);
const outlineD = outline.map((l) => toPath(l) + "Z").join("");
const statesD = states.map(toPath).join("");

writeFileSync(
  join(ROOT, "src/data/mapa-brasil.json"),
  JSON.stringify({
    source: "Natural Earth (world-atlas) e IBGE — malha municipal (geodata-br, CC0 1.0)",
    width: W,
    height: H,
    projection: { k: +k.toFixed(4), tx: +tx.toFixed(3), ty: +ty.toFixed(3) },
    outline: outlineD,
  }, null, 2) + "\n"
);
writeFileSync(
  join(ROOT, "assets/img/mapa-brasil-estados.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"><path d="${statesD}" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width=".9" stroke-linejoin="round"/></svg>\n`
);
process.stdout.write(`contorno: ${outline.length} anéis, ${outlineD.length} bytes · divisas: ${states.length} linhas, ${statesD.length} bytes\n`);
