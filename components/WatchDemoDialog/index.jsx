import PropTypes from "prop-types";
import Dialog from "../../atoms/Dialog/index";
import { styles } from "./styles";

const WatchDemo = ({ open, toggleWatchDemo }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={toggleWatchDemo}
        position={styles.dialogueContainer}
        hasCloseIcon
        paperPropsStyling={{
          width: "100vh",
          height: "100vh",
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/f36FRn1cfTc"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </Dialog>
    </div>
  );
};

export default WatchDemo;
WatchDemo.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleWatchDemo: PropTypes.func.isRequired,
};
