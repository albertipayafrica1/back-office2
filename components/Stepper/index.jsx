import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Stepper,
  Step,
  StepLabel,
  StepButton,
  Button,
  Typography,
  useMediaQuery,
  InputAdornment,
  Tooltip,
  Stack,
  Box,
} from "@mui/material";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import BusinessStructureForm from "../KycForm/RegisteredBusinessFlow/BusinessStructureForm";
import BankDetailsForm from "../KycForm/RegisteredBusinessFlow/BankDetailsForm";
import ComplianceForm from "../KycForm/RegisteredBusinessFlow/ComplianceForm";
import BusinessFulfillmentDetailsForm from "../KycForm/RegisteredBusinessFlow/BusinessFulfillmentDetailsForm";
import BusinessSupportDetailsForm from "../KycForm/RegisteredBusinessFlow/BusinessSupportDetailsForm";
import PrivateLimitedCompany from "../KycForm/RegisteredBusinessFlow/DocumentUploads/PrivateLimitedCompany";
import LearningInstitution from "../KycForm/RegisteredBusinessFlow/DocumentUploads/LearningInstitution";
import GovernmentDepartment from "../KycForm/RegisteredBusinessFlow/DocumentUploads/GovernmentDepartment";
import ProfessionalEntities from "../KycForm/RegisteredBusinessFlow/DocumentUploads/ProfessionalEntities";
import SoleProprietorship from "../KycForm/RegisteredBusinessFlow/DocumentUploads/SoleProprietorship";
import Trust from "../KycForm/RegisteredBusinessFlow/DocumentUploads/Trust";
import WelfareGroups from "../KycForm/RegisteredBusinessFlow/DocumentUploads/WelfareGroups";

import LongTermPersonalDetailsForm from "../KycForm/UnRegisteredBusinessFlow/LongTermFlow/PersonalDetailsForm";
import ShortTermPersonalDetailsForm from "../KycForm/UnRegisteredBusinessFlow/ShortTermFlow/PersonalDetailsForm";
import BankDetailsFormUnRegistered from "../KycForm/UnRegisteredBusinessFlow/BankDetailsForm";
import ComplianceFormUnRegistered from "../KycForm/UnRegisteredBusinessFlow/ComplianceForm";
import Education from "../KycForm/UnRegisteredBusinessFlow/ShortTermFlow/DocumentUploads/Education";
import FundRaising from "../KycForm/UnRegisteredBusinessFlow/ShortTermFlow/DocumentUploads/FundRaising";
import Funeral from "../KycForm/UnRegisteredBusinessFlow/ShortTermFlow/DocumentUploads/Funeral";
import Medical from "../KycForm/UnRegisteredBusinessFlow/ShortTermFlow/DocumentUploads/Medical";
import Wedding from "../KycForm/UnRegisteredBusinessFlow/ShortTermFlow/DocumentUploads/Wedding";

import { styles, stepper } from "./styles";

const HorizontalLinearStepper = ({ flow, companyType, duration }) => {
  const matches = useMediaQuery("(min-width:800px)");
  const [activeStep, setActiveStep] = useState(0);
  const [stepFailed, setStepFailed] = useState(new Set());

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setStepFailed(new Set());
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

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

  const addStepFailed = (step) => {
    if (stepFailed.has(step)) return;

    setStepFailed((prevSteps) => {
      const newFailed = new Set(prevSteps.values());
      newFailed.add(step);
      return newFailed;
    });
  };

  const removeStepFailed = (step) => {
    if (!stepFailed.has(step)) return;

    setStepFailed((prevSteps) => {
      const newFailed = new Set(prevSteps.values());
      newFailed.delete(step);
      return newFailed;
    });
  };

  const getStepContent = (step) => {
    if (flow === "registered") {
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
          if (companyType === "privateLimitedCompany") {
            return <PrivateLimitedCompany handleNextStep={handleNext} />;
          }
          if (companyType === "learningInstitution") {
            return <LearningInstitution handleNextStep={handleNext} />;
          }
          if (companyType === "governmentDepartment") {
            return <GovernmentDepartment handleNextStep={handleNext} />;
          }
          if (companyType === "professionalEntities") {
            return <ProfessionalEntities handleNextStep={handleNext} />;
          }
          if (companyType === "soleProprietorship") {
            return <SoleProprietorship handleNextStep={handleNext} />;
          }
          if (companyType === "trust") {
            return <Trust handleNextStep={handleNext} />;
          }
          if (companyType === "welfareGroups") {
            return <WelfareGroups handleNextStep={handleNext} />;
          }
          return <PrivateLimitedCompany handleNextStep={handleNext} />;
        default:
          return <BusinessStructureForm handleNextStep={handleNext} />;
      }
    } else if (flow === "nonRegistered" && duration === "shortTerm") {
      switch (step) {
        case 0:
          return <ShortTermPersonalDetailsForm handleNextStep={handleNext} />;
        case 1:
          return <BankDetailsFormUnRegistered handleNextStep={handleNext} />;
        case 2:
          return <ComplianceFormUnRegistered handleNextStep={handleNext} />;
        case 3:
          if (companyType === "education") {
            return <Education handleNextStep={handleNext} />;
          }
          if (companyType === "fundRaising") {
            return <FundRaising handleNextStep={handleNext} />;
          }
          if (companyType === "funeral") {
            return <Funeral handleNextStep={handleNext} />;
          }
          if (companyType === "medical") {
            return <Medical handleNextStep={handleNext} />;
          }
          if (companyType === "wedding") {
            return <Wedding handleNextStep={handleNext} />;
          }
          return <Education handleNextStep={handleNext} />;
        default:
          return <ShortTermPersonalDetailsForm handleNextStep={handleNext} />;
      }
    } else {
      switch (step) {
        case 0:
          return <LongTermPersonalDetailsForm handleNextStep={handleNext} />;
        case 1:
          return <BankDetailsFormUnRegistered handleNextStep={handleNext} />;
        case 2:
          return <ComplianceFormUnRegistered handleNextStep={handleNext} />;
        default:
          return <LongTermPersonalDetailsForm handleNextStep={handleNext} />;
      }
    }
  };

  const getSteps = () => {
    if (flow === "registered") {
      return [
        { toolTip: false, toolTipText: "", label: "Business Structure" },
        { toolTip: false, toolTipText: "", label: "Business Bank Details" },
        {
          toolTip: true,
          toolTipText: "Business compliance",
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
            "(NOTE: - This is dependant of the Document Type entered- Upload file should not exceed 5MB- Accepted file formats are PNG, JPEG, JPG, PDF)",
          label: "Document Upload",
        },
      ];
    }
    if (flow === "nonRegistered" && duration === "shortTerm") {
      return [
        { toolTip: false, toolTipText: "", label: "Personal Details" },
        { toolTip: false, toolTipText: "", label: "Bank Details" },
        {
          toolTip: true,
          toolTipText: "Compliance",
          label: "Compliance",
        },
        {
          toolTip: true,
          toolTipText:
            "(NOTE: - This is dependant of the Document Type entered- Upload file should not exceed 5MB- Accepted file formats should be PNG, JPEG, JPG, PDF)",
          label: "Document Upload",
        },
      ];
    }

    return [
      { toolTip: false, toolTipText: "", label: "Personal Details" },
      { toolTip: false, toolTipText: "", label: "Bank Details" },
      {
        toolTip: true,
        toolTipText: "Compliance",
        label: "Compliance",
      },
    ];
  };

  const steps = getSteps();

  return (
    <div>
      <Stepper activeStep={activeStep} orientation="horizontal" sx={stepper}>
        {steps.map((item, index) => {
          const props = {};
          const labelProps = {};
          if (isStepFailed(index)) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Alert message
              </Typography>
            );
            labelProps.error = true;
          }

          return (
            <Step key={item.label} {...props}>
              <StepButton>
                <StepLabel
                  StepIconProps={{
                    classes: {
                      root: { color: "pink" },
                      active: {
                        "&.Mui-active": {
                          color: "red",
                        },
                      },
                      completed: {
                        "&.Mui-completed": {
                          color: "red",
                        },
                      },
                    },
                  }}
                  onClick={handleStep(index)}
                  {...labelProps}
                >
                  {matches ? (
                    <Stack direction="row" alignItems="center">
                      <Box>{item.label}</Box>
                      {item.toolTip && (
                        <InputAdornment position="end">
                          <Tooltip title={item.toolTipText} arrow>
                            <InfoOutlinedIcon
                              sx={{
                                color: (theme) => theme.colors.orange,
                              }}
                            />
                          </Tooltip>
                        </InputAdornment>
                      )}
                    </Stack>
                  ) : (
                    ""
                  )}
                </StepLabel>
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <div style={{ paddingTop: "2.5rem" }}>
        {activeStep === steps.length ? (
          <div>
            <Typography className={styles.instructions}>
              Congratulations! You have successfully completed your kyc
            </Typography>
            <Button onClick={handleReset} className={styles.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <div>{getStepContent(activeStep)}</div>

            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={styles.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

HorizontalLinearStepper.propTypes = {
  flow: PropTypes.string.isRequired,
  companyType: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
};

export default HorizontalLinearStepper;
