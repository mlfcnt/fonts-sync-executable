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

export const getFonts = async () => secured.get("/font/local").json();

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

export const checkAuth = async () => {
  console.log("inside checkAuth");
  return secured.get("user/checkAuth").json();
};

export const getUserInfo = async () => secured.get("user/me").json();
