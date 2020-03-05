const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// @route       GET api/auth
// @desc        Get logged in user
// @access      Private
router.get('/', (req, res) => {
  // The slash here referes to 'api/users'. Defined by route in server.js
  res.send('Get a logged in user.');
});

// @route       POST api/auth
// @desc        Authenticate an existing user & get token.
// @access      Private
router.post(
  '/',
  [
    check('email', 'Please enter a valid email.').isEmail(),
    check('password', 'Password is required.').exists()
  ],
  async (req, res) => {
    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ msg: 'A user with that email does not exist.' });
      }

      // Check plain text password against hash password using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);

      // If password is wrong
      if (!isMatch) {
        return res
          .status(400)
          .json({ msg: 'The password provided did not match our records.' });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error.');
    }
  }
);

// export the router
module.exports = router;
