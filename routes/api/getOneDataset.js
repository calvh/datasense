module.exports = (router, db, passport) => {
    // Get Route on API Dataset
    router.get("/datasets/:id", (req, res, next) => {
      passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
          console.log(err);
        }
        if (info != undefined) {
          console.log(info.message);
          res.send(info.message);
        } else {
          db.User.findById(user.id)
            .populate("datasets")
            .then(user => {
              if (user != undefined) {
                res.json(user.datasets);
                console.log("List of all datasets for user returned");
              } else {
                console.log("User not found");
                res.status(404).json("User not found");
              }
            });
        }
      })(req, res, next);
    });
  };
  