module.exports = (router, db, passport) => {
  const User = db.User;
  router.put("/users/:id/", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        return res.status(400).send({ error: err });
      }
      if (!user) {
        return res.status(422).send({ error: info.message });
      }

      User.findByIdAndUpdate(user._id, {
        email: req.body.email,
      })
        .then(user => res.json(user))
        .catch(err => res.status(500).send(err));
    })(req, res, next);
  });
};
