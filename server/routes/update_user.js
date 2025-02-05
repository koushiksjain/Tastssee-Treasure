const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Joi = require("joi");

// Validation schema for updating user details
const validateUpdate = (data) => {
  const schema = Joi.object({
    user_id: Joi.string().required().label("user_id"),
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

// Route to update user details
router.post("/", async (req, res) => {
  try {
    // Validate request body
    console.log(req.body);
    const { error } = validateUpdate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { user_id, firstName, lastName, email, password } = req.body;

    // Find user by old first name and last name
    const user = await User.findOne({ _id: user_id });
    if (!user) return res.status(404).send({ message: "User not found" });
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);
    // Update user details
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email.toLowerCase();
    user.password = hashPassword; // Ensure password is hashed if needed

    await user.save();

    res.status(200).send({ message: "User details updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/delete_user/", async (req, res) => {
  try {
    // Validate request body
    console.log(req.body);
  

    const user_id  = req.body.user_id;

    // Find user by old first name and last name
    const user = await User.findByIdAndDelete({ _id: user_id });
    if (!user) return res.status(404).send({ message: "User not found" });

    console.log("User deleted successfully");
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
