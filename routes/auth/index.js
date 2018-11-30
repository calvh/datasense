module.exports = (router, db, passport, jwt, jwtConfig) => {
  require("./loginUser")(router, passport, jwt, jwtConfig);
  require("./registerUser")(router, passport, jwt, jwtConfig);
  require("./updateUser")(router, db, passport);
  require("./deleteUser")(router, db, passport);

  return router;
};
