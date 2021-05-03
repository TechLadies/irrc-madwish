require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const passport = require("passport");

const studentsRouter = require("./routes/students");
const teachersRouter = require("./routes/teachers");
const nativeLanguagesRouter = require("./routes/nativeLanguages");
const statusesRouter = require("./routes/statuses");
const statusUpdatesRouter = require("./routes/statusUpdates");
const matchesRouter = require("./routes/matches");
const screeningRouter = require("./routes/screening");
const matchingRouter = require("./routes/matching");
const reasonsRouter = require("./routes/reasons");
const usersRouter = require("./routes/users");

require("./auth/auth");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, "../public")));

// Backend routes
function auth() {
  if (process.env.ENABLE_AUTH === "true") {
    return passport.authenticate("jwt", { session: false });
  }
}

const routesConfig = [
  ["/api/students", auth(), studentsRouter],
  ["/api/teachers", auth(), teachersRouter],
  ["/api/nativeLanguages", auth(), nativeLanguagesRouter],
  ["/api/statuses", auth(), statusesRouter],
  ["/api/statusUpdates", auth(), statusUpdatesRouter],
  ["/api/matches", auth(), matchesRouter],
  ["/api/screening", auth(), screeningRouter],
  ["/api/matching", auth(), matchingRouter],
  ["/api/reasons", auth(), reasonsRouter],
  ["/api/users", usersRouter],
];

routesConfig.forEach((routeConfig) => {
  app.use(...routeConfig.filter(Boolean));
});

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

module.exports = app;
