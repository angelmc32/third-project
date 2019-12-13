const express = require('express');             // Import express for router functionality through its Router method
const router = express.Router();                // Execute express router and store it into router const
const jwt = require('jsonwebtoken');            // Import jsonwebtoken for token creation and authentication
const bcrypt = require('bcryptjs');             // Import bcryptjs for password hash creation and password validation
const Patient = require('../models/Patient');   // Require the Patient model to create and find users in database
const Doctor = require('../models/Doctor')      // Require the Doctor model to create and find users in database

// Import send method from mailer helper to email verification through sendgrid (config in mailer-helper)
const { send } = require('../helpers/mailer-helper');

// POST route for user signup. Validate password length, hash the password, create the user in the database,
// if successful, send email for verification and a response with status 200, the user, token and success message,
// if unsuccessful, send a response with status 500 (Internal Server Error), the error and a message
router.post('/signup', (req, res, next) => {

  // Destructure the password in order to hash it before storing it in the database, and the usertype for model verification
  const { password, usertype } = req.body;
  
  // Password length validation, min length 8, if not, respond with a 500 status and error message
  if ( password.length < 8 ) return res.status(500).json({ error, msg: "Password is too short" });

  // Use bcryptjs methods to generate salt and hash password, for storage with an extra level of security
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Validate if user will sign up as a doctor or as a patient
  if ( usertype !== 'Doctor' ) {
    
    // Call mongoose create method, pass the request body (which includes the email, but it's possible to send any
    // other additional data from the front-end) and the hashed password as parameters, to be saved in the database
    Patient.create({ ...req.body, password: hashedPassword })
    .then( user => {          // Rename the found patient document as "user"
      
      // Configure options variable to pass as parameter to the mailer send method
      const options = {
        filename: 'signup',
        email: user.email,
        message: 'Please verify your email',
        subject: 'Please verify your email'
      };

      // Call mailer send method with options variable as parameter for e-mail verification
      send(options);

      // Create a token with jwt: first parameter is data to be serialized into the token, second parameter
      // is app secret (used as key to create a token signature), third is a callback that passes the error or token
      jwt.sign({ id: user._id, usertype: user.usertype }, process.env.SECRET, (error, token) => {

        // Delete the password from the user document (returned by mongoose) before sending to front-end
        delete user._doc.password;

        // If there's an error creating the token, respond to the request with a 500 status, the error and a message
        if ( error ) return res.status(500).json({ error, msg: 'Error while creating token with jwt' });

        // Respond to the request with a 200 status, the user data and a success message
        res.status(200).json({ user, token, msg: 'Signed up and logged in: Patient and token created successfully' });

      });
      
    })
    .catch( error => {
      
      // Respond with 500 status, the error and a message
      res.status(500).json({ error, msg: 'Error while creating Patient user' });
      console.log(error);
    
    });
  }
  else {

    // Call mongoose create method, pass the request body (which includes the email, but it's possible to send any
    // other additional data from the front-end) and the hashed password as parameters, to be saved in the database
    Doctor.create({ ...req.body, password: hashedPassword })
    .then( user => {          // Rename the found doctor document as "user"
      
      // Configure options variable to pass as parameter to the mailer send method
      const options = {
        filename: 'signup',
        email: user.email,
        message: 'Please verify your email',
        subject: 'Please verify your email'
      };

      // Call mailer send method with options variable as parameter for e-mail verification
      send(options);

      // Create a token with jwt: first parameter is data to be serialized into the token, second parameter
      // is app secret (used as key to create a token signature), third is a callback that passes the error or token
      jwt.sign({ id: user._id, usertype: user.usertype }, process.env.SECRET, (error, token) => {

        // Delete the password from the user document (returned by mongoose) before sending to front-end
        delete user._doc.password;

        // If there's an error creating the token, respond to the request with a 500 status, the error and a message
        if ( error ) return res.status(500).json({ error, msg: 'Error while creating token with jwt' });

        // Respond to the request with a 200 status, the user data and a success message
        return res.status(200).json({ user, token, msg: 'Signed up and logged in: Doctor and token created successfully' });

      });
      
    })
    .catch( error => {
      
      // Respond with 500 status, the error and a message
      res.status(500).json({ error, msg: 'Error while creating doctor' });
    
      console.log(error);
    });
  }
  
});

// POST route for user login. Validate password length, hash the password, create the user in the database,
// if successful, validate password, and send a response with 200 status, the user, token and success message,
// if unsuccessful, send a response with status 404 (Not found), the error and a message
router.post('/login', (req, res, next) => {

  const { email, password, usertype } = req.body; // Destructure email, password and usertype from request body

  if ( usertype !== 'Doctor') {

    // Call mongoose findOne method, pass the email as query, if email exists, validate password and create token
    Patient.findOne({ email })
    .then( user => {      

      // Verify if password sent is correct, true. If password is incorrect, false and send 401 status
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) return res.status(401).json({ error, msg: 'Invalid password' });

      // Create a token with jwt: first parameter is data to be serialized into the token, second parameter
      // is app secret (used as key to create a token signature), third is a callback that passes the error or token
      jwt.sign({ id: user._id, usertype: 'patient' }, process.env.SECRET, (error, token) => {

        // Delete the password from the user document (returned by mongoose) before sending to front-end
        delete user._doc.password;

        // If there's an error creating the token, respond to the request with a 500 status, the error and a message
        if ( error ) return res.status(500).json({ error, msg: 'Error while creating token with jwt' });

        // Respond to the request with a 200 status, the user data and a success message
        res.status(200).json({ user, token, msg: 'Login: Token created successfully' });

      });

    })
    .catch( error => {

      // Respond with 404 status, the error and a message
      res.status(404).json({ error, msg: 'Email not found in database' });

    });
  } else {

    // Call mongoose findOne method, pass the email as query, if email exists, validate password and create token
    Doctor.findOne({ email })
    .then( user => {

      // Verify if password sent is correct, true. If password is incorrect, false and send 401 status
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) return res.status(401).json({ error, msg: 'Invalid password' });

      // Create a token with jwt: first parameter is data to be serialized into the token, second parameter
      // is app secret (used as key to create a token signature), third is a callback that passes the error or token
      jwt.sign({ id: user._id, usertype: user.usertype }, process.env.SECRET, (error, token) => {

        // Delete the password from the user document (returned by mongoose) before sending to front-end
        delete user._doc.password;

        // If there's an error creating the token, respond to the request with a 500 status, the error and a message
        if ( error ) return res.status(500).json({ error, msg: 'Error while creating token with jwt' });

        // Respond to the request with a 200 status, the user data and a success message
        res.status(200).json({ user, token, msg: 'Login: Token created successfully' });

      });

    })
    .catch( error => {

      // Respond with 404 status, the error and a message
      res.status(404).json({ error, msg: 'Email not found in database' });

    });
  }
});

module.exports = router;