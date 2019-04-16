module.exports = (router, passport, jwt, jwtConfig) => {
  router.post("/register", (req, res, next) => {
    passport.authenticate("register", (err, user, info) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!user && !info.authError && !info.validateError) {
        // * missing credentials
        return res.status(400).send(info);
      }

      if (!user && info.authError) {
        // * duplicate email
        return res.status(409).send(info);
      }

      if (!user && info.validateError) {
        // * bad email or password format, details in validateError object
        return res.status(400).send(info);
      }

      req.logIn(user, { session: false }, err => {
        if (err) {
          return res.status(500).send(err);
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
