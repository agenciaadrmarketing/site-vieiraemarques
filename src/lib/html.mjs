const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ESCAPES[c]);

export const attrs = (obj = {}) =>
  Object.entries(obj)
    .filter(([, v]) => v !== false && v != null)
    .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${esc(v)}"`))
    .join("");

export const join = (items, fn) => items.map(fn).join("");

export const when = (cond, html) => (cond ? html : "");

// JSON-LD must not be HTML-escaped, but "</" has to be neutralised inside <script>.
export const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/<\//g, "<\\/")}</script>`;
