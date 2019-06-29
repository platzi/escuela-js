import MediaPlayer from "../../MediaPlayer";
import MediaPlayerPlugin from "../MediaPlayerPlugin";

export default class AutoPausePlugin implements MediaPlayerPlugin {
  private media: HTMLMediaElement;
  private threshold: number | number[];
  private observer: IntersectionObserver;
  private shouldPlay: boolean;

  constructor() {
    this.threshold = 0.25;
  }

  run(player: MediaPlayer) {
    this.media = player.getMedia();

    this.observer = new IntersectionObserver(this.handleIntersection, {
      threshold: this.threshold
    });
    this.observer.observe(this.media);

    window.document.addEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
  }

  async kill() {
    this.observer.disconnect();
  }

  private handleVisibilityChange = () => {
    if (document.hidden) {
      this.pauseMedia();
    } else {
      this.playMedia();
    }
  };

  private handleIntersection = (entries: IntersectionObserverEntry[]) => {
    let entry = entries[0];

    let isVisible = entry.intersectionRatio >= this.threshold;
    if (!isVisible) {
      this.pauseMedia();
    } else {
      this.playMedia();
    }
  };

  private pauseMedia() {
    this.shouldPlay = !this.media.paused;
    this.media.pause();
  }

  private playMedia() {
    if (this.shouldPlay) {
      this.media.play();
    }

    this.shouldPlay = null;
  }
}

// Bugs que podemos resolver durante el desarrollo:
// 1. Que pasa si el usuario pausa manualmente el video, hacemos scroll hacia abajo, y regresamos? El video comienza a tocar aunque el usuario lo había pausado manualmente.
// 2. Cuando tenemos dos cosas que pausan el video, como hacemos que no se interrumpan uno al otro?
//    - Esta playing el video
//    - Haces scroll down, el video para.
//    - Cambias de tab
//    - Regresas de tab
//    - Haces scroll up, el video no da play
