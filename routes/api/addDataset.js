module.exports = (router, db, passport) => {
  const User = db.User;
  const Dataset = db.Dataset;

  router.post("/datasets", (req, res, next) => {
    passport.authenticate(
      "jwt",
      {
        session: false,
      },
      (err, user, info) => {
        if (err) {
          return res.status(400).send({ err, info });
        }
        if (!user) {
          return res.status(404).send({ info });
        }

        Dataset.create(req.body)
          .then(dbDataset => {
            return User.updateOne(
              { _id: user._id },
              {
                $push: {
                  datasets: dbDataset._id,
                },
              }
            );
          })
          .then(dbUser => res.json(dbUser))
          .catch(err => res.status(500).send(err));
      }
    )(req, res, next);
  });
};
