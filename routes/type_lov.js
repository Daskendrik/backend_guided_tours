const express = require('express');
const controller = require('../controllers/type_lov');

const router = express.Router();

router.get('/getAll', controller.getAll);
router.put('/create', controller.create);
router.delete('/delete', controller.delete);
router.get('/getById', controller.getById);

module.exports = router;
