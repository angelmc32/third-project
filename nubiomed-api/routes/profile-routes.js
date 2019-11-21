const express = require('express');       // Import express for router functionality through its Router method
const router = express.Router();          // Execute express router and store it into router const
const User = require('../models/User');   // Require the User model to create and find users in database

// Import helpers for token verification (jwt) and cloudinary uploader (multer+cloudinary)
const { verifyToken } = require('../helpers/auth-helper');
const uploader = require('../helpers/multer-helper');

router.patch('/edit', verifyToken, uploader.single('profile_picture'), (req, res, next) => {

  const { id } = req.user;

  let secure_url = ''

  if ( req.file ) {
    secure_url = req.file.secure_url;
  }

  User.findByIdAndUpdate( id, {$set: {...req.body, profile_picture: secure_url}}, { new: true } )
  .then( user => {

    res.status(200).json({ user });

  })
  .catch( error => {

    res.status(500).json({ error, msg: "Unable to update profile" });

  });

});

module.exports = router;