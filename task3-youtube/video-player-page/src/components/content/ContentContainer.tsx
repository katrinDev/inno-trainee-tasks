import ChannelDescription from "./ChannelDescription";
import MainVideoPlayer from "./video-player/MainVideoPLayer";
import VideoList from "./videos/VideoList";
import "../../styles/ContentContainer.css";

export default function ContentContainer() {
  return (
    <div className="content-container">
      <MainVideoPlayer />
      <ChannelDescription />

      <VideoList />
    </div>
  );
}
