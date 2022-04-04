import { useState } from "react";
import { useRouter } from "next/router";

import PropTypes from "prop-types";

import Cookies from "js-cookie";

import axios from "axios";
import Carousel from "../../components/Carousel";
import LoginForm from "../../components/LoginForm";
import Auth from "../../components/Layouts/Auth";
import useForm from "../../hooks/useForm";
import { login } from "../../utils/formValidations/login";

axios.defaults.withCredentials = true;

const Login = ({ country }) => {
  const router = useRouter();

  const credentials = Cookies.get("iPayT");

  if (credentials !== undefined) {
    Cookies.set("iPayT", "", { expires: -1 });
  }

  const [formData, handleFormChange] = useForm({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    generic: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ ...errors, generic: "" });
    const isValid = await login.isValid(formData, {
      abortEarly: false,
    });
    if (isValid) {
      const config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(formData),
        withCredentials: true,
      };
      axios(config)
        .then((response) => {
          if (response.data.success === true) {
            Cookies.set("iPayT", response.data.token, {
              secure: true,
            });
            router.replace(`/otp?country=${country}`);
          } else {
            console.log(response, "response0");
            setErrors({ ...errors, generic: "Invalid username or Password" });
            setLoading(false);
          }
        })
        .catch((error) => {
          if (error.response) {
            setErrors({ ...errors, generic: error.response.data.response });
          } else {
            setErrors({ ...errors, generic: "Something went wrong" });
          }

          setLoading(false);
        });
    } else {
      await login.validate(formData, { abortEarly: false }).catch((err) => {
        const errs = err.inner.reduce(
          (acc, error) => ({
            ...acc,
            [error.path]: error.message,
          }),
          {}
        );
        setErrors(errs);
        setLoading(false);
      });
    }
  };

  return (
    <Auth
      left={<Carousel />}
      right={
        <LoginForm
          handleSubmit={handleSubmit}
          loading={loading}
          formData={formData}
          handleFormChange={handleFormChange}
          errors={errors}
        />
      }
    />
  );
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
