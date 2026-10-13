import home from "./pages/home.mjs";
import escritorio from "./pages/escritorio.mjs";
import areas from "./pages/areas.mjs";
import conhecimento from "./pages/conhecimento.mjs";
import contato from "./pages/contato.mjs";
import politicaDePrivacidade from "./pages/politica-de-privacidade.mjs";
import termosDeUso from "./pages/termos-de-uso.mjs";
import { servicePages } from "./data/services/index.mjs";
import { renderService } from "./pages/service.mjs";

export const ROUTES = [
  { path: "/", render: home, priority: "1.0" },
  { path: "/escritorio/", render: escritorio, priority: "0.8" },
  { path: "/areas-de-atuacao/", render: areas, priority: "0.9" },
  { path: "/conhecimento/", render: conhecimento, priority: "0.7" },
  { path: "/contato/", render: contato, priority: "0.8" },
  ...servicePages.map((p) => ({ path: p.path, render: () => renderService(p), priority: "0.8" })),
  { path: "/politica-de-privacidade/", render: politicaDePrivacidade, priority: "0.2" },
  { path: "/termos-de-uso/", render: termosDeUso, priority: "0.2" },
];
