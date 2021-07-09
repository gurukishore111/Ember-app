const express = require('express');
const { superRentalData } = require('../model/userModel');
const AuthModel = require('../model/authModel');

const router = express.Router();

router.post('/', async (req, res) => {
  console.log(req.body);
  let userData = new superRentalData({
    firstName: req.body.data.attributes['first-name'],
    lastName: req.body.data.attributes['last-name'],
    email: req.body.data.attributes['email'],
    apartmentName: req.body.data.attributes['apartment-name'],
    mobileNo: req.body.data.attributes['mobile-no'],
  });
  await userData.save((err, result) => {
    if (err) {
      return res.status(400).json({ message: err, success: false });
    }
    console.log({
      data: [
        {
          id: result._id,
          attributes: {
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            mobileNo: result.mobileNo,
          },
        },
      ],
    });

    // {
    //   "data": {
    //       "type": "user",
    //       "id": "123",
    //       "attributes": {
    //           "name": "Jeff",
    //           "email": "Jeff@abc.com"
    //       }
    //   //   }
    // }
    return res.status(200).json({
      data: {
        id: result._id,
        type: 'user',
        attributes: {
          'first-name': result.firstName,
          'last-name': result.lastName,
          email: result.email,
          'mobile-no': result.mobileNo,
        },
      },
    });
  });
});

module.exports = router;
