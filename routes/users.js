const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

// @route       POST api/users
// @desc        Register a user
// @access      Public
router.post(
  '/',
  [
    check('name', 'Please provide a name.')
      .not()
      .notEmpty(),
    check('email', 'Please enter a valid email.').isEmail(),
    check(
      'password',
      'Please enter a password of 4 or more charachters.'
    ).isLength({ min: 4 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log('req.body', req.body);
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ msg: 'A user with this email already exists.' });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, 10);

      await user.save();

      res.send('User saved.');
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error.');
    }
  }
);

// export the router
module.exports = router;
