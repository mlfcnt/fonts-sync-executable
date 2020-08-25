const fs = require("fs");
const AWS = require("aws-sdk");
const join = require("path").join;
const s3Zip = require("s3-zip");
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

const bucket = "fonts-sync";

const uploadFile = (fontPath, fontName, userId) => {
  const fileContent = fs.readFileSync(fontPath);
  const params = {
    Bucket: bucket,
    Key: `${userId}/${fontName}`, // File name you want to save as in S3
    Body: fileContent,
  };
  const results = s3.upload(params, function (s3Err, data) {});
  return !results.failed;
};

const uploadFiles = (fontPaths, fontNames, userId) => {
  let results = [];
  for (let i = 0; i < fontPaths.length; i++) {
    const res = uploadFile(fontPaths[i], fontNames[i], userId);
    results.push(res);
  }
  return results;
};

const downloadFiles = (userId, fontsNamesAndExtensions) => {
  const output = fs.createWriteStream(join(__dirname, `font-pack.zip`));

  s3Zip.archive({ s3, bucket }, userId, fontsNamesAndExtensions).pipe(output);
  return {
    success: true,
  };
};

const deleteFontsZip = (timeout = 1) => {
  setTimeout(() => {
    fs.unlink(`./font-pack.zip`, (err) => {
      console.log("suppression du zip...");
      if (err) {
        console.error(err);
        return;
      }
    });
  }, timeout * 60 * 1000);
};

const listFonts = async (userId) => {
  var params = {
    Bucket: bucket,
    MaxKeys: 1000,
    Delimiter: "/",
    Prefix: `${userId}/`,
  };
  const objects = await s3.listObjectsV2(params).promise();
  return objects.Contents.map((c) => c.Key);
};

module.exports = {
  uploadFiles,
  downloadFiles,
  listFonts,
};
