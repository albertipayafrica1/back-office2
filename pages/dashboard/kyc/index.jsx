import React, { useState } from "react";
import HorizontalLinearStepper from "../../../components/Stepper";
import ProtectedRoute from "../../../components/ProtectedRoute";

import BusinessStructureForm from "../../../components/KycForm/RegisteredBusinessFlow/BusinessStructureForm";
import BankDetailsForm from "../../../components/KycForm/RegisteredBusinessFlow/BankDetailsForm";
import ComplianceForm from "../../../components/KycForm/RegisteredBusinessFlow/ComplianceForm";
import BusinessFulfillmentDetailsForm from "../../../components/KycForm/RegisteredBusinessFlow/BusinessFulfillmentDetailsForm";
import BusinessSupportDetailsForm from "../../../components/KycForm/RegisteredBusinessFlow/BusinessSupportDetailsForm";
import DocumentUploadForm from "../../../components/KycForm/RegisteredBusinessFlow/DocumentUploads/PrivateLimitedCompany";
import { wrapper } from "../../../redux/store";

const getSteps = () => {
  return [
    { toolTip: false, toolTipText: "", label: "Business Structure" },
    { toolTip: false, toolTipText: "", label: "Business Bank Details" },
    {
      toolTip: true,
      toolTipText: "I Am business compliance",
      label: "Business Compliance",
    },
    {
      toolTip: false,
      toolTipText: "",
      label: "Business Fulfillment Details",
    },
    { toolTip: false, toolTipText: "", label: "Business Support Details" },
    {
      toolTip: true,
      toolTipText:
        "(NOTE: - This is dependant of the Document Type entered- Upload file should not exceed 5MB- Accepted file formats should be PNG, JPEG, JPG, PDF)",
      label: "Document Upload",
    },
  ];
};

const Kyc = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [stepFailed, setStepFailed] = useState(new Set());

  const isStepFailed = (step) => {
    if (stepFailed.has(step)) return true;
    return false;
  };

  const handleNext = () => {
    let newStepFailed = stepFailed;
    if (isStepFailed(activeStep)) {
      newStepFailed = new Set(newStepFailed.values());
      newStepFailed.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setStepFailed(newStepFailed);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <BusinessStructureForm handleNextStep={handleNext} />;
      case 1:
        return <BankDetailsForm handleNextStep={handleNext} />;
      case 2:
        return <ComplianceForm handleNextStep={handleNext} />;
      case 3:
        return <BusinessFulfillmentDetailsForm handleNextStep={handleNext} />;
      case 4:
        return <BusinessSupportDetailsForm handleNextStep={handleNext} />;
      case 5:
        return <DocumentUploadForm handleNextStep={handleNext} />;
      default:
        return BusinessStructureForm;
    }
  };
  return (
    <div>
      <HorizontalLinearStepper
        // getStepContent={getStepContent}
        // getSteps={getSteps}
        // handleNext={handleNext}
        // isStepFailed={isStepFailed}
        // activeStep={activeStep}
        flow="registered"
        companyType="privateLimited"
      />
    </div>
  );
};

export default Kyc;

// export const getServerSideProps = ProtectedRoute(
//   wrapper.getServerSideProps((store) => async (context) => {
//     const { req } = context;
//     console.log(store, "store");

//     return {
//       props: {},
//     };
//   })
// );
