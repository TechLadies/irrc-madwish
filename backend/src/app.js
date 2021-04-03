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
app.use("/api/students", studentsRouter);
app.use("/api/teachers", teachersRouter);
app.use("/api/nativeLanguages", nativeLanguagesRouter);
app.use("/api/statuses", statusesRouter);
app.use("/api/statusUpdates", statusUpdatesRouter);
app.use("/api/matches", matchesRouter);
app.use("/api/screening", screeningRouter);
app.use("/api/matching", matchingRouter);
app.use("/api/reasons", reasonsRouter);
app.use("/api/users", usersRouter);

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

module.exports = app;
