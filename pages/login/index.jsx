import PropTypes from "prop-types";

import Cookies from "js-cookie";

import axios from "axios";
import Carousel from "../../components/Carousel";
import LoginForm from "../../components/LoginForm";
import Auth from "../../components/Layouts/Auth";

axios.defaults.withCredentials = true;

const Login = ({ country }) => {
  const credentials = Cookies.get("iPayT");

  if (credentials !== undefined) {
    Cookies.set("iPayT", "", { expires: -1 });
  }

  return <Auth left={<Carousel />} right={<LoginForm country={country} />} />;
};

Login.propTypes = {
  country: PropTypes.string.isRequired,
};

export default Login;

export const getServerSideProps = async (context) => {
  const { country } = context.query;

  if (
    country === undefined ||
    (country.toUpperCase() !== "KE" &&
      country.toUpperCase() !== "UG" &&
      country.toUpperCase() !== "TZ" &&
      country.toUpperCase() !== "TG")
  ) {
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }

  return {
    props: {
      country,
    },
  };
};
