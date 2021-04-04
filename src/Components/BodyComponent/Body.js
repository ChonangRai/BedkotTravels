import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
export const Body = () => {
    return (
        <Switch>
            <Route path = '/' exact component={Home} />
            <Route path = '/register' component={Register} />
        </Switch>
    )
}
export default Body;