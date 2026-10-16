import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

// assets/js/gate.js roda inline no <head> (sem requisição bloqueante). A CSP libera esse trecho por hash.
const raw = readFileSync(new URL("../../assets/js/gate.js", import.meta.url), "utf8");
export const GATE_JS = raw.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}();,=<>!&|?:+])\s*/g, "$1").trim();
export const GATE_HASH = "sha256-" + createHash("sha256").update(GATE_JS).digest("base64");
