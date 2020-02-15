import React from 'react';
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';

import withStore from '~/hocs/withStore';
import routes, { routesMap } from '~/routes';

class App extends React.Component{

    render(){
        let routesComponents = routes.map((route) => {
            return <Route path={route.url}
                          component={route.component}
                          exact={route.exact}
                          key={route.url}
            />;
        });

        return (
            <Router>
                <Switch>
                   {routesComponents}
                </Switch>
            </Router>
        )
    }
}

export default withStore(App);