interface PlayerConfig {}

export default class Player {
  private media: HTMLMediaElement;

  constructor(el: HTMLMediaElement) {
    this.media = el;
    this.init();
  }

  private init() {
    let container = document.createElement("div");
    container.className = this.media.className;
    container.innerHTML = `
      <div class="mediaelement"></div>
    `;

    // Move container next to the media element
    this.media.parentNode.insertBefore(container, this.media);

    // Place the media element inside the mediaelement container
    container.querySelector(".mediaelement").appendChild(this.media);
  }
}
