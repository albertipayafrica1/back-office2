import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, LinearProgress, Typography } from "@mui/material";

import axios from "axios";
import UploadError from "./UploadError";

const SingleFileUploadWithProgress = ({
  file,
  onDelete,
  onUpload,
  onReject,
}) => {
  const [progress, setProgress] = useState(0);
  const [serverError, setServerError] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");

  const uploadFile = async (fileToUpload, onProgress) => {
    const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
    const key = "docs_upload_example_us_preset";

    setServerError(false);
    setDocumentUrl("");

    // return new Promise((res, rej) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.open("POST", url);

    //   xhr.onload = () => {
    //     const resp = JSON.parse(xhr.responseText);
    //     res(resp.secure_url);
    //   };
    //   xhr.onerror = (evt) => rej(evt);
    //   xhr.upload.onprogress = (event) => {
    //     if (event.lengthComputable) {
    //       const percentage = (event.loaded / event.total) * 100;
    //       onProgress(Math.round(percentage));
    //     }
    //   };

    //   const formData = new FormData();
    //   formData.append("file", file);
    //   formData.append("upload_preset", key);

    //   xhr.send(formData);
    // });

    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / total);
        onProgress(percent); // hook to set the value of current level that needs to be passed to the progressbar
      },
      // headers: {
      //   // custom headers goes here
      // },
    };

    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("upload_preset", key);

    return axios
      .post(url, formData, config)
      .then((res) => {
        // return setServerError(true);
        return res.data.secure_url;
      })
      .catch((error) => {
        onReject(fileToUpload);
        return setServerError("This is a very good error");
      });
  };

  useEffect(() => {
    async function upload() {
      const url = await uploadFile(file, setProgress, onReject);
      setDocumentUrl(url);
      onUpload(file, url);
    }

    upload();
  }, []);

  return (
    <Grid item>
      {/* <FileHeader file={file} onDelete={onDelete} progress={progress} /> */}
      {serverError !== "" && documentUrl === "" && (
        <>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ backgroundColor: (theme) => theme.colors.orange }}
          />
          <Typography variant="subtitle4">{progress} %</Typography>
        </>
      )}
      {serverError && (
        <UploadError
          file={file}
          errors={[{ message: serverError }]}
          onDelete={onDelete}
        />
      )}
    </Grid>
  );
};

SingleFileUploadWithProgress.propTypes = {
  file: PropTypes.shape({}).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

export default SingleFileUploadWithProgress;
