import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from '../screens/Home';
import Nodes from '../screens/Nodes';
import PortalEntries from '../screens/PortalEntries';
import PortalsEntities from '../screens/PortalsEntities';
import Rooms from '../screens/Rooms';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/portalEntries" component={PortalEntries} />
    <Route path="/nodes" component={Nodes} />
    <Route path="/portalsEntities" component={PortalsEntities} />
    <Route path="/rooms" component={Rooms} />
  </Switch>
);

export default Routes;
