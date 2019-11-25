import { Router } from 'express';

import AmigoOcultoController from './app/controller/AmigoOcultoController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Hello world' }));

routes.post('/amigo-oculto', AmigoOcultoController.store);
routes.get('/amigo-oculto', AmigoOcultoController.index);
routes.get('/amigo-oculto/:id', AmigoOcultoController.index);
routes.get('/amigo-oculto/:id/cancel', AmigoOcultoController.cancel);
routes.put('/amigo-oculto/:id', AmigoOcultoController.update);

export default routes;
