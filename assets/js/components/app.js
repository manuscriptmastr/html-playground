import versionData from "https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/bibles.json" with { type: 'json' };
const VERSIONS = versionData.filter(({ language }) => language.code === 'eng');

import { LitElement, css, html } from "lit";

export class App extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      padding-inline: 1.5rem;
    }

    :host > * + * {
      border-top: 1px solid black;
    }

    header,
    main,
    footer {
      margin-inline: auto;
      padding-block: 1rem;
      width: min(60ch, 100%);
    }

    header,
    footer {
      text-align: center;
    }
  `;

  static properties = {
    version: { type: String, state: true },
    book: { type: String, state: true },
    chapter: { type: Number, state: true },
    verses: { type: Array, state: true },
  }

  constructor() {
    super();
    this.version = VERSIONS[2].id;
    this.book = 'genesis';
    this.chapter = 15;
    this.verses = [];
    this.updateVerses();
  }

  async updateVersion(value) {
    this.version = value;
    await this.updateVerses();
  }

  async updateVerses() {
    const { data } = await fetch(`https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/${this.version}/books/${this.book}/chapters/${this.chapter}.json`).then(res => res.json());
    this.verses = data;
  }

  render() {
    return html`
      <header>
        <h1>${this.book} ${this.chapter}</h1>
        <select name="version" @change=${(e) => this.updateVersion(e.target.value)}>${VERSIONS.map(({ id, localVersionName }) => html`
          <option value=${id} ?selected=${id === this.version}>${localVersionName}</option>
          `)}
        </select>
      </header>
      <main>
        ${this.verses.map(({ number, text }) => html`
        <insight-verse number=${number} text=${text}></insight-verse>
        `)}
      </main>
      <footer>${this.book} ${this.chapter}</footer>
    `;
  }
}

customElements.define("insight-app", App);
