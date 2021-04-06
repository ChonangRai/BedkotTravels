import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export const EditDestination = () => {
    if (!localStorage.getItem('admin-token')) {
        window.location.assign('/')
    }

    const { id } = useParams();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState();
    const [varient, setVarient] = useState('success');


    const [destination, setDestination] = useState({
        dtitle: '',
        dcost: '',
        ddescription: '',
        dimage: ''
    })

    useEffect(() => {
        axios.get(`http://localhost:90/destination/get-destination/${id}`).then((place) => {
            setDestination(place.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])


    const handleChange = (e) => {
        setDestination({
            ...destination,
            [e.target.name]: e.target.value
        })
    }

    const fileChange = (e) => {

        if (e.target.files.length) {
            destination.dimage = e.target.files[0]
        } else {
            destination.dimage = null
        }
    }


    const saveDestination = (e) => {
        e.preventDefault();
        var data = new FormData()
        for (let key in destination) {
            data.append(key, destination[key])
        }
        axios.put(`http://localhost:90/destination/update/${id}`, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem('admin-token') } }).then((response) => {
            setShow(true);
            setVarient('success');
            setMessage('Destination added successfully');
            window.location.assign('/');
        }).catch((err) => {
            setShow(true);
            setVarient('danger');
            setMessage('Something went wrong. Please check again.');
            console.log(err.response)
        })
    }


    return (
        <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
            <Alert show={show} className="mt-3" variant={varient} onClose={() => setShow(false)} dismissible>{message}</Alert>
            <div className="card card0 border-0">
                <div className="row d-flex">
                    <div className="col-lg-6">
                        <div className="card1 pb-5">
                            <div className="row"> <div className="logo"></div> </div>
                            <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                                <label htmlFor="edit-image">
                                    <img src={`http://localhost:90/destination/photo/${id}`} title="Click to change image" className="image edit-image" alt={destination.dtitle} />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card2 card border-0 px-4 py-5">
                            <div className="row px-3"> <label className="mb-1">
                                <h6 className="mb-0 text-sm">Destination title: </h6>
                            </label> <input className="mb-4" type="text" name="dtitle" placeholder="1 Night stay @ Sauraha" value={destination.dtitle} onChange={handleChange} /> </div>
                            <div className="row px-3"> <label className="mb-1">
                                <h6 className="mb-0 text-sm">Starting price:</h6>
                            </label> <input type="text" className="mb-4" name="dcost" placeholder="5000" value={destination.dcost} onChange={handleChange} /> </div>
                            <div className="row px-3"> <label className="mb-1">
                                <h6 className="mb-0 text-sm">Destination ddescription:</h6>
                            </label> <textarea type="text" className="mb-4" name="ddescription" placeholder="This package contains 1 night stay, dinner and breakfast" value={destination.ddescription} onChange={handleChange} /> </div>
                            <div className="row px-3 d-none"> <label className="mb-1">
                            </label> <input className="mb-4" type="file" name="dimage" id="edit-image" onChange={fileChange} /> </div>

                            <div className="row mb-3 px-3"> <button onClick={saveDestination} className="btn btn-primary px-5">SAVE</button> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditDestination;