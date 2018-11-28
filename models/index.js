module.exports = db => {
  return {
    User: require("./User")(db),
    Dataset: require("./Dataset")(db),
  };
};
