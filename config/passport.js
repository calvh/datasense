module.exports = (
  jwtConfig,
  bcrypt,
  passport,
  localStrategy,
  passportJWT,
  db
) => {
  const BCRYPT_SALT_ROUNDS = 12;
  const JWTstrategy = passportJWT.Strategy;
  const ExtractJWT = passportJWT.ExtractJwt;
  const User = db.User;

  passport.use(
    "register",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: false,
      },
      (email, password, done) => {
        User.findOne({ email })
          .then(user => {
            if (user) {
              console.log("email already taken");
              return done(null, false, {
                message: "email already taken",
              });
            } else {
              bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                User.create({
                  email,
                  password: hashedPassword,
                }).then(user => {
                  console.log("user created");
                  return done(null, user);
                });
              });
            }
          })
          .catch(err => done(err));
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: false,
      },
      (email, password, done) => {
        User.findOne({ email })
          .then(user => {
            if (!user) {
              return done(null, false, { message: "bad email" });
            } else {
              bcrypt.compare(password, user.password).then(response => {
                if (!response) {
                  console.log("passwords do not match");
                  return done(null, false, {
                    message: "passwords do not match",
                  });
                }
                console.log("user found & authenticated");
                return done(null, user);
              });
            }
          })
          .catch(err => done(err));
      }
    )
  );

  const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: jwtConfig.secret,
  };

  passport.use(
    "jwt",
    new JWTstrategy(opts, (jwt_payload, done) => {
      User.findById({ id: jwt_payload.id })
        .then(user => {
          if (user) {
            console.log("user found in db in passport");
            done(null, user);
          } else {
            console.log("user not found in db");
            done(null, false);
          }
        })
        .catch(err => done(err));
    })
  );
};
