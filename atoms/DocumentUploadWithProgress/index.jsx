import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import PropTypes from "prop-types";

import { Grid, Stack, Typography } from "@mui/material";

import { useField, Field } from "formik";

import { useDropzone } from "react-dropzone";
import SingleFileUploadWithProgress from "./SingleFileUploadWithProgress";
import FileHeader from "./FileHeader";
import UploadError from "./UploadError";

import { styles } from "./styles";

let currentId = 0;

const getNewId = () => {
  // we could use a fancier solution instead of a sequential ID
  currentId += 1;
  return currentId;
};

const FileUploadField = ({ name, multiple, label, required, givenFile }) => {
  const [field, meta, helpers] = useField(name);

  const [files, setFiles] = useState([]);
  const [deleteAction, setDeleteAction] = useState(false);

  const onDrop = useCallback((accFiles, rejFiles) => {
    const mappedAcc = accFiles.map((file) => {
      return {
        file,
        errors: [],
        id: getNewId(),
      };
    });
    const mappedRej = rejFiles.map((r) => {
      return { ...r, id: getNewId() };
    });
    // if multiple is passed as a prop, only one file is allowed else multiple files are allowed to upload
    //  multiple ? setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej])
    //   : setFiles((curr) => [...mappedAcc, ...mappedRej]);

    setFiles((curr) => [...mappedAcc, ...mappedRej]);
  }, []);

  useEffect(() => {
    if (files.length > 0) {
      helpers.setValue(files);
    } else if (files.length === 0 && deleteAction === true) {
      helpers.setValue(files);
    }
  }, [files]);

  const onUpload = (file, returnedFileDetails) => {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file && returnedFileDetails !== undefined) {
          const truncatedFieldName = name.replace(/\[.*?\]/g, "");

          //  const indexOFDot = name.lastIndexOf(".");
          // if (indexOFDot !== undefined || indexOFDot !== null) {
          //   truncatedFieldName = name.substring(indexOFDot + 1);
          // }
          return {
            ...fw,
            url: returnedFileDetails.url,
            modifiedName: returnedFileDetails.modifiedName,
            fieldName: truncatedFieldName,
            referenceId: returnedFileDetails.referenceId,
          };
        }
        return fw;
      })
    );
  };

  const onReject = (file) => {
    // This is written only so upload Error component does not re render when error is got from server
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          fw.errors.push({
            type: "serverError",
            message: "This is an error from server",
          });
          return fw;
        }
        return fw;
      })
    );
  };

  const onDelete = (file) => {
    setFiles((curr) => curr.filter((fw) => fw.file !== file));
    setDeleteAction(true);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple,
    accept: [".pdf", ".jpeg", ".png", ".jpg"],
    maxSize: 5000 * 1024, // 5000KB
  });

  return (
    <Stack direction="column" sx={{ width: "100%" }}>
      <Field name={name}>
        {({ _, form, __ }) => {
          return (
            <div
              {...getRootProps()}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Typography
                variant="subtitle3"
                sx={styles.dropzoneOuterTitle}
                required
              >
                {label}
                {required && <sup style={{ color: "red" }}>*</sup>}
              </Typography>
              <input
                {...getInputProps()}
                onBlur={() => {
                  return meta.setFieldTouched(name);
                }}
              />
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
              {form.dirty && meta.error && typeof meta.error === "string" && (
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: (theme) => theme.colors.errorRed,
                    ml: 4,
                    mt: 1,
                  }}
                >
                  {meta.error}
                </Typography>
              )}
            </div>
          );
        }}
      </Field>
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
    </Stack>
  );
};

FileUploadField.defaultProps = {
  givenFile: null,
  required: false,
  multiple: false,
};

FileUploadField.propTypes = {
  name: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  givenFile: PropTypes.shape({
    path: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string),
    file: PropTypes.shape({ path: PropTypes.string }),
  }),
};

export default FileUploadField;