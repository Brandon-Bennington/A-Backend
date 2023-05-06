// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const usersRoute = require('./routes/users');
const menuItemsRoute = require('./routes/menuItems');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', usersRoute);
app.use('/api/menuItems', menuItemsRoute);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to verify JWT on protected routes
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      req.userId = decoded.id;
      req.userType = decoded.userType;
      next();
    });
  } else {
    res.status(401).json({ message: 'Token not found' });
  }
};

// Protected route that requires authentication and authorization
app.get('/api/employee/dashboard', verifyToken, (req, res) => {
  if (req.userType !== 'employee') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  // Return the employee dashboard data
  res.json({ message: 'Employee dashboard data' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
