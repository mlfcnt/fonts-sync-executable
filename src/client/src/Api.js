import ky from "ky";

const token = localStorage.getItem("token");

const secured = ky.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("x-access-token", token);
      },
    ],
  },
});

export const getLocalFonts = async () => secured.get("/font/local").json();
export const getOnlineFonts = async (userId) => {
  try {
    return ky
      .post("font/s3-list", {
        json: { userId },
      })
      .json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createUser = ({ username, email, password }) => {
  try {
    return ky
      .post("user/signup", {
        json: { username, email, password },
      })
      .json();
  } catch (error) {
    throw new Error(error.message);
  }
};
export const logUserIn = ({ username, password }) => {
  try {
    return ky
      .post("user/login", {
        json: { username, password },
      })
      .json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const checkAuth = async () => secured.get("user/checkAuth").json();

export const getUserInfo = async () => secured.get("user/me").json();

export const uploadFonts = async (fontPaths, fontNames, userId) => {
  try {
    return ky
      .post("font/s3-upload", {
        json: { fontPaths, fontNames, userId },
      })
      .json();
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
export const downloadFonts = async (userId, fontsNamesAndExtensions) => {
  try {
    return ky
      .post("font/s3-download", {
        json: { userId, fontsNamesAndExtensions },
      })
      .json();
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
