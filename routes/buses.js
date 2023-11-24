const express = require('express');
const controller = require('../controllers/buses');

const router = express.Router();

router.get('/getAllbus', controller.getAllbus);

module.exports = router;
