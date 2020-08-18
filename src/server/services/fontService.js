const fs = require("fs");
const path = require("path");
const os = require("os");

// const formatFonts = (fonts) => {
//   return fonts.map((f) => {
//     return {
//       name: path.parse(f).name,
//       path: f,
//       system: process.platform,
//       birthtime: fs.statSync(f).birthtime,
//       extension: path.extname(f),
//     };
//   });
// };
const formatFonts = (fonts) => {
  return fonts.map((f) => {
    return {
      ...f,
      system: process.platform,
      birthtime: fs.statSync(f.path).birthtime,
      extension: path.extname(f.path),
    };
  });
};

const getHostname = () => os.hostname();

module.exports = {
  formatFonts,
  getHostname,
};
