import { Router } from 'express';
import { getAll, create, update, getLast, getById } from '../controllers/contact.ts';

export const contact = Router();

contact.get('/getAll', getAll);
contact.post('/create', create);
contact.post('/update', update);
contact.get('/getLast', getLast);
// router.post('/delete', delete);
contact.get('/getById', getById);
