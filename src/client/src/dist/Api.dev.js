"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadFonts = exports.uploadFonts = exports.getUserInfo = exports.checkAuth = exports.logUserIn = exports.createUser = exports.getOnlineFonts = exports.getLocalFonts = void 0;

var _ky = _interopRequireDefault(require("ky"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var token = localStorage.getItem("token");

var secured = _ky["default"].extend({
  hooks: {
    beforeRequest: [function (request) {
      request.headers.set("x-access-token", token);
    }]
  }
});

var getLocalFonts = function getLocalFonts() {
  return regeneratorRuntime.async(function getLocalFonts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", secured.get("/font/local").json());

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getLocalFonts = getLocalFonts;

var getOnlineFonts = function getOnlineFonts(userId) {
  return regeneratorRuntime.async(function getOnlineFonts$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          return _context2.abrupt("return", _ky["default"].post("font/s3-list", {
            json: {
              userId: userId
            }
          }).json());

        case 4:
          _context2.prev = 4;
          _context2.t0 = _context2["catch"](0);
          throw new Error(_context2.t0.message);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 4]]);
};

exports.getOnlineFonts = getOnlineFonts;

var createUser = function createUser(_ref) {
  var username = _ref.username,
      email = _ref.email,
      password = _ref.password;

  try {
    return _ky["default"].post("user/signup", {
      json: {
        username: username,
        email: email,
        password: password
      }
    }).json();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.createUser = createUser;

var logUserIn = function logUserIn(_ref2) {
  var username = _ref2.username,
      password = _ref2.password;

  try {
    return _ky["default"].post("user/login", {
      json: {
        username: username,
        password: password
      }
    }).json();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.logUserIn = logUserIn;

var checkAuth = function checkAuth() {
  return regeneratorRuntime.async(function checkAuth$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", secured.get("user/checkAuth").json());

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.checkAuth = checkAuth;

var getUserInfo = function getUserInfo() {
  return regeneratorRuntime.async(function getUserInfo$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", secured.get("user/me").json());

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.getUserInfo = getUserInfo;

var uploadFonts = function uploadFonts(fontPaths, fontNames, userId) {
  return regeneratorRuntime.async(function uploadFonts$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          return _context5.abrupt("return", _ky["default"].post("font/s3-upload", {
            json: {
              fontPaths: fontPaths,
              fontNames: fontNames,
              userId: userId
            }
          }).json());

        case 4:
          _context5.prev = 4;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          throw new Error(_context5.t0.message);

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 4]]);
};

exports.uploadFonts = uploadFonts;

var downloadFonts = function downloadFonts(userId, fontsNamesAndExtensions) {
  return regeneratorRuntime.async(function downloadFonts$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          return _context6.abrupt("return", _ky["default"].post("font/s3-download", {
            json: {
              userId: userId,
              fontsNamesAndExtensions: fontsNamesAndExtensions
            }
          }).json());

        case 4:
          _context6.prev = 4;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          throw new Error(_context6.t0.message);

        case 8:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 4]]);
};

exports.downloadFonts = downloadFonts;