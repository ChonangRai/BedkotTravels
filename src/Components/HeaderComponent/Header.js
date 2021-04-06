import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import * as Icons from 'react-icons/fa';


export const Header = () => {
    const logOutUser = (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('user-token');
            localStorage.removeItem('admin-token');
            window.location.assign('/');
        }
    }


    if (localStorage.getItem('user-token')) {
        var header =
            <nav className="float-right d-flex mr-5">
                <NavLink style={{ textDecoration: 'none', color: 'rgba(0,0,0,0.7)', marginRight: '20px' }} activeClassName="active" to="/track-booking">TRACK BOOKING</NavLink>
                <NavLink style={{ textDecoration: 'none', color: 'rgba(0,0,0,0.7)', marginRight: '20px' }} activeClassName="active" to="/my-bookings">MY BOOKING</NavLink>
                <NavLink style={{ textDecoration: 'none', color: 'rgba(0,0,0,0.7)', marginRight: '20px' }} activeClassName="active" onClick={logOutUser} to="/">LOGOUT</NavLink>
            </nav>

    } else if (localStorage.getItem('admin-token')) {
        header =
            <nav className="float-right d-flex mr-5">
                <NavLink style={{ textDecoration: 'none', color: 'rgba(0,0,0,0.7)', marginRight: '20px' }} activeClassName="active" to="/view-bookings">VIEW BOOKINGS</NavLink>
                <NavLink style={{ textDecoration: 'none', color: 'rgba(0,0,0,0.7)', marginRight: '20px' }} activeClassName="active" to="/add-destination">ADD DESTINATION</NavLink>
                <NavLink style={{ textDecoration: 'none', color: 'rgba(0,0,0,0.7)', marginRight: '20px' }} activeClassName="active" onClick={logOutUser} to="/">LOGOUT</NavLink>
            </nav>
    } else {
        header =
            <nav className="float-right d-flex mr-5">
                <NavLink style={{ textDecoration: 'none', color: 'rgba(0,0,0,0.7)', marginRight: '20px' }} activeClassName="active" to="/login">LOGIN</NavLink>
                <NavLink style={{ textDecoration: 'none', color: 'rgba(0,0,0,0.7)', marginRight: '20px' }} activeClassName="active" to="/register">REGISTER</NavLink>
            </nav>
    }

    return (
        <div className="row shadow">
            <div className="col-sm-12" style={{ height: '25px', background: 'rgba(0,0,0,0.1)' }}>
                {header}
            </div>
            <div className="col-sm-3 py-3">
                <div className="row">
                    <div className="col-sm-5 pl-5">
                        <Link to="/">
                            <img src="/logo.png" width="100px" alt="Logo" />
                        </Link>
                    </div>
                    <div className="col-sm-7">
                        <div>
                            <b style={{ fontSize: '40px', color: 'rgba(255, 42,42, 0.9)' }}>Bedkot</b>
                        </div>
                        <div style={{ marginTop: '-5px' }}>
                            <b style={{ fontSize: '20px', color: 'rgba(0, 0, 142, 0.9)', textAlign: 'center' }}>Tours &amp; Travels</b>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-7 mt-4 py-3">
                <div className="input-group mb-3 searchbox">
                    <input type="search" className="form-control" placeholder="Search Destination" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <button style={{ border: 'none', background: 'green', color: 'white', padding: '0 20px' }}>
                            <Icons.FaSearch />
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-sm-2 mt-4 py-3">
                <a href="https://play.google.com/store/apps" target="_blank" rel="noreferrer" >
                    <img src="/android_icon.jpg" className="float-right pr-5" alt="Android Icon" height="40px" />
                </a>
            </div>
        </div>
    )
}
export default Header;