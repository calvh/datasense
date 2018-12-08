module.exports = (router, db, passport) => {
  const User = db.User;
  const Dataset = db.Dataset;

  router.delete("/datasets/:id", (req, res, next) => {
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

        const datasetId = req.params.id;

        return Promise.all([
          Dataset.findByIdAndDelete(datasetId),
          User.findByIdAndUpdate(user._id, {
            $pull: { datasets: datasetId },
          }),
        ])
          .then(([dbDataset, dbUser]) => res.json(dbDataset))
          .catch(err => res.status(500).send(err));
      }
    )(req, res, next);
  });
};
