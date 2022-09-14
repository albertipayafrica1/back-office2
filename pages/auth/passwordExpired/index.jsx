import { useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import Cookies from "js-cookie";

import Carousel from "../../../components/Auth/Carousel";
import PasswordExpiredForm from "../../../components/Auth/PasswordExpiredForm";
import Auth from "../../../components/Layouts/Auth";

import useForm from "../../../hooks/useForm";
import { resetPassword } from "../../../utils/formValidations/resetPassword";

axios.defaults.withCredentials = true;

const PasswordExpired = () => {
  const router = useRouter();
  const { query } = router;
  const [formData, handleFormChange] = useForm({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
    generic: "",
  });
  const [success, setSuccess] = useState({ status: false, message: "" });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess({});

    const credentials = Cookies.get("iPayT");

    const isValid = await resetPassword.isValid(formData, {
      abortEarly: false,
    });

    if (isValid) {
      const body = {
        password: formData.newPassword,
        confirm_password: formData.confirmPassword,
      };
      const config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/new-password`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${credentials}`,
          "Device-Channel": "web",
        },
        data: JSON.stringify(body),
        withCredentials: true,
      };
      axios(config)
        .then((response) => {
          if (response.data.success === true) {
            setSuccess({ status: true, message: response.data.response });
            Cookies.set("iPayT", "", { expires: -1 });
            router.replace("/auth/login");
          } else {
            setErrors({ generic: "Something Went wrong" });
            setLoading(false);
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.data.response) {
              setErrors({
                ...errors,
                generic: error.response.data.response,
              });
            } else {
              setErrors({
                ...errors,
                generic: "Something went wrong",
              });
            }
          } else {
            setErrors({ ...errors, generic: "Something went wrong" });
          }

          setLoading(false);
        });
    } else {
      await resetPassword
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
        <PasswordExpiredForm
          handleSubmit={handleSubmit}
          loading={loading}
          formData={formData}
          handleFormChange={handleFormChange}
          errors={errors}
          success={success}
        />
      }
    />
  );
};

export default PasswordExpired;
