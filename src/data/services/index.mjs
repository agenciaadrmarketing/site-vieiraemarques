import { areaById, servicePath, areaUrl, PAUSED_AREAS } from "../areas.mjs";
import divorcio from "./divorcio.mjs";
import verbasRescisorias from "./verbas-rescisorias.mjs";
import jurosAbusivos from "./juros-abusivos.mjs";
import golpeDoPix from "./golpe-do-pix.mjs";
import familia from "./familia.mjs";
import sucessorio from "./sucessorio.mjs";
import trabalhista from "./trabalhista.mjs";
import criminal from "./criminal.mjs";
import saude from "./saude.mjs";
import outros from "./outros.mjs";

// Páginas de serviço publicadas. Para publicar uma nova: criar o arquivo de conteúdo
// (planejamento editorial próprio) e incluí-lo aqui.
// As quatro primeiras têm planejamento editorial próprio e aparecem em destaque no menu.
const FEATURED = [divorcio, verbasRescisorias, jurosAbusivos, golpeDoPix].filter((p) => !PAUSED_AREAS.has(p.area));
const PAGES = [...FEATURED, ...familia, ...sucessorio, ...trabalhista, ...criminal, ...saude, ...outros];

// Páginas de áreas pausadas (areas.mjs) ficam fora do site junto com a área.
export const servicePages = PAGES.filter((p) => !PAUSED_AREAS.has(p.area)).map((p) => {
  const area = areaById[p.area];
  const service = area?.services.find((s) => s.id === p.service);
  if (!area || !service) throw new Error(`Serviço inexistente: ${p.area}/${p.service}`);
  return { ...p, featured: FEATURED.includes(p), areaData: area, serviceData: service, path: servicePath(area, service) };
});

const published = new Set(servicePages.map((p) => `${p.area}/${p.service}`));
export const hasPage = (areaId, serviceId) => published.has(`${areaId}/${serviceId}`);

// Destino de um serviço: a página própria, se publicada; senão, o cartão na página da área.
export function serviceHref(areaId, serviceId) {
  const area = areaById[areaId];
  const service = area?.services.find((s) => s.id === serviceId);
  if (!service) throw new Error(`Serviço inexistente: ${areaId}/${serviceId}`);
  return hasPage(areaId, serviceId) ? servicePath(area, service) : `${areaUrl(area)}#${areaId}-${serviceId}`;
}
