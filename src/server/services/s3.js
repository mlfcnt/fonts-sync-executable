const fs = require("fs");
const AWS = require("aws-sdk");
const path = require("path");
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

const bucket = "fonts-sync";

const uploadFile = (fontPath, fontName, userId) => {
  console.log(fontPath);
  const fileContent = fs.readFileSync(fontPath);
  const params = {
    Bucket: bucket,
    Key: `${userId}/${fontName}`, // File name you want to save as in S3
    Body: fileContent,
  };
  s3.upload(params, function (s3Err, data) {
    if (s3Err) throw s3Err;
    console.log(`File uploaded successfully at ${data.Location}`);
    return "ok";
  });
};

const downloadFile = () => {
  var s3Params = {
    Bucket: `${bucket}/3250573c-8d5d-497b-ae83-20a47d793ffa`,
    Key: "DejaVuSans.ttf",
  };
  s3.getObject(s3Params, function (err, data) {
    if (err === null) {
      // fs.writeFileSync("./downloaded.js", data.Body.toString());
      var url = s3.getSignedUrl("getObject", s3Params);
      console.log({ url });
    } else {
      console.log({ err });
    }
  });
};

const listObjects = async () => {
  var params = {
    Bucket: bucket,
    MaxKeys: 1000,
    Delimiter: "/",
    Prefix: "fonts/",
  };
  const objects = await s3.listObjectsV2(params).promise();
  const keys = objects.Contents.map((c) => c.Key);
  keys.shift();
  return keys;
  // await s3.listObjectsV2(params, function (err, data) {
  //   console.log("couocu", data.Contents.map((c) => c.Key).shift());
  //   if (err) console.log(err, err.stack);
  //   else return "ok";
  // });
};

module.exports = {
  uploadFile,
  downloadFile,
  listObjects,
};
