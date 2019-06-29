import MediaPlayer from "../../MediaPlayer";
import MediaPlayerPlugin from "../MediaPlayerPlugin";

export default class KeyboardControlPlugin implements MediaPlayerPlugin {
  private player: MediaPlayer;
  private media: HTMLMediaElement;
  private keyBindings: {
    [key: string]: (event: Event) => void;
  };

  constructor() {
    this.keyBindings = {
      f: this.toggleFullscreen,
      " ": this.togglePlay
    };
  }
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

    let fn = this.keyBindings[e.key];
    if (fn) {
      fn(e);
    }
  };

  private toggleFullscreen = (e: Event) => {
    console.log("Toggling fullscreen");
  };

  private togglePlay = (e: Event) => {
    e.preventDefault();
    this.media.paused ? this.media.play() : this.media.pause();
  };
}
