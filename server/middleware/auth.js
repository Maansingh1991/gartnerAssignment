const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');

const User = require('../models/User');


const jwtOptions = {
  secretOrKey: 'your-secret-key', 
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// Create the JWT strategy
const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    
    const user = await User.findById(payload.id);

    
    if (user) {
      return done(null, user);
    }

    
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(jwtStrategy);

const authenticate = passport.authenticate('jwt', { session: false });

const generateToken = (user) => {
  const payload = { id: user._id };
  const token = jwt.sign(payload, jwtOptions.secretOrKey);
  return token;
};

module.exports = { authenticate, generateToken };
