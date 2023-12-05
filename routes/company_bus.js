const express = require('express');
const controller = require('../controllers/company_bus');

const router = express.Router();

router.get('/getAllCompanyBus', controller.allCompanyBus);
router.put('/createCompanyBus', controller.createCompanyBus);
router.delete('/deleteCompanyBus', controller.deleteCompanyBus);

module.exports = router;
