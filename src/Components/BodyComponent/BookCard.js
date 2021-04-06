import { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';


export const BookCard = (props) => {
    var booking = props.booking;

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState();
    const [varient, setVarient] = useState();

    console.log(localStorage.getItem('user-token'))

    const [place, setPlace] = useState([]);

    const handleCancel = (id) => {
        axios.put(`http://localhost:90/booking/cancel/${id}`, {}, { headers: { Authorization: 'Bearer ' + localStorage.getItem('user-token') } }).then((response) => {
            setShow(true);
            setMessage('Successfully canceled');
            setVarient('success');
        }).catch((error) => {
            setShow(true);
            setMessage('Cancel failed');
            setVarient('danger');
            console.log(error);
        })
    }
    //Delete Bookings
    const handleDelete = () => {
        axios.delete(`http://localhost:90/booking/delete/${booking._id}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('user-token') } }).then((response) => {
            setShow(true);
            setVarient('success');
            setMessage('Successfully deleted.');
            window.location.assign('/')
        }).catch((error) => {
            setShow(true);
            setVarient('danger');
            setMessage('Delete failed. Please contact admin.');
            console.log(error)
        })
    }

    //Get destination details to show in card header
    useEffect(() => {
        axios.get(`http://localhost:90/destination/get-destination/${booking.destinationId}`).then((place) => {
            setPlace(place.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <div className="col-md-4" key={booking.index}>
            <Alert show={show} className="mt-3" variant={varient} onClose={() => setShow(false)} dismissible>{message}</Alert>

            <div className="card">
                <div className="card-header">
                    <h5>{place.dtitle}</h5>
                </div>
                <div className="card-body">
                    <b>Package: </b> {booking.package} <span className={booking.status === "cancelled" ? "badge badge-secondary float-right" : 'd-none'}>CANCELLED</span> <br />
                    <b>Travelling date: </b>{booking.bookDate} <br />
                    <div className={booking.package === "Family" ? '' : 'd-none'}>
                        <b >No. of Adults: </b> {booking.adult} <br />
                        <b >No. of Children: </b> {booking.children} <br />
                    </div>
                    <b>Total cost: </b> {booking.cost}  <br />
                </div>
                <div className="card-footer">
                    <button disabled={booking.status === "cancelled" ? true : false}
                        onClick={() => handleCancel(booking._id)}
                        className="btn btn-outline-secondary mr-2">CANCEL</button>
                    <button onClick={() => handleDelete(booking._id)} className="btn btn-outline-danger">DELETE</button>
                </div>
            </div>
        </div>
    )
}
export default BookCard;