const express = require('express');
const routes = express.Router();

const PurchaseController = require('./controllers/PurchaseController');
const ItemController = require('./controllers/ItemController');

//Purchases
routes.get('/purchase', PurchaseController.index);
routes.post('/purchase', PurchaseController.store);
routes.get('/purchase/:id', PurchaseController.show);
routes.put('/purchase/:id', PurchaseController.update);
routes.delete('/purchase/:id', PurchaseController.destroy);
routes.get('/purchase/list/:id', PurchaseController.listItems);
routes.post('/purchase/list/:id', PurchaseController.manageItems);

//Items
routes.get('/item', ItemController.index);
routes.post('/item', ItemController.store);
routes.get('/item/:id', ItemController.show);
routes.put('/item/:id', ItemController.update);
routes.delete('/item/:id', ItemController.destroy);

module.exports = routes;