<?php
// Avaliações do Perfil da Empresa no Google (Places API, versão nova), consultadas NO SERVIDOR.
// A chave nunca vai ao navegador. Resposta em cache de 12 h; se o Google falhar, serve o cache
// vencido; sem cache, devolve só o link para as avaliações. Sem chave/Place ID: {"status":"empty"}.
//
// Credenciais (uma das duas formas):
//   1) copie api/config.example.php para api/config.php e preencha (arquivo fora do Git, bloqueado na web);
//   2) variáveis de ambiente GOOGLE_PLACES_API_KEY e GOOGLE_PLACE_ID, se a hospedagem permitir.
declare(strict_types=1);

const CACHE_TTL = 43200;      // 12 horas
const RETRY_AFTER = 600;      // após falha do Google, espera 10 min antes de tentar de novo
const MAX_REVIEWS = 5;        // a Places API devolve no máximo 5

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function reply(array $data, int $maxAge = 600): void {
  header('Cache-Control: public, max-age=' . $maxAge);
  echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

$cfg = is_file(__DIR__ . '/config.php') ? (array) require __DIR__ . '/config.php' : [];
$key = (string) ($cfg['GOOGLE_PLACES_API_KEY'] ?? getenv('GOOGLE_PLACES_API_KEY') ?: '');
$place = (string) ($cfg['GOOGLE_PLACE_ID'] ?? getenv('GOOGLE_PLACE_ID') ?: '');
if ($key === '' || $place === '' || !preg_match('/^[A-Za-z0-9_-]{10,200}$/', $place)) {
  reply(['status' => 'empty'], 300);
}

$dir = __DIR__ . '/.cache';
$file = $dir . '/reviews.json';
$fail = $dir . '/falha';
// Link oficial da ficha no Google Maps (CID do endereço informado pelo escritório).
$fallbackUrl = (string) ($cfg['GOOGLE_MAPS_URL'] ?? 'https://www.google.com/maps?cid=14980209794321835232');
$cached = is_file($file) ? json_decode((string) file_get_contents($file), true) : null;
$age = is_file($file) ? time() - (int) filemtime($file) : PHP_INT_MAX;

if (is_array($cached) && $age < CACHE_TTL) {
  reply($cached, 3600);
}
if (is_file($fail) && time() - (int) filemtime($fail) < RETRY_AFTER) {
  reply(is_array($cached) ? $cached : ['status' => 'error', 'url' => $fallbackUrl], 300);
}

function fetchPlace(string $key, string $place): ?array {
  $ch = curl_init('https://places.googleapis.com/v1/places/' . rawurlencode($place) . '?languageCode=pt-BR');
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 6,
    CURLOPT_CONNECTTIMEOUT => 4,
    CURLOPT_HTTPHEADER => [
      'X-Goog-Api-Key: ' . $key,
      'X-Goog-FieldMask: displayName,rating,userRatingCount,googleMapsUri,reviews',
    ],
  ]);
  $body = curl_exec($ch);
  $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  if ($body === false || $code !== 200) return null;
  $j = json_decode($body, true);
  return is_array($j) ? $j : null;
}

$p = fetchPlace($key, $place);
if ($p === null) {
  if (!is_dir($dir)) @mkdir($dir, 0750, true);
  @touch($fail);
  reply(is_array($cached) ? $cached : ['status' => 'error', 'url' => $fallbackUrl], 300);
}

// Mantém a ordem e o texto originais devolvidos pelo Google (sem filtrar, resumir ou reescrever).
$reviews = [];
foreach (array_slice($p['reviews'] ?? [], 0, MAX_REVIEWS) as $r) {
  $text = $r['originalText']['text'] ?? ($r['text']['text'] ?? '');
  $reviews[] = [
    'author' => $r['authorAttribution']['displayName'] ?? '',
    'authorUrl' => $r['authorAttribution']['uri'] ?? '',
    'photo' => $r['authorAttribution']['photoUri'] ?? '',
    'rating' => (int) ($r['rating'] ?? 0),
    'when' => $r['relativePublishTimeDescription'] ?? '',
    'text' => $text,
    'url' => $r['googleMapsUri'] ?? '',
  ];
}
$out = [
  'status' => $reviews ? 'success' : 'empty',
  'rating' => $p['rating'] ?? null,
  'count' => (int) ($p['userRatingCount'] ?? 0),
  'url' => $p['googleMapsUri'] ?? $fallbackUrl,
  'reviews' => $reviews,
];
if (!is_dir($dir)) @mkdir($dir, 0750, true);
@file_put_contents($file, json_encode($out, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX);
@unlink($fail);
reply($out, 3600);
