import { Router } from 'express';
import cors from 'cors';
import SessionController from './app/controllers/SessionController';
import DealerController from './app/controllers/DealerController';
import PurchaseController from './app/controllers/PurchaseController';
import CashBackController from './app/controllers/CashBackController';
import authMiddlewares from './app/middlewares/auth';

const routes = new Router();

routes.use(cors());

//login
routes.post('/sessions', SessionController.store);

//dealer
routes.post('/dealer', DealerController.store);

// Middlewares
routes.use(authMiddlewares);

//purchase
routes.post('/purchase', PurchaseController.store);
routes.get('/purchase/:cpf', PurchaseController.get);
routes.get('/purchase-index/:code', PurchaseController.index);

//cashback
routes.get('/cashback', CashBackController.get);
routes.get('/cashback/:cpf', CashBackController.index);


export default routes;
