const express = require('express');
const controller = require('../controllers/buses');

const router = express.Router();

router.get('/getAllbus', controller.getAllbus);
router.put('/createBus', controller.createBus);
router.delete('/deleteBus', controller.deleteBus);

module.exports = router;
