import { useState } from "react";

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleValueChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const setValue = (name, value) => {
        setValues({
            ...values,
            [name]: value,
        });
    };

    return [values, handleValueChange, setValue];
};

export default useForm;
