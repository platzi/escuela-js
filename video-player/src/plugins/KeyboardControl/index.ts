import MediaPlayer from "../../MediaPlayer";
import MediaPlayerPlugin from "../MediaPlayerPlugin";

export default class KeyboardControlPlugin implements MediaPlayerPlugin {
  private player: MediaPlayer;
  private media: HTMLMediaElement;

  run(player: MediaPlayer) {
    this.player = player;
    this.media = player.getMedia();
    document.addEventListener("keydown", this.handleKeydown);
  }

  async kill() {
    document.removeEventListener("keydown", this.handleKeydown);
  }

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.repeat) {
      return;
    }

    switch (e.key.toLowerCase()) {
      case "f":
        this.toggleFullscreen(e);
        break;
      case " ":
        this.togglePlay(e);
        break;
      default:
    }
  };

  private toggleFullscreen = (e: Event) => {
    this.player.toggleFullscreen();
  };

  private togglePlay = (e: Event) => {
    e.preventDefault();
    this.media.paused ? this.media.play() : this.media.pause();
  };
}
