const svg = (body, size = 16, extra = "") =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"${extra}>${body}</svg>`;

export const icon = {
  arrow: (s) => svg('<path d="M5 12h14M13 6l6 6-6 6"/>', s),
  arrowUpRight: (s) => svg('<path d="M7 17L17 7M8 7h9v9"/>', s),
  doc: (s) => svg('<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>', s),
  shield: (s) => svg('<path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>', s),
  scale: (s) => svg('<path d="M12 4v16M6 20h12M5 8h14M5 8l-2.5 6a3 3 0 005 0zM19 8l-2.5 6a3 3 0 005 0z"/>', s),
  users: (s) => svg('<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19a5.5 5.5 0 0111 0M16 6a3 3 0 010 5.5M17.5 14a5 5 0 013 5"/>', s),
  home: (s) => svg('<path d="M4 11l8-6.5 8 6.5M6 9.5V20h12V9.5M10 20v-5h4v5"/>', s),
  pulse: (s) => svg('<path d="M3 12h4l2-5 4 10 2-5h6"/>', s),
  bank: (s) => svg('<path d="M3 9l9-5 9 5M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 20h18"/>', s),
  briefcase: (s) => svg('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 12h18"/>', s),
  alert: (s) => svg('<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/>', s),
  calendar: (s) => svg('<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>', s),
  pin2: (s) => svg('<path d="M9 3h6l-1 6 3 3H7l3-3zM12 12v9"/>', s),
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
