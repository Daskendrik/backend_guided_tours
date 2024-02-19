import { Router } from 'express';
import { getAllbus, createBus, deleteBus } from '../controllers/buses.js';

export const busesRoutes = Router();

busesRoutes.get('/getAllbus', getAllbus);
busesRoutes.put('/createBus', createBus);
busesRoutes.delete('/deleteBus', deleteBus);
