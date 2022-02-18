import { useRouter } from "next/router";
import Image from "next/image";

import { Stack, Typography } from "@mui/material";

import useForm from "../../hooks/useForm";

import CreateAccountFormDiv from "../../atoms/CreateAccountFormDiv";
import CustomInput from "../../atoms/CustomInput";

const CreateAccountForm = () => {
    const router = useRouter();
    const [formData, handleFormChange] = useForm({
        surname: "",
        firstName: "",
        MiddleName: "",
        countryOfOperation: "",
    });

    const selectItem = [];
    const error = {};

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push("/");
    };

    return (
        <Stack
            sx={{ padding: "2rem" }}
            component="form"
            onSubmit={handleSubmit}
            spacing={5}
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
                            helperText=""
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
                        type="text"
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
                        selectItem={selectItem}
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
                        selectItem={selectItem}
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
                        selectItem={selectItem}
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
                        selectItem={selectItem}
                        id="businessType"
                        value={formData.businessType}
                        onChange={handleFormChange}
                        required
                    />
                </Stack>
            </CreateAccountFormDiv>
        </Stack>
    );
};

export default CreateAccountForm;
