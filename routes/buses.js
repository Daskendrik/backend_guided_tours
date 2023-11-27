const express = require('express');
const controllerBus = require('../controllers/buses');

const router = express.Router();

router.get('/getAllbus', controllerBus.getAllbus);
router.get('/createBus', controllerBus.createBus);
router.get('/deleteBus', controllerBus.deleteBus);

module.exports = router;
