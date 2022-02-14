import styles from "./CreateAccountFormDiv.module.css";

const CreateAccountFormDiv = ({ topLabel, children }) => {
    return (
        <div className={styles.formGroup}>
            <label>{topLabel}</label>
            <div>{children}</div>
        </div>
    );
};

export default CreateAccountFormDiv;
