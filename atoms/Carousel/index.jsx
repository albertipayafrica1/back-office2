import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as CarouselView } from "react-responsive-carousel";

const Carousel = ({ imageArray, onChange }) => {
  return (
    <CarouselView
      autoPlay
      infiniteLoop
      showThumbs={false}
      showIndicators
      autoFocus
      showStatus={false}
      showArrows={false}
      onChange={onChange}
    >
      {imageArray.map((item) => {
        return <img key={item.id} src={item.src} alt={item.alt} />;
      })}
    </CarouselView>
  );
};

export default Carousel;

Carousel.propTypes = {
  imageArray: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onChange: PropTypes.func.isRequired,
};
