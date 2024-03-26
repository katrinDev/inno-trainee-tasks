import "../../../styles/videos/Video.css";

export interface IVideoInfo {
  id: number;
  title: string;
  views: string;
  author: string;
  src: string;
  time: string;
}

export default function Video(props: IVideoInfo) {
  const { title, views, author, src, time } = props;

  return (
    <div className="video">
      <div className="video-image-block">
        <a href="#">
          <img src={src} alt="video image" className="video-image" />
        </a>
        <div className="timer">{time}</div>
      </div>

      <div className="description">
        <a href="#">
          <h2 className="video-title">{title}</h2>
        </a>
        <div id="views-info-block">
          <span className="views">{views}</span>
          <a href="#" className="author">
            {author}
          </a>
        </div>
      </div>
    </div>
  );
}
