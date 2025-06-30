import chapter from "https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/en-kjv/books/genesis/chapters/15.json" with { type: 'json' };

const $parent = document.querySelector('main');
const $chapter = document.createElement('article');
$parent.appendChild($chapter);

const $header = document.createElement('h1');
$header.textContent = 'Genesis 15 — Abram Promised a Son';
$chapter.appendChild($header);

for (const verse of chapter.data) {
  const $verse = document.createElement('p');
  $verse.textContent = verse.text;
  $chapter.appendChild($verse);
}