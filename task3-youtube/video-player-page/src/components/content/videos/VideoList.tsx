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
      <header>
        <div id="videos-block-title">
          <h1>Next</h1>
          <div id="switcher-block">
            <h4>AUTOPLAY</h4>
            <Switcher />
          </div>
        </div>

        <div className="shifts">
          <button type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="0.311111in"
              height="0.311111in"
              viewBox="0 0 28 28"
            >
              <path
                d="M 16.00,8.67
                    C 16.00,8.67 16.54,9.21 16.54,9.21
                      16.71,9.39 16.80,9.61 16.80,9.86
                      16.80,10.11 16.71,10.33 16.54,10.51
                      16.54,10.51 13.07,14.00 13.07,14.00
                      13.07,14.00 16.54,17.49 16.54,17.49
                      16.71,17.67 16.80,17.89 16.80,18.14
                      16.80,18.39 16.71,18.61 16.54,18.79
                      16.54,18.79 16.00,19.33 16.00,19.33
                      15.82,19.51 15.60,19.60 15.35,19.60
                      15.10,19.60 14.88,19.51 14.71,19.33
                      14.71,19.33 10.07,14.65 10.07,14.65
                      9.89,14.47 9.80,14.26 9.80,14.00
                      9.80,13.75 9.89,13.53 10.07,13.35
                      10.07,13.35 14.71,8.67 14.71,8.67
                      14.89,8.49 15.10,8.40 15.35,8.40
                      15.60,8.40 15.82,8.49 16.00,8.67 Z
                    M 14.00,28.00
                    C 21.73,28.00 28.00,21.73 28.00,14.00
                      28.00,6.27 21.73,0.00 14.00,0.00
                      6.27,0.00 0.00,6.27 0.00,14.00
                      0.00,21.73 6.27,28.00 14.00,28.00 Z"
              />
            </svg>
          </button>

          <button type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="0.311111in"
              height="0.311111in"
              viewBox="0 0 28 28"
            >
              <path
                d="M 12.00,8.67
                    C 12.00,8.67 11.46,9.21 11.46,9.21
                      11.29,9.39 11.20,9.61 11.20,9.86
                      11.20,10.11 11.29,10.33 11.46,10.51
                      11.46,10.51 14.93,14.00 14.93,14.00
                      14.93,14.00 11.46,17.49 11.46,17.49
                      11.29,17.67 11.20,17.89 11.20,18.14
                      11.20,18.39 11.29,18.61 11.46,18.79
                      11.46,18.79 12.00,19.33 12.00,19.33
                      12.18,19.51 12.40,19.60 12.65,19.60
                      12.90,19.60 13.12,19.51 13.29,19.33
                      13.29,19.33 17.93,14.65 17.93,14.65
                      18.11,14.47 18.20,14.26 18.20,14.00
                      18.20,13.75 18.11,13.53 17.93,13.35
                      17.93,13.35 13.29,8.67 13.29,8.67
                      13.11,8.49 12.90,8.40 12.65,8.40
                      12.40,8.40 12.18,8.49 12.00,8.67 Z
                    M 14.00,28.00
                    C 21.73,28.00 28.00,21.73 28.00,14.00
                      28.00,6.27 21.73,0.00 14.00,0.00
                      6.27,0.00 0.00,6.27 0.00,14.00
                      0.00,21.73 6.27,28.00 14.00,28.00 Z"
              />
            </svg>
          </button>
        </div>
      </header>

      <div id="video-list">
        {videos.map((video) => (
          <Video key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
}
