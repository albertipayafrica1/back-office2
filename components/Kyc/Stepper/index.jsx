import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import {
  Stepper,
  Step,
  StepLabel,
  StepButton,
  Typography,
  useMediaQuery,
  InputAdornment,
  Tooltip,
  Stack,
  Box,
} from "@mui/material";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import KycCompleteDialog from "../KycCompleteDialog";

import BusinessStructureForm from "../RegisteredBusinessFlow/BusinessStructureForm";
import BusinessOwnersForm from "../RegisteredBusinessFlow/BusinessOwnersForm";
import BankDetailsForm from "../RegisteredBusinessFlow/BankDetailsForm";
import ComplianceForm from "../RegisteredBusinessFlow/ComplianceForm";
import BusinessFulfillmentDetailsForm from "../RegisteredBusinessFlow/BusinessFulfillmentDetailsForm";
import BusinessSupportDetailsForm from "../RegisteredBusinessFlow/BusinessSupportDetailsForm";
import PrivateLimitedCompany from "../RegisteredBusinessFlow/DocumentUploads/PrivateLimitedCompany";
import LearningInstitution from "../RegisteredBusinessFlow/DocumentUploads/LearningInstitution";
import GovernmentDepartment from "../RegisteredBusinessFlow/DocumentUploads/GovernmentDepartment";
import ProfessionalEntities from "../RegisteredBusinessFlow/DocumentUploads/ProfessionalEntities";
import SoleProprietorship from "../RegisteredBusinessFlow/DocumentUploads/SoleProprietorship";
import Trust from "../RegisteredBusinessFlow/DocumentUploads/Trust";
import WelfareGroups from "../RegisteredBusinessFlow/DocumentUploads/WelfareGroups";

import LongTermPersonalDetailsForm from "../UnRegisteredBusinessFlow/LongTermFlow/PersonalDetailsForm";
import ShortTermPersonalDetailsForm from "../UnRegisteredBusinessFlow/ShortTermFlow/PersonalDetailsForm";
import BankDetailsFormUnRegistered from "../UnRegisteredBusinessFlow/BankDetailsForm";
import ComplianceFormUnRegistered from "../UnRegisteredBusinessFlow/ComplianceForm";
import Education from "../UnRegisteredBusinessFlow/ShortTermFlow/DocumentUploads/Education";
import FundRaising from "../UnRegisteredBusinessFlow/ShortTermFlow/DocumentUploads/FundRaising";
import Funeral from "../UnRegisteredBusinessFlow/ShortTermFlow/DocumentUploads/Funeral";
import Medical from "../UnRegisteredBusinessFlow/ShortTermFlow/DocumentUploads/Medical";
import Wedding from "../UnRegisteredBusinessFlow/ShortTermFlow/DocumentUploads/Wedding";

import { styles, stepper, container } from "./styles";

const HorizontalLinearStepper = ({ flow, companyType, duration }) => {
  const matches = useMediaQuery("(min-width:800px)");
  const kycStatus = useSelector((state) => state.kycStatus.kycStatus);

  const [activeStep, setActiveStep] = useState(0);
  const [stepFailed, setStepFailed] = useState(new Set());

  useEffect(() => {
    setActiveStep(
      kycStatus !== undefined && kycStatus.lastStep !== undefined
        ? kycStatus.lastStep
        : 0
    );
  }, []);

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
          return <BusinessOwnersForm handleNextStep={handleNext} />;
        case 2:
          return <BankDetailsForm handleNextStep={handleNext} />;
        case 3:
          return <ComplianceForm handleNextStep={handleNext} />;
        case 4:
          return <BusinessFulfillmentDetailsForm handleNextStep={handleNext} />;
        case 5:
          return <BusinessSupportDetailsForm handleNextStep={handleNext} />;
        case 6:
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
        { toolTip: false, toolTipText: "", label: "Structure" },
        { toolTip: false, toolTipText: "", label: "Owners" },
        { toolTip: false, toolTipText: "", label: "Bank Details" },
        {
          toolTip: false,
          toolTipText: "",
          label: "Consent",
        },
        {
          toolTip: false,
          toolTipText: "",
          label: "Fulfillment",
        },
        { toolTip: false, toolTipText: "", label: "Support" },
        {
          toolTip: true,
          toolTipText:
            "(NOTE: - Uploaded file should not exceed 5MB- Accepted file formats are PNG, JPEG, JPG, PDF)",
          label: "Document Upload",
        },
      ];
    }
    if (flow === "nonRegistered" && duration === "shortTerm") {
      return [
        { toolTip: false, toolTipText: "", label: "Personal Details" },
        { toolTip: false, toolTipText: "", label: "Bank Details" },
        {
          toolTip: false,
          toolTipText: "Compliance",
          label: "Compliance",
        },
        {
          toolTip: true,
          toolTipText:
            "(NOTE: - Uploaded file should not exceed 5MB- Accepted file formats are PNG, JPEG, JPG, PDF)",
          label: "Document Upload",
        },
      ];
    }

    return [
      { toolTip: false, toolTipText: "", label: "Personal Details" },
      { toolTip: false, toolTipText: "", label: "Bank Details" },
      {
        toolTip: false,
        toolTipText: "Compliance",
        label: "Compliance",
      },
    ];
  };

  const steps = getSteps();

  return (
    <Box sx={container}>
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
              <StepButton disableRipple>
                <StepLabel onClick={handleStep(index)} {...labelProps}>
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
      <div>
        {activeStep === steps.length ? (
          <div>
            {kycStatus.slug !== undefined && kycStatus.slug === "REVIEW" ? (
              <KycCompleteDialog open />
            ) : (
              <Typography className={styles.instructions}>
                Your Submission is under Review
              </Typography>
            )}

            {/* <Button onClick={handleReset} className={styles.button}>
              Reset
            </Button> */}
          </div>
        ) : (
          <div>
            <div>{getStepContent(activeStep)}</div>

            {/* <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={styles.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div> */}
          </div>
        )}
      </div>
    </Box>
  );
};

HorizontalLinearStepper.propTypes = {
  flow: PropTypes.string.isRequired,
  companyType: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
};

export default HorizontalLinearStepper;
