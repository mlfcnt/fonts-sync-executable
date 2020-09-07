const mongoose = require("mongoose");
require("dotenv").config();

console.log(process.env.MONGODB_URI);

const connectToDb = () => {
  return mongoose
    .connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Connecté à la BDD"))
    .catch((err) => console.error(err));
};

module.exports = {
  connectToDb,
};
