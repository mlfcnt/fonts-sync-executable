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

const filePath = path.join(__dirname, "./test.html");

const uploadFile = () => {
  fs.readFile(filePath, (err, data) => {
    if (err) throw err;
    const params = {
      Bucket: bucket, // pass your bucket name
      Key: "fonts/test.html", // file will be saved as testBucket/contacts.csv
      Body: JSON.stringify(data, null, 2),
    };
    s3.upload(params, function (s3Err, data) {
      if (s3Err) throw s3Err;
      console.log(`File uploaded successfully at ${data.Location}`);
      return "ok";
    });
  });
};

const downloadFile = () => {
  var s3Params = {
    Bucket: bucket,
    Key: "fonts/test.html",
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
