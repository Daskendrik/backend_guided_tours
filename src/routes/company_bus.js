import { Router } from 'express';
import {
  allCompanyBus,
  createCompanyBus,
  deleteCompanyBus,
} from '../controllers/company_bus.js';

export const companyBus = Router();

companyBus.get('/getAllCompanyBus', allCompanyBus);
companyBus.put('/createCompanyBus', createCompanyBus);
companyBus.delete('/deleteCompanyBus', deleteCompanyBus);
