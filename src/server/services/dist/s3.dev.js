"use strict";

var fs = require("fs");

var AWS = require("aws-sdk");

var join = require("path").join;

var s3Zip = require("s3-zip");

require("dotenv").config();

var s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4"
});
var bucket = "fonts-sync";

var uploadFile = function uploadFile(fontPath, fontName, userId) {
  var fileContent = fs.readFileSync(fontPath);
  var params = {
    Bucket: bucket,
    Key: "".concat(userId, "/").concat(fontName),
    // File name you want to save as in S3
    Body: fileContent
  };
  var results = s3.upload(params, function (s3Err, data) {});
  return !results.failed;
};

var uploadFiles = function uploadFiles(fontPaths, fontNames, userId) {
  var results = [];

  for (var i = 0; i < fontPaths.length; i++) {
    var res = uploadFile(fontPaths[i], fontNames[i], userId);
    results.push(res);
  }

  return results;
};

var downloadFiles = function downloadFiles(userId, fontsNamesAndExtensions) {
  console.log("__dirname", __dirname);
  var output = fs.createWriteStream(join(__dirname, "font-pack.zip"));
  s3Zip.archive({
    s3: s3,
    bucket: bucket
  }, userId, fontsNamesAndExtensions).pipe(output);
  return {
    success: true,
    url: "font-pack-".concat(userId, ".zip")
  };
};

var deleteFontsZip = function deleteFontsZip() {
  var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  setTimeout(function () {
    fs.unlink("./font-pack.zip", function (err) {
      console.log("suppression du zip...");

      if (err) {
        console.error(err);
        return;
      }
    });
  }, timeout * 60 * 1000);
};

var listFonts = function listFonts(userId) {
  var params, objects;
  return regeneratorRuntime.async(function listFonts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          params = {
            Bucket: bucket,
            MaxKeys: 1000,
            Delimiter: "/",
            Prefix: "".concat(userId, "/")
          };
          _context.next = 3;
          return regeneratorRuntime.awrap(s3.listObjectsV2(params).promise());

        case 3:
          objects = _context.sent;
          return _context.abrupt("return", objects.Contents.map(function (c) {
            return c.Key;
          }));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  uploadFiles: uploadFiles,
  downloadFiles: downloadFiles,
  listFonts: listFonts
};