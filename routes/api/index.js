module.exports = (router, db, passport) => {
  require("./updateUser")(router, db, passport);
  require("./deleteUser")(router, db, passport);

  require("./getDataset")(router, db, passport);
  require("./getAllDatasets")(router, db, passport);
  require("./addDataset")(router, db, passport);
  require("./updateDataset")(router, db, passport);
  require("./deleteDataset")(router, db, passport);

  return router;
};
