"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columns = exports.generateData = void 0;

var generateData = function generateData(fonts) {
  var namesAndExtension = fonts.map(function (f) {
    return f.split["/"][1];
  });
  var formatted = namesAndExtension.map(function (f) {
    return {
      name: f.split(".")[0],
      extension: f.split(".")[1]
    };
  });
  return formatted.sort(function (a, b) {
    return a.localeCompare(b);
  }).map(function (_ref) {
    var name = _ref.name,
        extension = _ref.extension;
    return [name, extension];
  });
};

exports.generateData = generateData;
var columns = [{
  name: "Nom",
  options: {
    filter: false,
    sort: true
  }
}, {
  name: "Extension",
  options: {
    filter: true,
    sort: true
  }
}];
exports.columns = columns;