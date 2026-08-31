const signupModel = require("../models/signup.model");
const jwt = require("jsonwebtoken");

/**

* Get logged-in user's profile
* GET /profile
  */
  const getProfile = async (req, res) => {
  try {
  const user = await signupModel
  .findById(req.user.id)
  .select("-password");

  
   if (!user) {
       return res.status(404).json({
           success: false,
           message: "User not found."
       });
   }

   return res.status(200).json({
       success: true,
       message: "Profile retrieved successfully.",
       data: user
   });
  

  } catch (err) {
  return res.status(500).json({
  success: false,
  message: err.message
  });
  }
  };

/**

* Update logged-in user's profile
* PATCH /profile
  */
  const updateProfile = async (req, res) => {
  try {
  const userId = req.user.id;

  
   const {
       firstName,
       lastName,
       email,
       phone,
       bio
   } = req.body;

   const updateData = {};

   if (firstName !== undefined) {
       updateData.firstName = firstName;
   }

   if (lastName !== undefined) {
       updateData.lastName = lastName;
   }

   if (phone !== undefined) {
       updateData.phone = phone;
   }

   if (bio !== undefined) {
       updateData.bio = bio;
   }

   if (email !== undefined) {
       const existingUser = await signupModel.findOne({
           email,
           _id: { $ne: userId }
       });

       if (existingUser) {
           return res.status(409).json({
               success: false,
               message: "Email is already in use."
           });
       }

       updateData.email = email;
   }

   const updatedUser = await signupModel
       .findByIdAndUpdate(
           userId,
           { $set: updateData },
           {
               new: true,
               runValidators: true
           }
       )
       .select("-password");

   if (!updatedUser) {
       return res.status(404).json({
           success: false,
           message: "User not found."
       });
   }

   // Generate a fresh JWT
   const token = jwt.sign(
       {
           id: updatedUser._id,
           email: updatedUser.email,
           role: updatedUser.role
       },
       process.env.SECRET,
       {
           expiresIn: "24h"
       }
   );

   return res.status(200).json({
       success: true,
       message: "Profile updated successfully.",
       data: updatedUser,
       token
   });
  

  } catch (err) {
  console.log("Profile update error:", err);

  
   return res.status(500).json({
       success: false,
       message: err.message
   });
  

  }
  };

module.exports = {
getProfile,
updateProfile
};
