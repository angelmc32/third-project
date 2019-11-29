const jwt = require('jsonwebtoken');            // Require jwt for verify method (token verification)
const Patient = require('../models/Patient');   // Require Patient model to obtain user data if authentication is successful
const Doctor = require('../models/Doctor')      // Require Doctor model to obtain user data if authentication is successful

exports.verifyToken = require = (req, res, next) => {

  // Destructure authorization from headers and rename it as token
  const { authorization: token } = req.headers;

  // Call jwt verify method, send token and secret as parameters fir token validation,
  // if successful, obtain decoded data from token (in our app, user id), find user in database and execute next step
  // if unsuccessful, respond with 401 status and failed authentication message
  jwt.verify(token, process.env.SECRET, (error, decoded) => {

    // Respond with 401 status and failed authentication message in case of an error detected by jwt.verify method
    if ( error ) return res.status(401).json({ error, msg: 'Token authentication failed'});

    if ( decoded.usertype !== 'Doctor') {
      // Search for user in database using decoded data (in our app, saved as id for user._id when creating token)
      Patient.findById(decoded.id)
      .then( user => {                // Rename the found patient document as "user"

        // Save data into the request as user property (req.user), execute next step with next()
        req.user = user;
        next();

      });
    } else {
      // Search for doctor in database using decoded data (in our app, saved as id for user._id when creating token)
      Doctor.findById(decoded.id)
      .then( user => {                // Rename the found patient document as "user"

        // Save data into the request as user property (req.user), execute next step with next()
        req.user = user;
        next();

      })
    };
  });
};