import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

export const Destination = () => {

    const { id } = useParams();
    let history = useHistory();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState();
    const [varient, setVarient] = useState('success');

    const [famForm, setFamForm] = useState(false);

    const [destination, setDestination] = useState([]);

    const [cost, setCost] = useState(0);

    const [booking, setBooking] = useState({
        customerId: '',
        destinationId: id,
        package: 'Individual',
        adult: 1,
        children: 0,
        bookDate: '',
        discount: 10,
        cost: ''
    })

    const handleChange = (e) => {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value
        })
    }

    const handleBookingIndividual = (e) => {
        setFamForm(false);
        setBooking({
            ...booking,
            package: 'Individual',
            adult: 1,
            children: 0
        })

    }
    const handleBookingCouple = (e) => {
        setFamForm(false);
        setBooking({
            ...booking,
            adult: 2,
            package: 'Couple',
            children: 0
        })
    }
    const handleBookingFam = (e) => {
        setFamForm(true);
        setBooking({
            ...booking,
            adult: 1,
            package: 'Family',
            children: 1
        })
    }
    const handleAdultCounter = (n) => {
        if ((booking.adult + n) < 0) {
            return;
        }
        setBooking({
            ...booking,
            adult: booking.adult + n,
        })
    }

    const handleChildCounter = (n) => {
        if ((booking.children + n) < 0) {
            return;
        }
        setBooking({
            ...booking,
            children: booking.children + n
        })
    }

    useEffect(() => {
        if (booking.package === "Individual") {
            setCost(destination.dcost)
        } else if (booking.package === "Couple") {
            var cd = destination.dcost * 2
            var dc = cd * booking.discount / 100
            setCost(cd-dc)
        } else if (booking.package === "Family") {
            var a = destination.dcost * booking.adult;
            var d = destination.dcost * booking.children;
            var c = d / 2;
            setCost(a+c)
        }
    }, [booking.package, destination.dcost, booking.adult, booking.children])


    const submitBooking = () => {
        axios.post('http://localhost:90/booking/add', {...booking, cost:cost} , { headers: { Authorization: 'Bearer ' + localStorage.getItem('user-token') } }).then((response) => {
            setBooking(response.data.data)
            setShow(true);
            setVarient('success');
            setMessage('Booking successful.');
            window.location.assign('/');
        }).catch((error) => {
            setShow(true);
            setVarient('danger');
            setMessage('Booking failed. Please contact admin.');
            console.log(error)
        })
    }

    //Getting all destinations
    useEffect(() => {
        axios.get(`http://localhost:90/destination/get-destination/${id}`).then((place) => {
            setDestination(place.data.data);
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    //Getting current userInfo
    useEffect(() => {
        axios.get(`http://localhost:90/customer/profile`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('user-token') } }).then((response) => {
            setBooking({
                ...booking,
                customerId: response.data.data._id
            })
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const handleDelete = () => {
        axios.delete(`http://localhost:90/destination/delete/${destination._id}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('admin-token') } }).then((response) => {
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

    const handleEdit = (_id) => {
        window.location.assign(`/destination/edit-destination/${_id}`);
    }


    if (localStorage.getItem('user-token')) {
        var displayAccordingToUser = <button className="btn btn-success px-4 mb-3" onClick={submitBooking}>BOOK NOW</button>
    } else if (localStorage.getItem('admin-token')) {
        displayAccordingToUser =
            <>
                <button className="btn btn-outline-primary px-4 mb-3" onClick={() => handleEdit(id)}>EDIT</button>
                <button className="btn btn-outline-danger px-4 mb-3 ml-3" onClick={handleDelete} >DELETE</button>
            </>
    } else {
        displayAccordingToUser = <button onClick={() => { history.push('/login') }} className="btn btn-secondary px-4 mb-3">LOG IN TO BOOK NOW</button>
    }

    return (
        <div className="container">
            <Alert show={show} className="mt-3" variant={varient} onClose={() => setShow(false)} dismissible>{message}</Alert>
            <div className="card card0 border-0 mt-5 p-5">
                <div className="row">
                    <div className="col-md-4">
                        <img src={`http://localhost:90/destination/photo/${id}`} alt={destination.dtitle} width="100%" />
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-sm-12">
                                <h1>{destination.dtitle}</h1>
                            </div>
                            <div className="col-sm-12">
                                <h6>Package:</h6>
                            </div>
                            <div className="col-sm-6 ml-4 mb-2 form-check form-check-inline">
                                <input type='radio' className="form-check-input" checked={booking.package === "Individual"}
                                    onChange={handleBookingIndividual} name="package" value="Individual" id="one" />
                                <label htmlFor="one" className="form-check-label">Individual</label>
                                <input type='radio' checked={booking.package === "Couple"} className="form-check-input"
                                    onChange={handleBookingCouple} name="package" value="Couple" id="two" />
                                <label className="form-check-label" htmlFor="two">Couple</label>
                                <input type='radio' className="form-check-input" checked={booking.package === "Family"}
                                    onChange={handleBookingFam} name="package" value="Family" id="fam" />
                                <label className="form-check-label" htmlFor="fam">Family/Group</label>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-6" hidden={!famForm}>
                                {/* <div className="col-sm-8" > */}
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h6>Number of adults:</h6>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="d-flex">
                                            <button onClick={() => handleAdultCounter(-1)} className="btn btn-outline-danger">-</button>
                                            <input name="adult" onChange={handleChange} type="text" value={booking.adult} className="form-control" />
                                            <button onClick={() => handleAdultCounter(1)} className="btn btn-outline-success">+</button>
                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>
                            <div className="col-md-6" hidden={!famForm}>
                                {/* <div className="col-md-8" > */}
                                <div className="row">
                                    <div className="col-sm-7">
                                        <h6>Number of children: <br /> <small>(Age 15 years and below)</small></h6>
                                    </div>
                                    <div className="col-sm-5">
                                        <div className="d-flex">
                                            <button onClick={() => handleChildCounter(-1)} className="btn btn-outline-danger">-</button>
                                            <input name="children" type="text" onChange={handleChange} value={booking.children} className="form-control" />
                                            <button onClick={() => handleChildCounter(1)} className="btn btn-outline-success">+</button>
                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>

                        </div>
                        <div className="row mb-2">
                            <div className="col-lg-7">
                                <div className="row">
                                    <div className="col-sm-5">
                                        <h6>Travelling date: </h6>
                                    </div>
                                    <div className="col-sm-7">
                                        <input type="date" name="bookDate" value={booking.bookDate} onChange={handleChange} required={true} className="form-control com-sm-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-sm-4">
                                <h6 className="pb-2">Total cost: Rs. {cost}</h6>
                            </div>
                            <div className={localStorage.getItem('admin-token') ? "col-sm-8 d-flex" : 'd-none'}>
                                <h6>Discount</h6>
                                <input className="form-control col-sm-2 ml-2" onChange={handleChange} name="discount" value={booking.discount} type="text" />
                            </div>
                        </div>
                        {displayAccordingToUser}
                        <p>{destination.ddescription}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Destination;