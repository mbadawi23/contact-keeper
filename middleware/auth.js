const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Extract the token from the header
  const token = req.header('x-auth-token');

  // Check not token
  if (!token) {
    return res.status(401).json({ msg: 'No token. Authentication failed.' });
  }

  console.log('token', token);

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // set user
    req.user = decoded.user;

    // Call next
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is invalid.' });
  }
};
