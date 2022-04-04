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
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/set-password`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${query.token}`,
        },
        data: JSON.stringify(body),
        withCredentials: true,
      };
      axios(config)
        .then((response) => {
          console.log(response, "response");
          if (response.data.success === true) {
            setSuccess({ status: true, message: response.data.response });
            router.replace(`/login?country=${query.country}`);
          } else {
            setErrors({ generic: "Something Went wrong" });
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error.response, "response");
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
        <ResetPasswordForm
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

export default ResetPassword;

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
