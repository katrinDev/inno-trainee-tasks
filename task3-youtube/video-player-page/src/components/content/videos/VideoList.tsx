import "../../../styles/videos/VideoList.css";
import coneImage from "../../../../../static/images/cone.png";
import cherryImage from "../../../../../static/images/cherry.png";
import pineappleImage from "../../../../../static/images/pineapple.png";
import mandarinImage from "../../../../../static/images/mandarin.png";
import Video, { IVideoInfo } from "./Video";
import Switcher from "./Switcher";

export default function VideoList() {
  const videos: Array<IVideoInfo> = [
    {
      id: 1,
      title: "Baby Monitor Technology",
      views: "123k views",
      author: "Dollie Blair",
      src: coneImage,
      time: "8:00",
    },

    {
      id: 2,
      title: "A Good Autoresponder",
      views: "123k views",
      author: "Dollie Blair",
      src: cherryImage,
      time: "8:00",
    },

    {
      id: 3,
      title: "Selecting The Right Hotel",
      views: "123k views",
      author: "Dollie Blair",
      src: pineappleImage,
      time: "8:00",
    },

    {
      id: 4,
      title: "Astronomy Or Astrology",
      views: "123k views",
      author: "Dollie Blair",
      src: mandarinImage,
      time: "8:00",
    },
  ];

  return (
    <div id="videos-content-block">
      <div id="videos-block-title">
        <h1>Next</h1>
        <div id="switcher-block">
          <h4>AUTOPLAY</h4>
          <Switcher />
        </div>
      </div>

      <div id="video-list">
        {videos.map((video) => (
          <Video key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
}
