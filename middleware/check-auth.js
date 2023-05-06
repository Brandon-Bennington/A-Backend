const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

router.post('/check-auth', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      res.status(200).json({ message: 'Authorized', usertype: decoded.usertype });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Authorization token invalid' });
    }
  });

module.exports = router;
