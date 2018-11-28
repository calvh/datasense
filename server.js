const express = require("express");
const app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// -----------------------------  MIDDLEWARE  -----------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("cookie-parser")());
app.use(require("morgan")("dev"));
app.use(require("compression")());
app.use(require("helmet")());

// -------------------------------  MONGODB  ------------------------------
const mongoose = require("mongoose");
const dbName = "datasense";
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost/${dbName}`;
const db = require("./models")(mongoose);

// ------------------------------  PASSPORT  ------------------------------
const passport = require("passport");
require("./config/passport");
app.use(passport.initialize());

// -------------------------------  ROUTER  -------------------------------
// --------- define routes --------
const apiRouter = require("./routes/api")(express.Router(), db);
const authRouter = require("./routes/auth")(express.Router(), db);

// ------- mount sub-routers ------
const router = express.Router();
router.use("/api", apiRouter);
router.use("/auth", authRouter);

// If no API/Auth routes are hit (every other request), send the React app
// Define any API/Auth routes before this runs
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use(router);

// ----------------------------  START SERVER  ----------------------------
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
