module.exports = (router, db, passport) => {
  // Route to add new dataset
  router.post("/datasets/", (req, res, next) => {
    passport.authenticate(
      "jwt",
      {
        session: false,
      },
      (err, user, info) => {
        if (err) {
          console.log(err);
        }
        if (info != undefined) {
          console.log(info.message);
          res.send(info.message);
        } else {
          db.User.findById(user.id).then(user => {
            if (user != undefined) {
              db.Dataset.create(req.body)
                .then(function(dbDataSet) {
                  return db.User.findOneAndUpdate(
                    {
                      _id: user.id,
                    },
                    {
                      $push: {
                        datasets: dbDataSet._id,
                      },
                    }
                  );
                })
                .then(function(dbUser) {
                  // If we were able to successfully update the User send it back to the client
                  res.json(dbUser);
                })
                .catch(function(err) {
                  // If an error occurred, send it to the client
                  res.json(err);
                });
            } else {
              console.log("User not found");
              res.status(404).json("User not found");
            }
          });
        }
      }
    )(req, res, next);
  });
};
