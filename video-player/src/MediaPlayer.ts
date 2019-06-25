import MediaPlayerPlugin from "./plugins/MediaPlayerPlugin";

interface MediaPlayerConfig {
  plugins?: Array<MediaPlayerPlugin>;
}

export default class MediaPlayer {
  private media: HTMLMediaElement;

  constructor(el: HTMLMediaElement, config: MediaPlayerConfig = {}) {
    this.media = el;

    this.init();
    config.plugins && this.initPlugins(config.plugins);
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

  private initPlugins(plugins: MediaPlayerPlugin[]) {
    plugins.forEach(plugin => {
      plugin.build(this, this.media);
    });
  }
}
