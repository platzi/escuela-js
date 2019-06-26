import MediaPlayerPlugin from "../MediaPlayerPlugin";
import MediaPlayer from "../../MediaPlayer";

interface AdDescriptor {
  url: string;
  imageURL: string;
  title: string;
  message: string;
}

interface AdsPluginConfig {
  firstAdTimeInSeconds: number;
  adIntervalInSeconds: number;
}

export default class AdsPlugin implements MediaPlayerPlugin {
  private player: MediaPlayer;
  private media: HTMLMediaElement;
  private ads: {};
  private config: AdsPluginConfig;

  constructor(private ad: AdDescriptor, config?: {}) {
    this.config = Object.assign(
      {},
      {
        firstAdTimeInSeconds: 0,
        adIntervalInSeconds: 20
      },
      config
    );
  }

  build(player: MediaPlayer, media: HTMLMediaElement) {
    this.player = player;
    this.media = media;
    this.ads = {};

    if (Number.isNaN(this.media.duration)) {
      this.media.addEventListener(
        "loadedmetadata",
        () => {
          this.build(player, this.media);
        },
        {
          once: true
        }
      );

      return;
    }
    // Do not display ads for media shorter than N seconds;
    if (this.media.duration < this.config.firstAdTimeInSeconds + 5) {
      return;
    }

    for (
      let seconds = this.config.firstAdTimeInSeconds;
      seconds < this.media.duration;
      seconds += this.config.adIntervalInSeconds
    ) {
      this.ads[seconds] = {
        ...this.ad,
        shown: false
      };
    }

    this.media.addEventListener("timeupdate", this.handleTimeUpdate.bind(this));
  }

  private handleTimeUpdate() {
    let ad = this.findAd(this.media.currentTime);

    if (ad && !ad.shown) {
      this.displayAd(ad);
    }
  }

  private findAd(timeInSeconds: number) {
    if (timeInSeconds < this.config.firstAdTimeInSeconds) {
      return;
    }

    let index =
      timeInSeconds -
      ((timeInSeconds - this.config.firstAdTimeInSeconds) %
        this.config.adIntervalInSeconds);

    return this.ads[index];
  }

  private displayAd(ad) {
    ad.shown = true;
    new Ad(ad).render(this.player.requestNewLayer());
  }
}

class Ad implements AdDescriptor {
  url: string;
  imageURL: string;
  title: string;
  message: string;

  constructor(ad: AdDescriptor) {
    this.url = ad.url;
    this.imageURL = ad.imageURL;
    this.title = ad.title;
    this.message = ad.message;
  }

  render(mountNode: ChildNode) {
    const container = document.createElement("div");
    container.className = "pvjs-ad";
    container.innerHTML = `
      <button class="pvjs-ad__close-button" aria-label="Close"></button>
      <a href="${this.url}" target="__blank">
        <img class="pvjs-ad__image" src="${this.imageURL}" />
        <div class="pvjs-ad__content">
          <p class="pvjs-ad__content__title">${this.title}</p>
          <p class="pvjs-ad__content__message">${this.message}</p>
        </div>
      </a>
    `;

    let intervalId = setInterval(() => {
      // container.remove();
    }, 5000);

    container.querySelector("button").addEventListener(
      "click",
      event => {
        container.remove();
        clearInterval(intervalId);
      },
      { once: true }
    );

    mountNode.replaceWith(container);
  }
}
