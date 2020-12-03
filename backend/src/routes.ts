import express from 'express';


import CompradoresController from './controllers/CompradoresController';
import FornecedoresController from './controllers/FornecedoresController';
import MotoristasController from './controllers/MotoristasController';
import AppointmentsController from './controllers/AppointmentsController';

const routes = express.Router();
const compradoresController = new CompradoresController();
const fornecedoresController = new FornecedoresController();
const motoristasController = new MotoristasController();
const appointmentsController = new AppointmentsController();


routes.get('/Compradores', CompradoresController.index);
routes.post('/Compradores', CompradoresController.create);
routes.post('/Compradores/:id', CompradoresController.delete);

routes.get('/Fornecedores', FornecedoresController.index);
routes.post('/Fornecedores', FornecedoresController.create);
routes.post('/Fornecedores/:id', FornecedoresController.delete);

routes.get('/Motoristas', MotoristasController.index);
routes.post('/Motoristas', MotoristasController.create);
routes.post('/Motoristas/:id', MotoristasController.delete);


routes.get('/appointments', appointmentsController.index);
routes.post('/appointments', appointmentsController.create);
routes.post('/appointments/:id', appointmentsController.delete);


export default routes;