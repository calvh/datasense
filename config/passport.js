module.exports = (
  db,
  jwtConfig,
  bcrypt,
  passport,
  localStrategy,
  passportJWT,
  validate,
  constraints
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
              return done(null, false, { authError: "email" });
            }

            const validateError = validate({ email, password }, constraints);

            if (validateError) {
              return done(null, false, { validateError });
            }

            bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
              User.create({
                email,
                password: hashedPassword,
              }).then(user => {
                return done(null, user);
              });
            });
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
              return done(null, false, { authError: "email" });
            }

            bcrypt.compare(password, user.password).then(response => {
              if (!response) {
                return done(null, false, { authError: "password" });
              }
              return done(null, user);
            });
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
      //If the token has expiration, raise unauthorized
      const expirationDate = new Date(jwt_payload.exp * 1000);
      if (expirationDate < new Date()) {
        const message = "Expired token";
        console.log(message);
        return done(null, false, { message });
      }

      User.findById(jwt_payload.id)
        .then(user => {
          if (!user) {
            let message = `User ID: ${jwt_payload.id} not found in database`;
            console.log(message);
            message = "User not found in database";
            return done(null, false, { message });
          }
          if (jwt_payload.email !== user.email) {
            let message = `Token email (${
              jwt_payload.email
            }) does not match database email (${user.email})`;
            console.log(message);
            message = "Email does not match";
            return done(null, false, { message });
          }
          console.log("Token valid and user found in database.");
          return done(null, user);
        })
        .catch(err => done(err));
    })
  );
};
