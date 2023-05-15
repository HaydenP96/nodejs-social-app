const mongoose = require('mongoose');
require('dotenv').config();

const connection = mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('connected'))
  .catch((e) => console.log(e));

module.exports = connection;
