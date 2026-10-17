// Landing pages estáticas publicadas no domínio principal (pastas na raiz, fora do build). As LPs de
// divórcio e de juros abusivos foram reconstruídas e agora são geradas (src/data/landings.mjs).
// Cada pasta tem um .htaccess próprio que remove a CSP do site (as LPs usam GTM e scripts inline).
// A LP do golpe do Pix também passou a ser gerada (src/data/landings.mjs); a lista ficou vazia.
export const LANDING_PAGES = [];
