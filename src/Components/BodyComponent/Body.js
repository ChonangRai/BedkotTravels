import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import UserLogin from './UserLogin';
import Destination from './Destination';

export const Body = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/register' component={Register} />
            <Route path='/admin-login' component={Login} />
            <Route path='/login' component={UserLogin} />
            <Route path='/destination/get-destination/:id' component={Destination} />
        </Switch>
    )
}
export default Body;