const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const apiRouter = require("./routes/font");
const app = express();
const { startClient, startServer } = require("./services/processService");
const open = require("open");
const { connectToDb } = require("./db");
const user = require("./routes/user");

console.log("Lancement...");

// Connexion a la BDD
connectToDb();

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// mount our api router here
app.use("/font", apiRouter);
app.use("/user", user);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

startServer();
console.log("Server lancé sur le port 4000");
console.log("-----------------------------------");
startClient();
console.log("Client lancé sur le port 3000");
console.log("-----------------------------------");
open("http://localhost:4000");
console.log("Ouverture du navigateur par défaut");
console.log("-----------------------------------");

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  console.log("req.path", req.path);
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = app;
