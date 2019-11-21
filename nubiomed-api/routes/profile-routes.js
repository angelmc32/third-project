const express = require('express');       // Import express for router functionality through its Router method
const router = express.Router();          // Execute express router and store it into router const
const User = require('../models/User');   // Require the User model to create and find users in database

// Import helpers for token verification (jwt) and cloudinary uploader (multer+cloudinary)
const { verifyToken } = require('../helpers/auth-helper');
const uploader = require('../helpers/multer-helper');

