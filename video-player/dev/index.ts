import { MediaPlayer, AdsPlugin } from "../src";

let media = document.getElementById("movie") as HTMLMediaElement;

const ads = new AdsPlugin({
  imageURL:
    "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.canva.com%2Fes_mx%2Faprende%2Fwp-content%2Fuploads%2Fsites%2F11%2F2018%2F03%2F57-50-logotipos-que-te-inspiraran-tb-800x0.png&f=1",
  title: "Tu casa limpia",
  message:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
});

let player = new MediaPlayer(media, {
  plugins: [ads]
});
