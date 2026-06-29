const express = require('express');
const app = express();
const env = require('dotenv').config({debug: true});
const mongoose = require('./connections/mongodb.connection');
const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});