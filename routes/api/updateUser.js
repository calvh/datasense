module.exports = (router, db, passport) => {
  const User = db.User;

  router.delete("/users/:id", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        return res.status(400).send({ err, info });
      }
      if (!user) {
        return res.status(404).send({ info });
      }

      User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(500).send(err));
    })(req, res, next);
  });
};
