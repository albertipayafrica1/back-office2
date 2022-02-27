import Carousel from "../components/Carousel";
import OTPInput from "../components/OTPInput";
import Auth from "../components/Layouts/Auth";
import ProtectedRoute from "../components/ProtectedRoute";

const Otp = () => {
  return <Auth left={<Carousel />} right={<OTPInput />} />;
};

export default Otp;

export const getServerSideProps = ProtectedRoute(async (ctx) => {
  return {
    props: {},
  };
});
