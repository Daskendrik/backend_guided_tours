import { Router } from 'express';
import { getAll, create, getById } from '../controllers/type_lov.js';

export const typeLov = Router();

typeLov.get('/getAll', getAll);
typeLov.put('/create', create);
// router.delete('/delete', delete);
typeLov.get('/getById', getById);
