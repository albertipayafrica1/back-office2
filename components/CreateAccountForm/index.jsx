import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { Stack, Typography, Divider, Box } from "@mui/material";

import { LoadingButton } from "@mui/lab";

import useForm from "../../hooks/useForm";

import CreateAccountFormDiv from "../../atoms/CreateAccountFormDiv";
import CustomInput from "../../atoms/CustomInput";
import CheckBoxes from "../../atoms/CheckBoxes";

import * as styles from "./styles";
import {
    revenue,
    business,
    country,
    registration,
    ipayProducts,
    aboutUs,
    otp,
} from "./data";

const CreateAccountForm = () => {
    const router = useRouter();
    const [formData, handleFormChange, setCheckboxChange] = useForm({
        surname: "",
        firstName: "",
        middleName: "",
        contactNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        countryOfOperation: "",
        registrationDetails: "",
        revenue: "",
        businessType: "",
        ipayProducts: [],
        otp: [],
        aboutUs: [],
    });

    const error = {};
    const loading = false;

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push("/");
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <>
            <Stack sx={{ padding: "2rem" }} spacing={1}>
                <Box>
                    <Image
                        src="/iPay-logo.svg"
                        alt="iPay Logo"
                        width={78}
                        height={39}
                    />
                </Box>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="title6">Create Account</Typography>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={styles.divider}
                    />
                    <Link href="/login">
                        <a style={styles.linkStyle}>
                            <Typography variant="title6" sx={styles.blueText}>
                                Login To Dashboard
                            </Typography>
                        </a>
                    </Link>
                </Stack>
            </Stack>
            <Stack
                sx={{ padding: "2rem" }}
                component="form"
                onSubmit={handleSubmit}
                spacing={8}
            >
                <CreateAccountFormDiv topLabel="Personal Details">
                    <Stack direction="column" spacing={2}>
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="space-between"
                        >
                            <CustomInput
                                variant="outlined"
                                name="surname"
                                label="Surname"
                                type="text"
                                id="surname"
                                value={formData.surname}
                                onChange={handleFormChange}
                                error={error.surname}
                                helperText="hi this is helper text"
                                required
                            />
                            <CustomInput
                                variant="outlined"
                                name="firstName"
                                label="First Name"
                                type="text"
                                id="firstName"
                                value={formData.firstName}
                                onChange={handleFormChange}
                                error={error.firstName}
                                helperText=""
                                required
                            />
                            <CustomInput
                                variant="outlined"
                                name="middleName"
                                label="Middle Name"
                                type="text"
                                id="middleName"
                                value={formData.middleName}
                                onChange={handleFormChange}
                                error={error.middleName}
                                helperText=""
                            />
                        </Stack>

                        <CustomInput
                            variant="outlined"
                            name="contactNumber"
                            label="Contact Number"
                            type="number"
                            id="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleFormChange}
                            error={error.contactNumber}
                            helperText=""
                            required
                        />

                        <CustomInput
                            variant="outlined"
                            name="email"
                            label="Email"
                            type="text"
                            id="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            error={error.email}
                            helperText=""
                            required
                            haveTooltip
                            tooltipText="Enter Your Email"
                        />
                        <CustomInput
                            variant="outlined"
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleFormChange}
                            required
                        />
                        <CustomInput
                            variant="outlined"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleFormChange}
                            required
                        />
                        <CustomInput
                            variant="outlined"
                            name="countryOfOperation"
                            label="Country Of Operation"
                            select
                            selectItem={country}
                            id="countryOfOperation"
                            value={formData.countryOfOperation}
                            onChange={handleFormChange}
                            required
                            haveTooltip
                            tooltipText="Select Your Country Of Operation"
                        />
                    </Stack>
                </CreateAccountFormDiv>
                <CreateAccountFormDiv topLabel="Tell us about your business">
                    <Stack direction="column" spacing={2}>
                        <CustomInput
                            variant="outlined"
                            name="registrationDetails"
                            label="Registration Details"
                            select
                            selectItem={registration}
                            id="registrationDetails"
                            value={formData.registrationDetails}
                            onChange={handleFormChange}
                            required
                        />

                        <CustomInput
                            variant="outlined"
                            name="revenue"
                            label="Your monthly estimated revenue"
                            select
                            selectItem={revenue}
                            id="revenue"
                            value={formData.revenue}
                            onChange={handleFormChange}
                            required
                            haveTooltip
                            tooltipText="What is your monthly estimated revenue?"
                        />

                        <CustomInput
                            variant="outlined"
                            name="businessType"
                            label="Business Type"
                            select
                            selectItem={business}
                            id="businessType"
                            value={formData.businessType}
                            onChange={handleFormChange}
                            required
                        />

                        <CheckBoxes
                            formFields={ipayProducts}
                            fieldChecked={formData.ipayProducts}
                            helperText=""
                            onChange={setCheckboxChange}
                            label="Choose iPay Products"
                            fieldName="ipayProducts"
                        />
                    </Stack>
                </CreateAccountFormDiv>
                {/* <CreateAccountFormDiv topLabel="How would you want to receive the OTP (Verification Code) ?">
                    <CheckBoxes
                        formFields={otp}
                        helperText=""
                        onChange={setFormChange}
                    />
                </CreateAccountFormDiv>
                <CreateAccountFormDiv topLabel="How did you know about us?">
                    <CheckBoxes
                        formFields={aboutUs}
                        helperText=""
                        onChange={setFormChange}
                    />
                </CreateAccountFormDiv>
                <Box>
                    <CheckBoxes
                        formFields={ipayProducts}
                        helperText=""
                        onChange={setFormChange}
                    />
                </Box> */}

                <LoadingButton
                    loading={loading}
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={styles.submitButton}
                    onClick={handleSubmit}
                >
                    Create Account
                </LoadingButton>
                <Stack spacing={2} sx={{ mt: 4 }}>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        sx={{ mr: 4 }}
                    >
                        <Typography variant="title6" sx={{ mr: 2 }}>
                            Need help?
                        </Typography>
                        <Link href="/">
                            <a>
                                <Typography
                                    variant="title6"
                                    sx={styles.contactUs}
                                >
                                    Contact Us
                                </Typography>
                            </a>
                        </Link>
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ mr: 4 }}
                    >
                        <Typography variant="subtitle3">
                            Authorised Payment Services Provider Regulated by
                            the Central Bank of Kenya
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
};

export default CreateAccountForm;
