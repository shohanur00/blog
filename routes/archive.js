const express = require('express');
const router = express.Router();
const authModel = require('../models/archive');


router.get('/:year/:month', (req, res) => {
    const { year, month } = req.params;
    //res.send(`Year: ${year}, Month: ${month}`);
  });
  


module.exports = router;