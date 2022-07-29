import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";

import { Typography, Stack, Box, useMediaQuery } from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/CancelOutlined";

import { Formik, Form } from "formik";
import FormikControl from "../../FormikControls/index";

import TransactionButton from "../../../atoms/TransactionButton";

import {
  dayOfSettlementOptions,
  durationOptions,
  advanceOptions,
} from "./data";

import * as styles from "./styles";
import Loader from "../../../atoms/Loader";

const ScheduledSettlement = ({ footer }) => {
  const initialValues = { duration: "", day: [], advance: [] };
  const [formValues, setFormValues] = useState({
    duration: "",
    day: [],
    advance: [],
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");
  const selectedCurrency = useSelector(
    (state) => state?.currency?.globalCurrency
  );

  const toggleEditMode = (formik) => {
    setEditMode((prevState) => !prevState);
    formik.resetForm();
  };

  const saveHandler = () => {
    setEditMode(false);
  };

  useEffect(() => {
    setLoading(true);
    setFormValues({ duration: "", day: [], advance: [] }); // use this to fetch formvalues from server
    setLoading(false);
  }, [editMode]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Stack sx={{ pl: 10, pr: 10, pb: 10 }} spacing={8}>
        <Formik initialValues={formValues || initialValues} enableReinitialize>
          {(formik) => {
            console.log(formik.values);
            return (
              <Form>
                <Stack spacing={3}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="subtitle6"
                      sx={{ color: (theme) => theme.colors.blue }}
                    >
                      TIME FREQUENCY SETTINGS ({selectedCurrency})
                    </Typography>
                    <Box sx={{ pt: 4, width: `${matches ? "15%" : "50%"}` }}>
                      <TransactionButton
                        text={editMode ? "Cancel Editing" : "Edit Settings"}
                        icon={
                          editMode ? (
                            <CancelIcon sx={{ fontSize: "15px" }} />
                          ) : (
                            <EditIcon sx={{ fontSize: "15px" }} />
                          )
                        }
                        onClick={() => {
                          toggleEditMode(formik);
                        }}
                      />
                    </Box>
                  </Stack>
                  <Typography
                    variant="subtitle5"
                    sx={{ color: (theme) => theme.colors.orange }}
                  >
                    Duration
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={4}
                    sx={{ pl: 3 }}
                  >
                    <Typography
                      variant="subtitle5"
                      sx={{ color: (theme) => theme.colors.blue }}
                    >
                      Settle me:
                    </Typography>
                    <FormikControl
                      control="radio"
                      name="duration"
                      label=""
                      options={durationOptions}
                      required
                      externalStyles={styles.radioExternalStyles}
                      row
                      disabled={!editMode}
                      onChange={(e) => {
                        formik.setFieldValue("duration", e.target.value);
                        if (e.target.value === "1") {
                          formik.setFieldValue("day", [
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                          ]);
                        } else {
                          formik.setFieldValue("day", "");
                        }
                      }}
                    />
                  </Stack>
                  <Typography
                    variant="subtitle5"
                    sx={{ color: (theme) => theme.colors.orange }}
                  >
                    Day Of Settlement
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={4}
                    sx={{ pl: 3 }}
                  >
                    <Typography
                      variant="subtitle5"
                      sx={{ color: (theme) => theme.colors.blue }}
                    >
                      Settle me every:
                    </Typography>
                    {formik.values.duration === "1" ? (
                      <FormikControl
                        control="checkbox"
                        name="day"
                        label=""
                        options={dayOfSettlementOptions}
                        required
                        externalStyles={styles.checkboxExternalStyles}
                        row
                        disabled={!editMode}
                      />
                    ) : (
                      <FormikControl
                        control="radio"
                        name="day"
                        label=""
                        options={dayOfSettlementOptions}
                        required
                        externalStyles={styles.radioExternalStyles}
                        row
                        disabled={!editMode}
                      />
                    )}
                  </Stack>
                  <Typography
                    variant="subtitle5"
                    sx={{ color: (theme) => theme.colors.orange }}
                  >
                    Options
                  </Typography>
                  <Stack spacing={4} sx={{ pl: 3 }}>
                    <FormikControl
                      control="checkbox"
                      name="advance"
                      label=""
                      options={advanceOptions}
                      required
                      externalStyles={styles.checkbox1ExternalStyles}
                      disabled={!editMode}
                    />
                  </Stack>
                </Stack>
                {editMode && (
                  <Box sx={{ pt: 6, width: `${matches ? "15%" : "50%"}` }}>
                    <TransactionButton
                      text="Save Changes"
                      icon={<SaveIcon sx={{ fontSize: "15px" }} />}
                      onClick={saveHandler}
                      activeState
                      disabled={
                        formik.values.duration === "" ||
                        formik.values.day === "" ||
                        formik.values.day.length === 0
                      }
                    />
                  </Box>
                )}
              </Form>
            );
          }}
        </Formik>
        {footer}
      </Stack>
    </>
  );
};

ScheduledSettlement.propTypes = {
  footer: PropTypes.node.isRequired,
};
export default ScheduledSettlement;
