import MediaPlayerPlugin from "../MediaPlayerPlugin";
import MediaPlayer from "../../MediaPlayer";

interface Ad {
  getPlayed: () => boolean;
  play: (player: MediaPlayer) => void;
  stop: () => void;
}

enum AdType {
  Classic = "Classic",
  Video = "Video"
}

type AdDescriptor = ClassicAdDescriptor | VideoAdDescriptor;

interface ClassicAdDescriptor {
  type: AdType.Classic;
  url: string;
  imageURL: string;
  title: string;
  message: string;
}

interface VideoAdDescriptor {
  type: AdType.Video;
  src: string;
}

class ClassicAdView {
  private ad: ClassicAdDescriptor;
  constructor(ad: ClassicAdDescriptor) {
    this.ad = ad;
  }

  render(): ChildNode {
    const container = document.createElement("div");
    container.className = "pvjs-ad";
    container.innerHTML = `
      <button class="pvjs-ad__close-button" aria-label="Close"></button>
      <a href="${this.ad.url}" target="__blank">
        <img class="pvjs-ad__image" src="${this.ad.imageURL}" />
        <div class="pvjs-ad__content">
          <p class="pvjs-ad__content__title">${this.ad.title}</p>
          <p class="pvjs-ad__content__message">${this.ad.message}</p>
        </div>
      </a>
    `;

    let intervalId = setInterval(() => {
      container.remove();
    }, 5000);

    container.querySelector("button").addEventListener(
      "click",
      event => {
        container.remove();
        clearInterval(intervalId);
      },
      { once: true }
    );

    return container;
  }
}

class ClassicAd implements Ad {
  private ad: ClassicAdDescriptor;
  private played: boolean;
  private node: ChildNode;

  constructor(ad: ClassicAdDescriptor) {
    this.ad = ad;
  }

  getPlayed() {
    return this.played;
  }

  play(player: MediaPlayer) {
    this.played = true;
    let layer = player.requestNewLayer();

    let view = new ClassicAdView(this.ad);
    this.node = view.render();
    layer.replaceWith(this.node);
  }

  stop() {
    if (this.node) {
      this.node.remove();
    }
  }
}

class VideoAdView {
  private ad: VideoAdDescriptor;
  private player: MediaPlayer;
  private skipCount: number = 5;
  private container: Element;
  private intervals: number[];

  constructor(ad: VideoAdDescriptor, player: MediaPlayer) {
    this.ad = ad;
    this.player = player;
  }

  unmount() {
    this.player.getMedia().removeEventListener("play", this.lockMainVideo);
    this.player.getMedia().play();
    this.container.remove();
  }

  render(): ChildNode {
    this.container = document.createElement("div");
    this.container.className = "pvjs-video-ad";
    this.container.innerHTML = `
      <video autoplay class="pvjs-videoad__video">
        <source src="${this.ad.src}" />
      </video>
      <button class="pvjs-videoad__skip-button" disabled>You can skip to video in 5</button>
    `;

    let video = this.container.querySelector("video");
    let button = this.container.querySelector("button");
    button.onclick = () => this.unmount();

    let decreaseSkipCount = setInterval(() => {
      if (this.skipCount > 1) {
        this.skipCount--;
        this.container.querySelector(
          "button"
        ).innerText = `You can skip to video in ${this.skipCount}`;
      } else {
        button.innerText = `Skip`;
        button.disabled = false;
        clearInterval(decreaseSkipCount);
      }
    }, 1000);

    this.player.getMedia().pause();
    this.player.getMedia().addEventListener("play", this.lockMainVideo);
    video.addEventListener("ended", () => this.unmount(), { once: true });

    return this.container;
  }

  private lockMainVideo(e: Event) {
    (e.target as HTMLMediaElement).pause();
  }
}

class VideoAd implements Ad {
  private ad: VideoAdDescriptor;
  private played: boolean;
  private node: ChildNode;

  constructor(ad: VideoAdDescriptor) {
    this.ad = ad;
  }

  getPlayed() {
    return this.played;
  }

  play(player: MediaPlayer) {
    this.played = true;

    let view = new VideoAdView(this.ad, player);
    this.node = view.render();

    let layer = player.requestNewLayer();
    layer.replaceWith(this.node);
  }

  stop() {
    if (this.node) {
      this.node.remove();
    }
  }
}

class AdsPlaylist {
  private ads: Ad[];
  private player: MediaPlayer;

  constructor(ads: AdDescriptor[]) {
    this.ads = ads
      .sort((a, b) => {
        if (a.type === AdType.Video) {
          return -1;
        }
        if (b.type === AdType.Video) {
          return 1;
        }
        return 0;
      })
      .map(ad => {
        switch (ad.type) {
          case AdType.Classic:
            return new ClassicAd(ad as ClassicAdDescriptor);
          case AdType.Video:
            return new VideoAd(ad as VideoAdDescriptor);
          default:
            throw new Error("Unknown ad type.");
        }
      });
  }

  setPlayer(player: MediaPlayer) {
    this.player = player;
  }

  getAd(timeInSeconds: number): Ad {
    let progressPercent = timeInSeconds / this.player.getMedia().duration;
    let adIndex = Math.round(progressPercent * this.ads.length);
    return this.ads[adIndex];
  }
}

export default class AdsPlugin implements MediaPlayerPlugin {
  private player: MediaPlayer;
  private playlist: AdsPlaylist;

  constructor(ads: AdDescriptor[]) {
    this.playlist = new AdsPlaylist(ads);
  }

  run(player: MediaPlayer): void {
    this.player = player;
    this.playlist.setPlayer(this.player);

    let media = this.player.getMedia();
    media.addEventListener("timeupdate", this.handleTimeUpdate);
  }

  async kill(): Promise<any> {
    let media = this.player.getMedia();
    media.removeEventListener("timeupdate", this.handleTimeUpdate);
  }

  private handleTimeUpdate = event => {
    let media = event.target as HTMLMediaElement;
    let ad = this.playlist.getAd(media.currentTime);
    if (!ad.getPlayed()) {
      ad.play(this.player);
    }
  };
}
