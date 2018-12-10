module.exports = (router, passport, jwt, jwtConfig) => {
  router.post("/register", (req, res, next) => {
    passport.authenticate("register", (err, user, info) => {
      if (err) {
        return res.status(400).send({ err, info });
      }
      if (!user) {
        return res.status(404).send({ info });
      }
      req.logIn(user, { session: false }, function(err) {
        if (err) {
          return res.status(400).send({ err });
        }

        const token = jwt.sign(
          { id: user._id, email: user.email },
          jwtConfig.secret,
          { expiresIn: "3h" }
        );

        res.status(200).send({
          auth: true,
          token: token,
          message: "user registered & logged in",
        });
      });
    })(req, res, next);
  });
};
