import "../styles/Header.css";
import youtubeLogo from "../../../static/icons/youtube.svg";
import toggleMenuIcon from "../../../static/icons/menu-icon.svg";
import searchIcon from "../../../static/icons/search-icon.svg";

import cameraIcon from "../../../static/icons/camera-icon.svg";
import dotsGridIcon from "../../../static/icons/dots-icon.svg";
import bellIcon from "../../../static/icons/bell-icon.svg";

import userAvatar from "../../../static/images/user-avatar.png";
import threeDotsMenuIcon from "../../../static/icons/three-dots-icon.svg";

export default function Header() {
  return (
    <div className="page-header">
      <img src={toggleMenuIcon} alt="Toggle menu icon" />
      <img src={youtubeLogo} alt="Youtube logo" />

      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          className="search-input-field"
        />
        <button className="search-icon-button">
          <img src={searchIcon} alt="Search icon" />
        </button>
      </div>

      <div id="header-right">
        <img
          src={cameraIcon}
          alt="Camera icon"
          className="wide-screen-icon"
          id="camera-icon"
        />
        <img
          src={dotsGridIcon}
          alt="Dots grid icon"
          className="wide-screen-icon"
          id="dots-icon"
        />

        <div className="bell-container wide-screen-icon">
          <img src={bellIcon} alt="Bell icon" id="bell-icon" />
          <div className="chip">3</div>
        </div>

        <img src={userAvatar} alt="User avatar" id="user-avatar" />
      </div>

      <img
        src={searchIcon}
        alt="Search icon"
        id="search-icon-mobile"
        className="mobile"
      />

      <img
        src={threeDotsMenuIcon}
        alt="Three dots menu icon"
        id="three-dots-icon"
        className="mobile"
      />
    </div>
  );
}
