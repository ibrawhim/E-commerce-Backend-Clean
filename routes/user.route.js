console.log("User routes loaded");
const express = require('express');
const router = express.Router();
const { signupController, signinController } = require('../controllers/userInfos.controller');



// router.post('/signup', signupController);

router.post("/signup", (req, res) => {
    console.log("Signup route hit");
    console.log(req.body);

    res.json({
        success: true,
        body: req.body
    });
});

router.post('/signin', signinController);




module.exports = router;