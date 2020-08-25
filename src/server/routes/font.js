const express = require("express");
const router = express.Router();
const { formatFonts, getHostname } = require("../services/fontService");
const fontManager = require("font-manager");
const { uploadFiles, listFonts, downloadFiles } = require("../services/s3");
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
router.post("/s3-upload", async function (req, res, next) {
  const { userId, fontNames, fontPaths } = req.body;
  try {
    const success = uploadFiles(fontPaths, fontNames, userId);
    let errorMessage;
    if (success === false)
      errorMessage = "Erreur lors du téléversement des polices";
    res.send({ success, errorMessage });
  } catch (error) {
    console.log(error);
  }
});

/* download file from S3. */
router.post("/s3-download", function (req, res, next) {
  const { userId, fontsNamesAndExtensions } = req.body;
  try {
    const { success } = downloadFiles(userId, fontsNamesAndExtensions);
    res.send({
      success: true,
      url: `${__dirname}/font-pack.zip`,
    });
  } catch (error) {
    console.log("sdmfsdkmlsdkmlsdkfmsdlfk", error);
  }
});

/* list objects from S3. */
router.post("/s3-list", async function (req, res, next) {
  try {
    const keys = await listFonts(req.body.userId);
    res.send({ success: true, keys });
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = router;
