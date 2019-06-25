import MediaPlayer from "../MediaPlayer";
import MediaPlayerPlugin from "./MediaPlayerPlugin";

interface Ad {
  imageURL: string;
  title: string;
  message: string;
}

export default class AdsPlugin implements MediaPlayerPlugin {
  private media: HTMLMediaElement;
  private ads: {};

  constructor(private ad: Ad) {}

  build(player: MediaPlayer, media: HTMLMediaElement) {
    // Do not display ads for media shorter than 10 seconds;
    if (media.duration < 10) {
      return;
    }

    this.media = media;

    this.ads = {};
    for (let seconds = 5; seconds < this.media.duration; seconds += 60) {
      this.ads[seconds] = {
        ...this.ad,
        shown: false
      };
    }

    this.media.addEventListener("timeupdate", this.handleTimeUpdate.bind(this));
  }

  private handleTimeUpdate() {
    this.displayAdAt(this.media.currentTime);
  }

  private displayAdAt(currentTimeInSeconds: number) {
    let adId = Object.keys(this.ads)
      .reverse()
      .find(adTime => {
        return (
          currentTimeInSeconds >= Number.parseFloat(adTime) &&
          !this.ads[adTime].shown
        );
      });

    if (adId) {
      this.displayAd(adId);
    }
  }

  private displayAd(adId: string) {
    if (this.ads[adId]) {
      this.ads[adId].shown = true;

      console.log(this.ads[adId]);
    }
  }
}

/*
  When to show an ad?
  
  After five seconds of video playing.
  After the first ad, one after every 5 minute
  If the user jumps to a timestamp
    show the ad that should be shown for that segment, if that ad has not been shown already.
*/
