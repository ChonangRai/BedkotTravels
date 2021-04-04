import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';

export const Body = () => {
    return (
        <Switch>
            <Route path = '/' exact component={Home} />
            <Route path = '/register' component={Register} />
            <Route path = '/login' component={Login} />
        </Switch>
    )
}
export default Body;