import { useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import Carousel from "../../components/Carousel";
import ResetPasswordForm from "../../components/ResetPasswordForm";
import Auth from "../../components/Layouts/Auth";

import useForm from "../../hooks/useForm";
import { resetPassword } from "../../utils/formValidations/resetPassword";

axios.defaults.withCredentials = true;

const ResetPassword = () => {
  const router = useRouter();
  const [formData, handleFormChange] = useForm({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
    generic: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ ...errors, generic: "" });
    const isValid = await resetPassword.isValid(formData, {
      abortEarly: false,
    });
    if (isValid) {
      const config = {
        method: "post",
        url: `https://merchantregistration.ipayprojects.com/auth/resetPassword`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(formData),
        withCredentials: true,
      };
      axios(config)
        .then((response) => {
          console.log(response, "response");
          if (response.data.success === true) {
            router.replace("/login");
          } else {
            setErrors({ ...errors, generic: "Something Went wrong" });
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
        <ResetPasswordForm
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

export default ResetPassword;