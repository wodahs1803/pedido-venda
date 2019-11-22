import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from './pages/main';
import Item from './pages/item';
import ItemForm from './pages/itemForm';
import Purchase from './pages/purchase';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/item" component={Item} />
            <Route path="/purchase"component={Purchase} />
            <Route path="/item/:id" component={ItemForm} />
            <Route path="/item/del/:id" component={Item} />
        </Switch>
    </BrowserRouter>
);

export default Routes;