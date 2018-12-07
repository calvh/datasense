module.exports = (router, db, passport) => {
  require("./addDataset")(router, db, passport);
  require("./deleteDataset")(router, db, passport);
  require("./getAllDatasets")(router, db, passport);
  require("./updateDataset")(router, db, passport);

  return router;
};
