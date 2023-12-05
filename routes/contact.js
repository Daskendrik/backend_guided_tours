const express = require('express');
const controller = require('../controllers/contact');

const router = express.Router();

router.get('/getAll', controller.getAll);
router.get('/find', controller.find);
router.put('/create', controller.create);
router.get('/edit', controller.edit);

module.exports = router;
