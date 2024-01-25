const express = require('express');
const controller = require('../controllers/contact');

const router = express.Router();

router.get('/getAll', controller.getAll);
router.post('/create', controller.create);
router.post('/update', controller.update);
router.get('/getLast', controller.getLast);
router.post('/delete', controller.delete);
router.get('/getById', controller.getById);

module.exports = router;
