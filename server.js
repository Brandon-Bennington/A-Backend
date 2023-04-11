
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const menuItemsRouter = require('./routes/menuItems');
const usersRouter = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/menuItems', menuItemsRouter);
app.use('/api/users', usersRouter);

const port = process.env.PORT || 5001;

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
