module.exports = (router, db, passport) => {
  const User = db.User;
  router.delete("/users/:id/", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        return res.status(400).send({ error: err });
      }
      if (!user) {
        return res.status(422).send({ error: info.message });
      }

      User.findByIdAndDelete(user._id)
        .then(() =>
          res.status(200).send({ message: "User successfully deleted" })
        )
        .catch(err => res.status(500).send(err));
    })(req, res, next);
  });
};
