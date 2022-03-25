import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import PropTypes from "prop-types";

import { Grid, Stack, Typography } from "@mui/material";

import { useField } from "formik";

import { useDropzone } from "react-dropzone";
import SingleFileUploadWithProgress from "./SingleFileUploadWithProgress";
import FileHeader from "./FileHeader";
import UploadError from "./UploadError";

import { styles } from "./styles";

let currentId = 0;

const getNewId = () => {
  // we could use a fancier solution instead of a sequential ID :)
  currentId += 1;
  return currentId;
};

const FileUploadField = ({ name, multiple, label, required, givenFile }) => {
  const [field, meta, helpers] = useField(name);

  const [files, setFiles] = useState([]);
  const onDrop = useCallback((accFiles, rejFiles) => {
    const mappedAcc = accFiles.map((file) => ({
      file,
      errors: [],
      id: getNewId(),
    }));
    const mappedRej = rejFiles.map((r) => {
      console.log(r, "rejected");
      return { ...r, id: getNewId() };
    });
    // if multiple is passed as a prop, only one file is allowed else multiple files are allowed to upload
    //  multiple ? setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej])
    //   : setFiles((curr) => [...mappedAcc, ...mappedRej]);

    setFiles((curr) => [...mappedAcc, ...mappedRej]);
  }, []);

  useEffect(() => {
    helpers.setValue(files);
    // helpers.setTouched(true);
  }, [files]);

  const onUpload = (file, url) => {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url };
        }
        return fw;
      })
    );
  };

  const onReject = (file) => {
    // This is written only so upload Error component does not re render when error is got from server
    console.log("onreject called");
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          fw.errors.push({
            type: "serverError",
            message: "This is an error from server",
          });
          console.log(fw, "aaaaa");
          return fw;
        }
        return fw;
      })
    );
  };

  const onDelete = (file) => {
    setFiles((curr) => curr.filter((fw) => fw.file !== file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple,
    accept: ["image/*", ".pdf"],
    maxSize: 5000 * 1024, // 5000KB
  });

  return (
    <>
      <Grid item>
        <div {...getRootProps()}>
          <Typography
            variant="subtitle3"
            sx={styles.dropzoneOuterTitle}
            required
          >
            {label}
            {required && <sup style={{ color: "red" }}>*</sup>}
          </Typography>
          <input {...getInputProps()} />

          <Stack
            sx={styles.dropzone}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle3" sx={styles.dropzoneInnerTitle}>
              {givenFile !== null &&
              givenFile !== undefined &&
              givenFile.errors.length === 0
                ? givenFile.file.path
                : label}
            </Typography>
            <Image
              src="/cloud-computing.svg"
              alt="cloud computing"
              width="20"
              height="20"
            />
          </Stack>
        </div>
      </Grid>
      {givenFile !== null && // when we get file from server only show header
        givenFile !== undefined &&
        givenFile.errors.length === 0 && (
          <FileHeader file={givenFile.file} onDelete={onDelete} />
        )}

      {files.map((fileWrapper) => (
        <Grid item key={fileWrapper.id}>
          {fileWrapper.errors.length &&
          fileWrapper.errors[0].type !== "serverError" ? (
            <UploadError
              file={fileWrapper.file}
              errors={fileWrapper.errors}
              onDelete={onDelete}
            />
          ) : (
            <SingleFileUploadWithProgress
              onDelete={onDelete}
              onUpload={onUpload}
              onReject={onReject}
              file={fileWrapper.file}
              fieldName={name}
            />
          )}
        </Grid>
      ))}
    </>
  );
};

FileUploadField.propTypes = {
  name: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  givenFile: PropTypes.shape({
    path: PropTypes.string,
    errors: PropTypes.arrayOf({}),
    file: PropTypes.shape({ path: PropTypes.string }),
  }).isRequired,
};

export default FileUploadField;
