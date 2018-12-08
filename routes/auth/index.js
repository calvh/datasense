module.exports = (router, passport, jwt, jwtConfig) => {
  require("./loginUser")(router, passport, jwt, jwtConfig);
  require("./registerUser")(router, passport, jwt, jwtConfig);

  return router;
};
