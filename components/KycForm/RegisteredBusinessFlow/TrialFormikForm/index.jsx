import React, { useEffect, useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import FormikControl from "../../../FormikControls";
import { checkbox } from "../BusinessStructureForm/styles";

const TrialFormikForm = () => {
  const dropdownOptions = [
    { key: "Select an option", value: "" },
    { key: "Option 1", value: "option1" },
    { key: "Option 2", value: "option2" },
    { key: "Option 3", value: "option3" },
  ];
  const checkboxOptions = [
    { key: "Option 1", value: "cOption1" },
    { key: "Option 2", value: "cOption2" },
    { key: "Option 3", value: "cOption3" },
  ];
  const radioOptions = [
    { key: "Option 1", value: "rOption1" },
    { key: "Option 2", value: "rOption2" },
    { key: "Option 3", value: "rOption3" },
  ];
  const kenyaIpayProducts = [
    { id: "1", value: "iPay Pos/PDQ" },
    { id: "2", value: "iPay Online" },
    { id: "3", value: "E-invoicing" },
    { id: "4", value: "iPay Lite" },
    { id: "5", value: "iPay Payouts" },
  ];
  const initialValues = {
    email: "",
    directors: 1,
    directorArray: [
      {
        director1: {
          name: "",
          surname: "",
        },
      },
    ],
    password: "jnjn",
    description: "",
    countryOfOperation: "",
    radioOption: "",
    checkboxOption: [],
    dateOfBirth: new Date(""),
  };

  const apiValues = {
    email: "sds@dsa.com",
    directors: 1,
    directorArray: [],
    password: "jnjn",
    description: "",
    countryOfOperation: "",
    radioOption: "",
    checkboxOption: [],
    birthDate: null,
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please Enter a valid Email")
      .required("Email is required"),
    directors: Yup.string().min(1).max(10).required("directros required"),
    password: Yup.string().required("Its Required"),
    // description: Yup.string().required("Required"),
    countryOfOperation: Yup.string().required("Required"),
    radioOption: Yup.string().required("Required"),
    // ipayProducts: Yup.array().required("Required"),
    // birthDate: Yup.date().required("Required").nullable(),
    dateOfBirth: Yup.date().required("Required"),
  });
  const onSubmit = (values, formikHelpers) => {
    // console.log("Form data", values);
    // console.log("Saved data", formikHelpers);
    formikHelpers.setErrors({ email: "is the karine" });
  };

  // const formik1 = useFormik({ initialValues });

  // useEffect(() => {
  //   // formValues.directorArray.push({ a: "", b: "" });
  //   // formValues.directorArray.push({ c: "sa" });
  //   console.log("UseEffect ran");
  // }, [formik1.values.directors]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="datePicker"
              label="Date Of Birth"
              name="dateOfBirth"
              required
              onChange={(val) => {
                console.log("___", val);
                formik.setFieldValue("dateOfBirth", val);
              }}
            />
            <FormikControl
              control="input"
              label="Email"
              name="email"
              variant="outlined"
              type="text"
              id="email"
              required
              onChange={async (e) => {
                formik.setFieldValue("email", e.target.value);
                formik.validateField("email").then((resp) => {});
              }}
            />
            <FormikControl
              control="input"
              label="No of directors"
              name="directors"
              variant="outlined"
              type="text"
              id="directors"
              required
              onChange={async (e) => {
                const a = formik.values.directors;
                // for (let i = 0; i < a; i += 1) {
                //   formik.values.directorArray.push({ a: "a;bert" });
                // }
                formik.setFieldValue("directors", e.target.value);
                formik.validateField("directors").then((resp) => {
                  console.log(resp, "reps");
                });
              }}
            />

            {/* {console.log(formik.values.directors)}
            {console.log(formik.values.directorArray, "da")} */}
            {formik.values.directorArray.map((item) => (
              <FieldArray>
                {(fieldArrayProps) => {
                  return <div>sd</div>;
                }}
              </FieldArray>
            ))}

            {/* 
            <FormikControl
              control="input"
              label="password"
              name="password"
              variant="outlined"
              type="password"
              id="password"
              required
            /> */}
            {/* <FormikControl
            control="textarea"
            label="Description"
            name="description"
          /> */}
            <FormikControl
              control="select"
              variant="outlined"
              name="countryOfOperation"
              label="Country Of Operation"
              type="text"
              select
              selectItem={dropdownOptions}
              id="countryOfOperation"
              required
              haveTooltip
              tooltipText="Select Your Country Of Operation"
            />

            <FormikControl
              control="checkbox"
              label="Checkbox topics"
              options={checkboxOptions}
              name="checkboxOption"
            />
            <FormikControl
              control="radio"
              label="Radio topics"
              options={radioOptions}
              name="radioOption"
            />

            <button type="submit" disabled={!formik.isValid}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default TrialFormikForm;
