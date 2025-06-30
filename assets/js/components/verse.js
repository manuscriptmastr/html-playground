import { LitElement, css, html } from "lit";

export class Verse extends LitElement {
  static styles = css``;

  static properties = {
    text: String,
    number: Number,
  };

  render() {
    return html`<p>${this.text}</p>`;
  }
}

customElements.define("insight-verse", Verse);
