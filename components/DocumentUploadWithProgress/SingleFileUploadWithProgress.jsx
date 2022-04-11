import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, LinearProgress, Typography } from "@mui/material";

import axios from "axios";
import Cookies from "js-cookie";
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
    // const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/document-upload`;
    const key = "docs_upload_example_us_preset";

    setServerError("");
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
    const credentials = Cookies.get("iPayT");
    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / total);
        onProgress(percent); // hook to set the value of current level that needs to be passed to the progressbar
      },
      headers: {
        Authorization: `Bearer ${credentials}`,
      },
    };

    console.log(fileToUpload, "fileToUpload");
    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("upload_preset", key);

    return axios
      .post(url, formData, config)
      .then((res) => {
        // return setServerError(true);
        console.log(res, "response");
        return res.data.response;
      })
      .catch((error) => {
        onReject(fileToUpload);
        if (error.response === undefined) {
          return setServerError("Something went wrong!");
        }
        if (error.response.data.response !== undefined) {
          return setServerError(error.response.data.response);
        }
        return setServerError("Something went wrong!");
      });
  };

  useEffect(() => {
    async function upload() {
      const returnedFileDetails = await uploadFile(file, setProgress, onReject);
      console.log("retunrded file", returnedFileDetails);
      if (returnedFileDetails !== undefined) {
        setDocumentUrl(returnedFileDetails.url);
      } else {
        setDocumentUrl("");
      }
      onUpload(file, returnedFileDetails);
    }

    upload();
  }, []);

  return (
    <Grid item>
      {/* <FileHeader file={file} onDelete={onDelete} progress={progress} /> */}
      {serverError === "" && documentUrl === "" && (
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
