const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "Vous devez être connecté pour accéder à cette page" });

  try {
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(200).send({ message: "Invalid Token" });
  }
};
const checkAuth = (req) => {
  const token = req.header("x-access-token");
  if (token === "null") return "NOTOKEN";
  try {
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    return "OK";
  } catch (e) {
    return "EXPIRED";
  }
};

module.exports = {
  auth,
  checkAuth,
};
