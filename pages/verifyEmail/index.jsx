import { useEffect } from "react";
import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { Box } from "@mui/material";
import axios from "axios";

const VerifyEmail = ({ message }) => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/login");
    }, 5000);
  }, []);

  return <Box>{message}</Box>;
};

VerifyEmail.propTypes = {
  message: PropTypes.string.isRequired,
};
export default VerifyEmail;

export const getServerSideProps = async (context) => {
  const { query } = context;
  // console.log(query.Rc, "query");
  return {
    props: {
      message: "hello",
    },
  };
};
