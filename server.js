const express = require("express");
const app = express();

// -----------------------------  MIDDLEWARE  -----------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("cookie-parser")());
if (process.env.NODE_ENV !== "production"){
  app.use(require("morgan")("dev"));
}
app.use(require("helmet")());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// -------------------------------  MONGODB  ------------------------------
const mongoose = require("mongoose");
const dbName = "datasense";
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost/${dbName}`;
const db = require("./models")(mongoose);
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ------------------------------  PASSPORT  ------------------------------
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const jwtConfig = require("./config/jwtConfig");
const jwt = require("jsonwebtoken");
const passportJWT = require("passport-jwt");
const bcrypt = require("bcrypt");
const validate = require("validate.js");
const validationConstraints = require("./config/validationConstraints");

// * apply passport settings
require("./config/passport")(
  db,
  jwtConfig,
  bcrypt,
  passport,
  localStrategy,
  passportJWT,
  validate,
  validationConstraints
);

app.use(passport.initialize());

// -------------------------------  ROUTER  -------------------------------
// --------- define sub-routers --------
const apiRouter = require("./routes/api")(express.Router(), db, passport);
const authRouter = require("./routes/auth")(
  express.Router(),
  passport,
  jwt,
  jwtConfig
);

// ------- mount sub-routers ------
app.use("/api", apiRouter);
app.use("/auth", authRouter);

// If no API/Auth routes are hit (every other request), send the React app
// Define any API/Auth routes before this runs
const path = require("path");
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// ----------------------------  START SERVER  ----------------------------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🌎 ==> API Server started on port ${PORT}!`);
});
