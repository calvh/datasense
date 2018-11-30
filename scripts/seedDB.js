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

const x = [
  [-1, -1, -1],
  [1, -1, -1],
  [-1, 1, -1],
  [1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [-1, 1, 1],
  [1, 1, 1],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const y = [
  [3.2],
  [5.7],
  [3.8],
  [5.9],
  [3],
  [5.4],
  [3.3],
  [5.5],
  [4.3],
  [4.5],
  [4.4],
];