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
// import BusinessComplianceForm from "../../components/KycForm/RegisteredBusinessFlow/BusinessComplianceForm";
import BusinessFulfillmentDetailsForm from "../KycForm/RegisteredBusinessFlow/BusinessFulfillmentDetailsForm";
import BusinessSupportDetailsForm from "../KycForm/RegisteredBusinessFlow/BusinessSupportDetailsForm";

import { styles } from "./styles";

const HorizontalLinearStepper = () => {
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
    switch (step) {
      case 0:
        return <BusinessStructureForm handleNextStep={handleNext} />;
      case 1:
        return <BankDetailsForm handleNextStep={handleNext} />;
      case 2:
        return BusinessStructureForm;
      case 3:
        return <BusinessFulfillmentDetailsForm handleNextStep={handleNext} />;
      case 4:
        return <BusinessSupportDetailsForm handleNextStep={handleNext} />;
      case 5:
        return BusinessStructureForm;
      default:
        return BusinessStructureForm;
    }
  };

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
          "(NOTE: - This is dependant of the Document Type entered- Upload file should not exceed 195KB- Accepted file formats should be JPEG, JPG, PDF)",
        label: "Document Upload",
      },
    ];
  };

  const steps = getSteps();

  return (
    <div>
      <Stepper activeStep={activeStep} orientation="horizontal">
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
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={styles.instructions}>
              All steps completed - you&quot;re finished
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

// HorizontalLinearStepper.propTypes = {
//   classes: PropTypes.object,
// };

export default HorizontalLinearStepper;
