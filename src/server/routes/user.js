const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { auth } = require("../middleware/auth");

const User = require("../models/user");
const { checkAuth } = require("../middleware/auth");

router.post(
  "/signup",
  [
    check("username", "Veuillez entrer un nom d'utilisateur valide")
      .not()
      .isEmpty(),
    check("email", "Veuillez entrer un email valide").isEmail(),
    check(
      "password",
      "Veuillez entrer un mot de passe valide (6 char)"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        errorMessage: errors.array()[0].msg,
      });
    }

    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({
        email,
      });
      if (user) {
        return res.status(200).json({
          success: false,
          errorMessage: "Cet email est déjà utilisé",
        });
      }

      user = new User({
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            success: true,
            token,
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

router.post(
  "/login",
  [
    check("username", "Veuillez entrer un nom d'utilisateur valide")
      .not()
      .isEmpty(),
    check(
      "password",
      "Veuillez entrer un mot de passe valide (6 char)"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        errorMessage: errors.array()[0].msg,
      });
    }

    const { username, password } = req.body;
    try {
      let user = await User.findOne({
        username,
      });
      if (!user)
        return res.status(200).json({
          success: false,
          errorMessage: "Cet utilisateur n'existe pas",
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(200).json({
          success: false,
          errorMessage: "Mot de passe incorrect",
        });

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            success: true,
            token,
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

router.get("/checkAuth", async (req, res) => {
  try {
    const auth = checkAuth(req);
    return res.status(200).json({ auth });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
