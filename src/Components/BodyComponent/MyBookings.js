import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
export const MyBookings = () => {


    const [bookings, setBookings] = useState([]);

    //Getting all bookings
    useEffect(() => {
        axios.get(`http://localhost:90/customer-booking/all`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('user-token') } }).then((response) => {
            setBookings(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])



    const renderCards = bookings.map(booking => (

        <BookCard key={booking.index} booking={booking} />

    ))

    return (
        <div className="container">
            <h3 className="my-4">My bookings</h3>
            <div className="row mt-5">
                {renderCards}
            </div>
        </div>
    )
}
