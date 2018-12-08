module.exports = (router, db, passport) => {
  const User = db.User;

  router.get("/datasets", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        return res.status(400).send({ err, info });
      }
      if (!user) {
        return res.status(404).send({ info });
      }
      User.findById(user._id)
        .populate("datasets")
        .then(dbUser => res.json(dbUser.datasets))
        .catch(err => res.status(500).send(err));
    })(req, res, next);
  });
};
