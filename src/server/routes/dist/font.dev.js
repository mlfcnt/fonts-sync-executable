"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../services/fontService"),
    formatFonts = _require.formatFonts,
    getHostname = _require.getHostname;

var fontManager = require("font-manager");

var _require2 = require("../services/s3"),
    uploadFiles = _require2.uploadFiles,
    listFonts = _require2.listFonts,
    downloadFiles = _require2.downloadFiles;

var _require3 = require("../middleware/auth"),
    auth = _require3.auth;
/* GET local fonts. */


router.get("/local", auth, function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("Récupération des polices...");
          fontManager.getAvailableFonts(function (fontsRaw) {
            console.log("".concat(fontsRaw.length, " polices trouv\xE9es :D"));
            console.log("-----------------------------------");
            var fonts = formatFonts(fontsRaw);
            var hostname = getHostname();
            res.send({
              fonts: fonts,
              hostname: hostname
            });
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
/* upload file to S3. */

router.post("/s3-upload", function _callee2(req, res, next) {
  var _req$body, userId, fontNames, fontPaths, success, errorMessage;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, userId = _req$body.userId, fontNames = _req$body.fontNames, fontPaths = _req$body.fontPaths;

          try {
            success = uploadFiles(fontPaths, fontNames, userId);
            if (success === false) errorMessage = "Erreur lors du téléversement des polices";
            res.send({
              success: success,
              errorMessage: errorMessage
            });
          } catch (error) {
            console.log(error);
          }

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
});
/* download file from S3. */

router.post("/s3-download", function (req, res, next) {
  console.log("inside route");
  var _req$body2 = req.body,
      userId = _req$body2.userId,
      fontsNamesAndExtensions = _req$body2.fontsNamesAndExtensions;

  try {
    var _downloadFiles = downloadFiles(userId, fontsNamesAndExtensions),
        success = _downloadFiles.success,
        url = _downloadFiles.url;

    res.send({
      success: true,
      url: "".concat(__dirname, "/").concat(url)
    });
  } catch (error) {
    console.log("sdmfsdkmlsdkmlsdkfmsdlfk", error);
  }
});
/* list objects from S3. */

router.post("/s3-list", function _callee3(req, res, next) {
  var keys;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(listFonts(req.body.userId));

        case 3:
          keys = _context3.sent;
          res.send({
            success: true,
            keys: keys
          });
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log("error", _context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;