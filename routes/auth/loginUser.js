module.exports = (router, passport, jwt, jwtConfig) => {
  router.post("/login", (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!user && !info.authError) {
        // * missing credentials
        return res.status(400).send(info);
      }

      if (!user && info.authError === "email") {
        // * email does not exist on server database
        return res.status(404).send(info);
      }

      if (!user && info.authError === "password") {
        // * wrong password
        return res.status(401).send(info);
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
          message: "user found & logged in",
        });
      });
    })(req, res, next);
  });
};
