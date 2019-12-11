const express = require('express');               // Import express for router functionality through its Router method
const router = express.Router();                  // Execute express router and store it into router const
const Facility = require('../models/Facility');   // Require the User model to create and find users in database

// Import helpers for token verification (jwt) and cloudinary uploader (multer+cloudinary)
const { verifyToken } = require('../helpers/auth-helper');
const uploader = require('../helpers/multer-helper');

router.get('/', verifyToken, (req, res, next) => {

  const { id, usertype } = req.user;    // Destructure the user id from the request
  console.log(req.user);

  Facility.find({ ref_model_id: id })
  .populate('ref_model_id', 'first_name profile_picture')
  .then( facilities => {

    res.status(200).json({ facilities });

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to retrieve data' }); // Respond 500 status, error and message

  });

});

router.get('/all', (req, res, next) => {

  Facility.find()
  .populate()
  .then( facilities => {

    res.status(200).json({ facilities });

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to retrieve data' }); // Respond 500 status, error and message

  });

});

router.post('/new', verifyToken, uploader.array('images'), (req, res, next) => {

  const { files, user } = req;
  const images = files.map( file => file.secure_url );

  Facility.create({ ...req.body, ref_model_id: user._id, ref_model_name: user.usertype, images })
  .then( facility => {

    Facility.populate(facility, { path: 'ref_model_id', select: 'first_name profile_picture _id' });

    res.status(200).json({ facility });

  })
  .catch( error => {

    console.log(error)

    res.status(500).json({ error, msg: 'Unable to create the facility' });

  });

});

router.get('/:facilityID', (req, res, next) => {

  const { facilityID } = req.params;

  Facility.findById( facilityID )
  .populate('ref_model_id', 'first_name profile_picture')
  .then( facility => {

    res.status(200).json({ facility });

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to retrieve the facility' });

  });

});

router.patch('/:facilityID', verifyToken, uploader.array('images'), (req, res, next) => {

  const { facilityID } = req.params;
  const body  = req.body;               // Extract body from request

  // If a file is being uploaded, set the secure_url property in the secure_url variable
  if ( req.files ) {
    const images = req.files.map(file => file.secure_url);
    body[images] = images;
  }

  Facility.findByIdAndUpdate( facilityID, { $set: { ...body } }, { new: true } )
  .populate('ref_model_id', 'first_name profile_picture')
  .then( facility => {

    console.log(facility);
    res.status(200).json({ facility });

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to update the facility' });

  });

});

router.delete('/:facilityID', verifyToken, (req, res, next) => {

  const { facilityID } = req.params;

  Facility.findByIdAndRemove( facilityID )
  .then( facility => {

    res.status(200).json({ facility });

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to delete the facility' });

  });

});

module.exports = router;