import Carousel from "../../components/Carousel";
import ResetPasswordRequestForm from "../../components/ResetPasswordRequestForm";
import Auth from "../../components/Layouts/Auth";

const ResetPasswordRequest = () => {
  return <Auth left={<Carousel />} right={<ResetPasswordRequestForm />} />;
};

export default ResetPasswordRequest;

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
