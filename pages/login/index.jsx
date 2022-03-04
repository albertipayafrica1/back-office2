import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import axios from "axios";
import Carousel from "../../components/Carousel";
import LoginForm from "../../components/LoginForm";
import Auth from "../../components/Layouts/Auth";
import useForm from "../../hooks/useForm";
import { loginFormValidation } from "../../utils/loginFormValidation";

axios.defaults.withCredentials = true;

const Login = () => {
  const router = useRouter();
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
    const isValid = await loginFormValidation.isValid(formData, {
      abortEarly: false,
    });
    if (isValid) {
      const config = {
        method: "post",
        url: `https://29e1-41-242-3-169.ngrok.io/auth/login`,
        data: JSON.stringify(formData),
        withCredentials: true,
      };
      axios(config)
        .then((response) => {
          console.log(response, "response");
          if (response.data.success === true) {
            setLoading(false);

            Cookies.set("AccessToken", response.data.token, {
              secure: true,
            });
            router.push("/otp");
          } else {
            console.log(response, "response0");
            setErrors({ ...errors, generic: "Invalid username or Password" });
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error.response, "response");
          if (error.response) {
            setErrors({ ...errors, generic: error.response.data.response });
          } else {
            setErrors({ ...errors, generic: "Something went wrong" });
          }

          setLoading(false);
        });
    } else {
      await loginFormValidation
        .validate(formData, { abortEarly: false })
        .catch((err) => {
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

export default Login;
