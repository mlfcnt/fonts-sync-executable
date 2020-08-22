const express = require("express");
const router = express.Router();
const { formatFonts, getHostname } = require("../services/fontService");
const fontManager = require("font-manager");
const { uploadFile, downloadFile, listObjects } = require("../services/s3");
const { auth } = require("../middleware/auth");

/* GET local fonts. */
router.get("/local", auth, async function (req, res, next) {
  console.log("Récupération des polices...");
  fontManager.getAvailableFonts((fontsRaw) => {
    console.log(`${fontsRaw.length} polices trouvées :D`);
    console.log("-----------------------------------");
    const fonts = formatFonts(fontsRaw);
    const hostname = getHostname();
    res.send({ fonts, hostname });
  });
});

/* upload file to S3. */
router.get("/s3-upload", async function (req, res, next) {
  try {
    const test = uploadFile();
    res.send({ ok: "ok" });
  } catch (error) {
    console.log("error");
  }
});

/* download file from S3. */
router.get("/s3-download", async function (req, res, next) {
  try {
    const test = downloadFile();
  } catch (error) {
    console.log("error");
  }
});

/* list objects from S3. */
router.get("/s3-list", async function (req, res, next) {
  try {
    const keys = await listObjects();
    res.send({ keys });
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = router;
