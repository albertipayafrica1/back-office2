import Carousel from "../components/Carousel";
import AuthForm from "../components/AuthForm";
import Auth from "../components/Layouts/Auth";

const Login = () => {
    return <Auth left={<Carousel />} right={<AuthForm />} />;
};

export default Login;
