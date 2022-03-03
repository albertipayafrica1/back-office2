import { useEffect } from "react";
import Carousel from "../../components/Carousel";
import OTPInput from "../../components/OTPInput";
import Auth from "../../components/Layouts/Auth";
import ProtectedRoute from "../../components/ProtectedRoute";
import { wrapper } from "../../redux/store";

const Otp = () => {
  useEffect(() => {
    console.log(document.cookie, "got cookie");
  }, []);

  return <Auth left={<Carousel />} right={<OTPInput />} />;
};

export default Otp;

export const getServerSideProps = ProtectedRoute(
  wrapper.getServerSideProps((store) => async (ctx) => {
    const { req } = ctx;
    // console.log(req.headers.cookie, "cookie on header");
    return {
      props: {},
    };
  })
);
