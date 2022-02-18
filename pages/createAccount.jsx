import Carousel from "../components/Carousel";
import CreateAccountForm from "../components/CreateAccountForm";
import Auth from "../components/Layouts/Auth";

const Login = () => {
    return <Auth left={<Carousel />} right={<CreateAccountForm />} />;
};

export default Login;
