import Carousel from "../components/Carousel";
import OTPInput from "../components/OTPInput";
import Auth from "../components/Layouts/Auth";

const Login = () => {
    return <Auth left={<Carousel />} right={<OTPInput />} />;
};

export default Login;
