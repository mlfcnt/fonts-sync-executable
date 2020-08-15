const express = require("express");
const router = express.Router();
const getSystemFonts = require("get-system-fonts");

/* GET users listing. */
router.get("/fonts", async function (req, res, next) {
  console.log("Récupération des polices...");
  const fonts = await getSystemFonts();
  console.log(`${fonts.length} polices trouvées :D`);
  console.log("-----------------------------------");
  res.send({ fonts });
});

module.exports = router;
