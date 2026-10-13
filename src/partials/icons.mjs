const svg = (body, size = 16, extra = "") =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"${extra}>${body}</svg>`;

export const icon = {
  arrow: (s) => svg('<path d="M5 12h14M13 6l6 6-6 6"/>', s),
  arrowUpRight: (s) => svg('<path d="M7 17L17 7M8 7h9v9"/>', s),
  chevronDown: (s) => svg('<path d="M6 9l6 6 6-6"/>', s),
  plus: (s) => svg('<path d="M12 5v14M5 12h14"/>', s),
  check: (s) => svg('<path d="M5 12.5l4.2 4.2L19 7"/>', s),
  pin: (s) => svg('<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0113 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>', s),
  phone: (s) => svg('<path d="M5 4h3.2l1.6 4-2 1.3a11 11 0 005 5l1.3-2 4 1.6V17a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z"/>', s),
  video: (s) => svg('<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10.5l5-3v9l-5-3"/>', s),
  building: (s) => svg('<path d="M4 21V5a1 1 0 011-1h9a1 1 0 011 1v16M15 9h4a1 1 0 011 1v11M3 21h18M8 8h3M8 12h3M8 16h3"/>', s),
  clock: (s) => svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>', s),
  mail: (s) => svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/>', s),
  whatsapp: (s = 18) =>
    `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12.04 2a9.9 9.9 0 00-8.5 15l-1.4 5 5.1-1.3A9.9 9.9 0 1012.04 2zm0 18.1a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3a8.2 8.2 0 1114.4-4.6 8.2 8.2 0 01-7.5 8.4zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 000-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.1.6a2.7 2.7 0 001.8-1.2 2.2 2.2 0 00.2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>`,
};
