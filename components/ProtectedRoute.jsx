import PropTypes from "prop-types";

const ProtectedRoute = (gssp) => {
  return async (ctx) => {
    const { req } = ctx;
    // console.log(req.headers, "request");
    if (!req.headers.cookie) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
    // return await gssp(ctx); // use this incase the context is not returned
    return gssp(ctx);
  };
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
