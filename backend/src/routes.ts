import express from 'express';

import RegisterController from './app/controllers/RegisterController';
import SessionController from './app/controllers/SessionController';
import EstablishmentController from './app/controllers/EstablishmentController';
import ProductController from './app/controllers/ProductController';
import SaleController from './app/controllers/SaleController';
import ClientController from './app/controllers/ClientController';

import authMiddleware from './app/middlewares/auth';
import PaymentController from './app/controllers/PaymentController';
import SaleFilterController from './app/controllers/SaleFilterController';
import ProductFilterController from './app/controllers/ProductFilterController';
import ProfitController from './app/controllers/ProfitController';

const Router = express.Router();

Router.post('/register', RegisterController.store);
Router.post('/session', SessionController.store);

Router.route('/establishment')
  .all(authMiddleware)
  .get(EstablishmentController.show)
  .put(EstablishmentController.update);

Router.route('/products')
  .all(authMiddleware)
  .post(ProductController.store)
  .get(ProductController.index);

Router.route('/products/:id')
  .all(authMiddleware)
  .get(ProductController.show)
  .put(ProductController.update)
  .delete(ProductController.destroy);

Router.get('/filter/products', authMiddleware, ProductFilterController.index);

Router.route('/sales').all(authMiddleware).post(SaleController.store);

Router.route('/clients')
  .all(authMiddleware)
  .post(ClientController.store)
  .get(ClientController.index);

Router.put('/clients/:id', authMiddleware, ClientController.update);

Router.put(
  '/clients/:id_client/payment',
  authMiddleware,
  PaymentController.update
);

Router.get(
  '/dashboard/sales/:filter',
  authMiddleware,
  SaleFilterController.index
);

Router.get(
  '/dashboard/products/:filter',
  authMiddleware,
  ProductFilterController.show
);

Router.get('/dashboard/profits/:filter', authMiddleware, ProfitController.show);

export default Router;
