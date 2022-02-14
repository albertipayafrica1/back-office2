import Carousel from "../components/Carousel";
import LoginForm from "../components/LoginForm";
import Auth from "../components/Layouts/Auth";

const Login = () => {
  return <Auth left={<Carousel />} right={<LoginForm />} />;
};

export default Login;
