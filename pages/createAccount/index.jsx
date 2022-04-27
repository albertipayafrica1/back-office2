import { useState } from "react";

import PropTypes from "prop-types";

import { countryOfOperation } from "../../utils/countryOfOperation";

import Carousel from "../../components/Carousel";
import CreateAccountForm from "../../components/CreateAccountForm";
import Auth from "../../components/Layouts/Auth";

const CreateAccount = ({ countryCode, rc }) => {
  const [emailAlert, setEmailAlert] = useState(false);

  const [nameOnAlert, setNameOnAlert] = useState("");

  const emailAlertHandler = (showAlert, name) => {
    setEmailAlert(showAlert);
    setNameOnAlert(name);
  };

  return (
    <Auth
      left={<Carousel />}
      right={
        <CreateAccountForm
          countryCode={countryCode}
          rc={rc}
          emailAlertHandler={emailAlertHandler}
        />
      }
      alert={emailAlert}
      nameOnAlert={nameOnAlert}
    />
  );
};

export const getServerSideProps = async (context) => {
  const { country, rc } = context.query;

  let givenCountryCode = country;

  if (givenCountryCode !== undefined) {
    givenCountryCode = country.toUpperCase();
  }

  const givenrc = rc;

  if (givenCountryCode === undefined && givenrc === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: `/createAccount?country=KE&rc=RC000000`,
      },
    };
  }
  if (
    givenCountryCode !== "KE" &&
    givenCountryCode !== "UG" &&
    givenCountryCode !== "TZ" &&
    givenCountryCode !== "TG" &&
    givenrc !== undefined
  ) {
    return {
      redirect: {
        permanent: false,
        destination: `/createAccount?country=KE&rc=${givenrc}`,
      },
    };
  }
  if (
    givenCountryCode !== undefined &&
    givenCountryCode !== "KE" &&
    givenCountryCode !== "UG" &&
    givenCountryCode !== "TZ" &&
    givenCountryCode !== "TG" &&
    givenrc === undefined
  ) {
    return {
      redirect: {
        permanent: false,
        destination: `/createAccount?country=KE&rc=RC000000`,
      },
    };
  }
  if (givenCountryCode !== undefined && givenrc === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: `/createAccount?country=${givenCountryCode}&rc=RC000000`,
      },
    };
  }

  if (givenCountryCode === undefined) {
    givenCountryCode = "KE";
  }
  const givenCountry = countryOfOperation(givenCountryCode);

  const data = {
    country: givenCountry,
    rc: givenrc,
  };

  return {
    props: {
      countryCode: givenCountryCode,
      rc: givenrc,
    },
  };
};

CreateAccount.propTypes = {
  countryCode: PropTypes.string.isRequired,
  rc: PropTypes.string.isRequired,
};

export default CreateAccount;
