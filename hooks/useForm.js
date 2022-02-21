import { useState } from "react";

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleValueChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    // setValue is only for checkboxes group
    const setValue = (e) => {
        if (e.target.checked) {
            const eventName = [e.target.name];
            const newArr = values[eventName];
            newArr.push(e.target.value);
            setValues({
                ...values,
                [e.target.name]: newArr,
            });
        } else {
            const eventName = [e.target.name];
            const newArr = values[eventName];
            const index = newArr.indexOf(e.target.value);
            if (index > -1) {
                newArr.splice(index, 1);
            }
            setValues({
                ...values,
                [e.target.name]: newArr,
            });
        }
    };

    return [values, handleValueChange, setValue];
};

export default useForm;
