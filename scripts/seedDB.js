const mongoose = require("mongoose");
const db = require("../models");
const dbName = "datasense";


mongoose.connect(
    process.env.MONGODB_URI ||
    `mongodb://localhost/${dbName}`
  );

  const seed = [
    //   TODO add seed values
  ];

//   TODO add db seed commands