import Carousel from "../components/Carousel";
import OTPInput from "../components/OTPInput";
import Auth from "../components/Layouts/Auth";
import ProtectedRoute from "../components/ProtectedRoute";
import { wrapper } from "../redux/store";

const Otp = () => {
  return <Auth left={<Carousel />} right={<OTPInput />} />;
};

export default Otp;

export const getServerSideProps = ProtectedRoute(
  wrapper.getServerSideProps((store) => async (ctx) => {
    const { req } = ctx;
    console.log(req);
    return {
      props: {},
    };
  })
);
