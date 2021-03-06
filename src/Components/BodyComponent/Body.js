import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import UserLogin from './UserLogin';
import Destination from './Destination';
import AddDestination from './AddDestination';
import EditDestination from './EditDestination';
import { MyBookings } from './MyBookings';
import Search from './Search';
import PasswordReset from './PasswordReset';

export const Body = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/register' component={Register} />
            <Route path='/admin-login' component={Login} />
            <Route path='/login' component={UserLogin} />
            <Route path='/destination/get-destination/:id' component={Destination} />
            <Route path='/add-destination' component={AddDestination} />
            <Route path='/destination/edit-destination/:id' component={EditDestination} />
            <Route path='/my-bookings' component={MyBookings} />
            <Route path='/search' component={Search} />
            <Route path='/reset-password' component={PasswordReset} />
        </Switch>
    )
}
export default Body;