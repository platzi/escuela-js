import MediaPlayerPlugin from "./plugins/MediaPlayerPlugin";

interface MediaPlayerConfig {
  plugins?: Array<MediaPlayerPlugin>;
}

export default class MediaPlayer {
  private container: HTMLElement;
  private media: HTMLMediaElement;
  private layers: HTMLElement;

  constructor(el: HTMLMediaElement, config: MediaPlayerConfig = {}) {
    this.media = el;

    this.init();
    config.plugins && this.initPlugins(config.plugins);
  }

  private init() {
    this.container = document.createElement("div");
    this.container.className = `pvjs ${this.media.className}`;
    this.container.innerHTML = `
      <div class="pvjs-mediaelement"></div>
      <div class="pvjs-layers"></div>
    `;

    this.layers = this.container.querySelector(".pvjs-layers");

    // Move container next to the media element
    this.media.parentNode.insertBefore(this.container, this.media);

    // Place the media element inside the mediaelement container
    this.container.querySelector(".pvjs-mediaelement").appendChild(this.media);
  }

  private initPlugins(plugins: MediaPlayerPlugin[]) {
    plugins.forEach(plugin => {
      plugin.build(this, this.media);
    });
  }

  requestNewLayer() {
    let layer = document.createElement("div");
    this.layers.appendChild(layer);
    return layer;
  }
}
