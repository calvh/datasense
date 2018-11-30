const db = require("../../models");
const passport = require("passport");

module.exports = app => {
    // Get Route on API Dataset
    app.delete('/api/dataset/:id', (req, res, next) => {
        passport.authenticate('jwt', {
            session: false
        }, (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info != undefined) {
                console.log(info.message);
                res.send(info.message);
            } else {
                db.User.findById(user.id).then(user => {
                    if (user != undefined) {

                        db.Dataset.findById({
                                _id: req.params.id
                            }).then(dbDataset => dbDataset.remove())
                            .then(dbDataset => res.json(dbDataset))
                            .catch(err => res.status(422).json(err));
                    } else {
                        console.log('User not found');
                        res.status(404).json('User not found');
                    }
                });
            }
        })(req, res, next);
    });
};