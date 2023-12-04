const express = require('express');
const controllerBus = require('../controllers/company_bus');

const router = express.Router();

router.get('/getAllCompanyBus', controllerBus.allCompanyBus);
router.put('/createCompanyBus', controllerBus.createCompanyBus);
router.delete('/deleteCompanyBus', controllerBus.deleteCompanyBus);

module.exports = router;
