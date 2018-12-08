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
              const message = "Email already registered";
              console.log(message);
              return done(null, false, { message });
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
              const message = "Email does not exist";
              console.log(message);
              return done(null, false, { message });
            } else {
              bcrypt.compare(password, user.password).then(response => {
                if (!response) {
                  const message = "Wrong password";
                  console.log(message);
                  return done(null, false, { message });
                }
                console.log("User found & authenticated");
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
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            const message = `User ID: ${jwt_payload.id} found in database`;
            console.log(message);
            done(null, user);
          } else {
            const message = `User ID: ${jwt_payload.id} not found in database`;
            console.log(message);
            done(null, false, {message});
          }
        })
        .catch(err => done(err));
    })
  );
};
