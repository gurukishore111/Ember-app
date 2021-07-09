const { json } = require('express');
const express = require('express');
const router = express.Router();
const homedata = require('../utils/data/rentals.json');
const downtownData = require('../utils/data/rentals/downtown-charm.json');
const grandOldData = require('../utils/data/rentals/grand-old-mansion.json');
const urbanData = require('../utils/data/rentals/urban-living.json');

//Get Post
router.get('/', async (req, res) => {
  res.send(homedata);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (id === 'grand-old-mansion') {
    return res.status(200).send(grandOldData);
  }

  if (id === 'urban-living') {
    return res.status(200).send(urbanData);
  }
  if (id === 'downtown-charm') {
    return res.status(200).send(downtownData);
  }
  return res.status(404).json({ message: 'Not Founded' });
});

module.exports = router;
