const express = require('express');
const app = express();
const env = require('dotenv').config({quiet: true});
const mongoose = require('./connections/mongodb.connection');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const userRoute = require('./routes/user.route');

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', userRoute);

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

module.exports = app;