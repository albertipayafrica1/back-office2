import MarqueeView from "react-fast-marquee";
import { styles } from "./styles";
import { data } from "./data";

const Marquee = () => {
  return (
    <div style={styles.container}>
      <div style={styles.child}>
        <MarqueeView speed={50} pauseOnHover gradient={false}>
          {data.map((img) => (
            <img style={styles.circular} alt={img.alt} src={img.src} />
          ))}
        </MarqueeView>
      </div>
    </div>
  );
};

export default Marquee;
