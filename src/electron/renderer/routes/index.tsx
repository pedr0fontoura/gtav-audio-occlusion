import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from '../screens/Home';
import PathNodes from '../screens/PathNodes';
import Portals from '../screens/Portals';
import Rooms from '../screens/Rooms';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/pathnodes" component={PathNodes} />
    <Route path="/portals" component={Portals} />
    <Route path="/rooms" component={Rooms} />
  </Switch>
);

export default Routes;
