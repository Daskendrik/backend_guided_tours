import { Router } from 'express';
import { getAll, create, update, getLast, getById, deleteRow } from '../controllers/contact.ts';

export const contact = Router();

contact.get('/getAll', getAll);
contact.post('/create', create);
contact.post('/update', update);
contact.get('/getLast', getLast);
contact.post('/delete', deleteRow);
contact.get('/getById', getById);
