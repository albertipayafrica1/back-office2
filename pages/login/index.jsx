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
    console.log(process.env.NEXT_PUBLIC_BACKED_BASE_URL);
    Cookies.set("key", "value", { secure: true, httpOnly: true });
    e.preventDefault();
    setLoading(true);
    const isValid = await loginFormValidation.isValid(formData, {
      abortEarly: false,
    });
    if (isValid) {
      router.push("/otp");
      const config = {
        method: "post",
        url: `https://4812-41-242-3-169.ngrok.io/auth/login`,
        data: JSON.stringify(formData),
        withCredentials: true,
      };
      axios(config)
        .then((response) => {
          console.log(response, "response");
          if (response.data.success === true) {
            setLoading(false);
            const storedObject = {
              id: response.uuid,
              ipay1: response.login_otp_token,
              ipay2: response.response,
            };
            localStorage.setItem("ipay", JSON.stringify(storedObject));
            router.push("/otp");
          } else {
            setErrors({ generic: response.response });
          }
        })
        .catch((error) => {
          console.log(error);
        });

      setErrors({ ...errors, generic: "this is a generic error" });
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
