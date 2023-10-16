import React, { useState } from "react";
import { S3 } from "aws-sdk";

const s3 = new S3({
  accessKeyId: "", // access key
  secretAccessKey: "", // secret access key
  region: "", // region
});

function S3FileUploader() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, isAPIExecuting] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFiles([...selectedFiles, ...e.target.files]);
  };

  const uploadFilesToS3 = async () => {
    isAPIExecuting(true);
    try {
      console.log(selectedFiles);
      for (const file of selectedFiles) {
        const filename = file.name;
        console.log(filename);
        const extension = filename.slice(
          //getting extension from filename
          ((filename.lastIndexOf(".") - 1) >>> 0) + 2
        );
        console.log(extension);
        console.log(filename);
        const { v4: uuidv4 } = require("uuid");
        const uuid = uuidv4();
        const params = {
          Bucket: "", //S3 buck name here
          Key: `uploads/${uuid + "." + extension}`,
          Body: file, // no need to convert to base64...file object is enough
        };
        console.log(params);
        await s3.upload(params).promise();
      }
      console.log("success");
      //API call to update metadata
      //once all the files have been uploaded make an api call and provide the metadata
    } catch (error) {
      console.log(error);
    } finally {
      setSelectedFiles([]);
      isAPIExecuting(false);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={uploadFilesToS3}>Upload</button>
      {uploading && <p>Uploading file...</p>}
    </div>
  );
}

export default S3FileUploader;

// This needs to be added in the CORS policy of the S3 bucket
// [
//   {
//     AllowedHeaders: ["*"],
//     AllowedMethods: ["GET", "PUT", "POST", "HEAD"],
//     AllowedOrigins: ["*"],
//     ExposeHeaders: ["ETag"],
//     MaxAgeSeconds: 3000,
//   },
// ];
