import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import ClassController from './app/controllers/ClassController';
import ClassUserController from './app/controllers/ClassUserController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/login', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/class', ClassController.index);
routes.post('/class', ClassController.store);
routes.put('/class/:id', ClassController.update);
routes.delete('/class/:id', ClassController.delete);

routes.get('/class-user', ClassUserController.index);
routes.post('/class-user', ClassUserController.store);
routes.put('/class-user/:id', ClassUserController.update);
routes.delete('/class-user/:id', ClassUserController.delete);

export default routes;
