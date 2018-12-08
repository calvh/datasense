module.exports = (router, db, passport) => {
  const Dataset = db.Dataset;

  router.get("/datasets/:id", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        return res.status(400).send({ err, info });
      }
      if (!user) {
        return res.status(404).send({ info });
      }
      Dataset.findById(req.params.id)
        .then(dbDataset => res.json(dbDataset))
        .catch(err => res.status(500).send(err));
    })(req, res, next);
  });
};
