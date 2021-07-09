const express = require('express');
const router = express.Router();
const User = require('../model/authModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      mobileNo: user.mobileNo,
      firstName: user.firstName,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

//@desc   Reg user & token
//@route  POST api/users/
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, mobileNo } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    mobileNo,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      // name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      mobileNo: user.mobileNo,
      firstName: user.firstName,
      lastName: user.lastName,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid user Data');
  }
});

router.route('/').post(registerUser);
router.post('/login', authUser);

module.exports = router;
