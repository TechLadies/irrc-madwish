const express = require("express");
const router = express.Router();

const db = require("../models/user");
const helpers = require("../helpers/users");

if (process.env.ENABLE_SIGNUP === "true") {
  router.post("/signup", async (req, res) => {
    try {
      const { Username, Password } = req.body;
      await db.User.query().insert({ Username, Password });
      return res.status(200).send({ Username });
    } catch (e) {
      return res.status(500).send({ Message: "Something went wrong" });
    }
  });
}

router.post("/login", helpers.getTokenMiddleware, (_, res) => {
  try {
    return res.send({ token: res.locals.token });
  } catch (e) {
    return res.status(500).send({ Message: "Something went wrong" });
  }
});

module.exports = router;
