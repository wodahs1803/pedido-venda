import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from './pages/main';
import { Item, ItemForm, ItemCreate } from './pages/item';
import { Purchase, PurchaseForm, PurchaseCreate, PurchaseList, PurchaseAdd } from './pages/purchase';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            {/* Produto */}
            <Route exact path="/item" component={Item} />
            <Route exact path="/item/create" component={ItemCreate} />
            <Route exact path="/item/:id" component={ItemForm} />
            {/* Compra */}
            <Route exact path="/purchase"component={Purchase} />
            <Route exact path="/purchase/create" component={PurchaseCreate} />
            <Route exact path="/purchase/:id" component={PurchaseForm} />
            <Route exact path="/purchase/list/:id" component={PurchaseList} />
            <Route exact path="/purchase/add/:id" component={PurchaseAdd} />
        </Switch>
    </BrowserRouter>
);

export default Routes;