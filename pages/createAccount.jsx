import Carousel from "../components/Carousel";
import CreateAccountFormDiv from "../atoms/CreateAccountFormDiv";
import Auth from "../components/Layouts/Auth";

const Login = () => {
    return (
        <Auth
            left={<Carousel />}
            right={
                <CreateAccountFormDiv topLabel="dsa">
                    hello
                </CreateAccountFormDiv>
            }
        />
    );
};

export default Login;
