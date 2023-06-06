const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// Configure the JWT options
const jwtOptions = {
  secretOrKey: 'your-secret-key', // Replace with your own secret key
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// Create the JWT strategy
const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    // Find the user based on the payload's user id
    const user = await User.findById(payload.id);

    // If user is found, return the user object
    if (user) {
      return done(null, user);
    }

    // If user is not found, return false
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

// Use the JWT strategy with Passport
passport.use(jwtStrategy);

// Middleware for authenticating requests
const authenticate = passport.authenticate('jwt', { session: false });

// Function to generate a JWT for a user
const generateToken = (user) => {
  const payload = { id: user._id };
  const token = jwt.sign(payload, jwtOptions.secretOrKey);
  return token;
};

module.exports = { authenticate, generateToken };
