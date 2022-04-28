import React from "react";
import CreateAccountOtpDialog from "../../components/CreateAccountOtpDialog";
import Search from "../../atoms/Search";

function index(props) {
  const paperPropsStyling = {
    position: "absolute",
    m: 0,
    top: 10,
    left: 50,
  };
  return (
    // <div>
    //   <CreateAccountOtpDialog
    //     open
    //     backDropVisible
    //     paperPropsStyling={paperPropsStyling}
    //   />
    // </div>
    <Search />
  );
}

export default index;
