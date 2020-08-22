const express = require("express");
const router = express.Router();
const { formatFonts, getHostname } = require("../services/fontService");
const fontManager = require("font-manager");
const { uploadFile, downloadFile, listObjects } = require("../services/s3");
const { auth } = require("../middleware/auth");
const { CloudWatchLogs } = require("aws-sdk");

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
router.post("/s3-upload", async function (req, res, next) {
  const { userId, fontNames, fontPaths } = req.body;
  console.log(fontPaths[0], fontNames[0], userId);
  try {
    const test = uploadFile(fontPaths[0], fontNames[0], userId);
    res.send({ ok: "ok" });
  } catch (error) {
    console.log(error);
  }
});

/* download file from S3. */
router.get("/s3-download", async function (req, res, next) {
  try {
    const test = await downloadFile();
    res.send({ ok: "ok" });
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
