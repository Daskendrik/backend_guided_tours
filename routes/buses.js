const express = require('express');
const controllerBus = require('../controllers/buses');

const router = express.Router();

router.get('/getAllbus', controllerBus.getAllbus);
router.put('/createBus', controllerBus.createBus);
router.delete('/deleteBus', controllerBus.deleteBus);

module.exports = router;
