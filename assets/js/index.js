import chapter from "https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/en-kjv/books/genesis/chapters/15.json" with { type: 'json' };

const $parent = document.querySelector('main');
const $chapter = document.createElement('article');
$parent.appendChild($chapter);

for (const verse of chapter.data) {
  const $verse = document.createElement('p');
  $verse.textContent = verse.text;
  $chapter.appendChild($verse);
}