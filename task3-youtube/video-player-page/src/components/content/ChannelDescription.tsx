import "../../styles/ChannelDescription.css";
import plateImage from "../../../../static/images/plate.png";

export default function ChannelDescription() {
  return (
    <div id="channel-descrptn-container">
      <div id="plate-image-container">
        <img src={plateImage} alt="Food channel image" />
      </div>

      <div id="text-block">
        <div>
          <div id="descrptn-header">
            <h2>Food & Drink</h2>
            <span>Published on 14 Jun 2019</span>
          </div>

          <button type="button" id="subscribe-button">
            Subscribe 2.3m
          </button>
        </div>

        <div id="main-descrptn-text">
          <p>
            A successful marketing plan relies heavily on the pulling-power of
            advertising copy. Writing result-oriented ad copy is difficult, as
            it must appeal to, entice, and convince consumers to take action.
            There is no magic formula to write perfect ad copy; it is based on a
            number of factors, including ad placement, demographic, even the
            consumer's mood when they see your ad.
          </p>
          <span>Show more</span>
        </div>
      </div>
    </div>
  );
}
