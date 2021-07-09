const express = require('express');
const { superRentalData } = require('../model/userModel');
const AuthModel = require('../model/authModel');

const router = express.Router();

//Get Post
router.get('/', async (req, res) => {
  const user = await superRentalData.find({});
  if (!user) {
    return res
      .status(500)
      .json({ message: 'No User in system', success: false });
  }
  res.json(user);
});

router.get('/:id', async (req, res) => {
  const user = await AuthModel.findById(req.params.id);
  if (!user) {
    return res
      .status(500)
      .json({ message: 'No User in system', success: false });
  }
  console.log(user);
  return res.status(200).json({
    data: {
      id: user._id,
      type: 'user',
      attributes: {
        'first-name': user.firstName,
        'last-name': user.lastName,
        email: user.email,
        'mobile-no': user.mobileNo,
      },
    },
  });
});

router.post('/', async (req, res) => {
  console.log(req.body);
  let userData = new superRentalData({
    firstName: req.body.data.attributes['first-name'],
    lastName: req.body.data.attributes['last-name'],
    email: req.body.data.attributes['email'],
    apartmentName: req.body.data.attributes['apartmentName'],
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

//Update Products
router.put('/:id', async (req, res) => {
  console.log(req.body);
  let userData = await AuthModel.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      // apartmentName: req.body.apartmentName,
      mobileNo: req.body.mobileNo,
    },
    {
      new: true,
    }
  );
  await userData.save((err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(404)
        .json({ message: 'Update Failure', success: false });
    }
    return res.send(result);
  });
});

module.exports = router;
