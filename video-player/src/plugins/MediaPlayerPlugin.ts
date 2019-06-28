import MediaPlayer from "../MediaPlayer";

export default interface MediaPlayerPlugin {
  run: (player: MediaPlayer) => void;
}
