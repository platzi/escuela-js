import { MediaPlayer, AdsPlugin, AutoPausePlugin } from "../src";

let media = document.getElementById("movie") as HTMLMediaElement;

const ads = [
  {
    type: "Classic",
    imageURL:
      "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F378800000041711687%2Fd6050eb6ce3f141847fe200a914205bc_400x400.png&f=1",
    url: "https://twitter.com/sparragus",
    title: "Sígueme en @sparragus",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    type: "Video",
    src:
      "https://nomadx.com/packs/computer-video-audio-d7fe7764324342191c58d3c0e569af05.mp4"
  }
];
new MediaPlayer(media, {
  plugins: [
    // new AdsPlugin(ads),
    new AutoPausePlugin()
  ]
});
