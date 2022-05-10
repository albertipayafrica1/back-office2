import React from "react";
import CreateAccountOtpDialog from "../../components/CreateAccountOtpDialog";
import Search from "../../atoms/Search";
import DownloadDiv from "../../atoms/DownloadDiv";

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
    <>
      <Search />
      <DownloadDiv
        text="Download Our AML (Anti-Money Laundering)/KYC questionnaire for signature"
        downloadUrl="https://www.irs.gov/pub/irs-pdf/fw8ben.pdf"
      />
    </>
  );
}

export default index;
