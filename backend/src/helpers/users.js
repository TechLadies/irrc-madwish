const jwt = require("jsonwebtoken");
const passport = require("passport");

exports.getTokenMiddleware = (req, res, next) => {
  passport.authenticate("login", async (err, user) => {
    try {
      if (err || !user) {
        return res.status(401).send({ Message: "Forbidden" });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) {
          return res.status(401).send({ Message: "Forbidden" });
        }

        const body = { _id: user.UserID, username: user.Username };
        const token = jwt.sign({ user: body }, process.env.JWT_KEY, {
          expiresIn: "30 days",
        });
        res.locals.token = token;

        return next();
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
