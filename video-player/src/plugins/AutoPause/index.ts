import MediaPlayer from "../../MediaPlayer";
import MediaPlayerPlugin from "../MediaPlayerPlugin";

export default class AutoPausePlugin implements MediaPlayerPlugin {
  private threshold: number | number[];
  private observer: IntersectionObserver;
  private shouldPlay: boolean;

  constructor() {
    this.threshold = 0.25;
  }

  run(player: MediaPlayer) {
    this.observer = new IntersectionObserver(this.handleIntersection, {
      threshold: this.threshold
    });
    this.observer.observe(player.getMedia());
  }

  async kill() {
    this.observer.disconnect();
  }

  private handleIntersection = (entries: IntersectionObserverEntry[]) => {
    let entry = entries[0];
    if (!entry || !(entry.target instanceof HTMLMediaElement)) {
      return;
    }

    let isVisible = entry.intersectionRatio >= this.threshold;
    if (!isVisible) {
      // If already paused, set flag to not play when the entry becomes visibles
      this.shouldPlay = !entry.target.paused;

      entry.target.pause();
    } else {
      if (this.shouldPlay) {
        entry.target.play();
      }

      this.shouldPlay = null;
    }
  };
}
