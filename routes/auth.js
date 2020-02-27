const express = require('express');
const router = express.Router();

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
router.post('/', (req, res) => {
  // The slash here referes to 'api/users'. Defined by route in server.js
  res.send('Authenticate an existing user & get token.');
});

// export the router
module.exports = router;
