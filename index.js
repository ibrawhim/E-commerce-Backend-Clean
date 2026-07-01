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
// app.use((req, res, next) => {
//     console.log(req.method, req.url);
//     next();
// });

app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.url);
    next();
});

app.use('/', userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});