import Carousel from "../../../components/Carousel";
import ResetPasswordForm from "../../../components/Auth/ResetPasswordForm";
import Auth from "../../../components/Layouts/Auth";

const ResetPassword = () => {
  return <Auth left={<Carousel />} right={<ResetPasswordForm />} />;
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
    props: {},
  };
};
