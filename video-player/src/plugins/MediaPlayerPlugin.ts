import MediaPlayer from "../MediaPlayer";

export default interface MediaPlayerPlugin {
  build: (player: MediaPlayer, media: HTMLMediaElement) => void;
}
