const express = require('express');       // Import express for router functionality through its Router method
const router = express.Router();          // Execute express router and store it into router const
const jwt = require('jsonwebtoken');      // Import jsonwebtoken for token creation and authentication
const bcrypt = require('bcryptjs');       // Import bcryptjs for password hash creation and password validation
const { send } = require('../helpers/mailer-helper');
const User = require('../models/User');   // Require the User model to create and find users in database

// POST route for user signup. We will check for password length, hash the password, create the user in the database,
// if succesful, send an email for verification and create an auth token with jwt,
// if unsuccesful, send a response with status 404 not found, the error and a message
router.post('/signup', (req, res, next) => {

  const { password } = req.body;  // Destructure the password as we must hash it before storing it in the database

  // Password length validation, min length 8, if not, respond with a 500 error and an explanation
  if ( password.length < 8 ) return res.status(500).json({ error: "Password is too short" });

  // Use bcryptjs methods to generate salt and hash password, to store it with an extra level of security
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);


  User.create({ ...req.body, password: hashedPassword })
  .then( user => {
    
    const options = {
      filename: 'signup',
      email: user.email,
      message: 'Please verify your email',
      subject: 'Please verify your email'
    };

    send(options);

    jwt.sign({ id: user._id }, process.env.SECRET, (error, token) => {

      delete user._doc.password;

      if ( error ) return res.status(500).json({ error, msg: 'Error while creating token with jwt' })

      res.status(200).json({ user, token, msg: 'User and token created correctly' })

    });
    
  })
  .catch( error => res.status(404).json({ error, msg: 'Error while creating user' }) )


});

router.post('/login', (req, res, next) => {

  res.status(200).json({ msg: 'signup route OK' });

});

module.exports = router;