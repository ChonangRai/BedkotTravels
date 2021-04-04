import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';


export const Home = () => {
    const [destinations, setDestinations] = useState([]);
    let history = useHistory();

    const handleGetDestination = (id) => {
        history.push(`/destination/get-destination/${id}`);
    }

    useEffect(() => {
        axios.get('http://localhost:90/destination/all').then((response) => {
            setDestinations(response.data.data);
        }).catch((e) => {
            console.log(e.response);
        })
    }, []);

    const places = destinations.map(destination => (
        <div key={destination._id} className="col-sm-4 my-4">
            <button onClick={() => { handleGetDestination(destination._id) }} style={{ background: 'none', border: 'none' }} to={`/destination/get-destination/${destination._id}`}>
                <Card>
                    <Card.Img style={{ height: '250px' }} src={`http://localhost:90/destination/photo/${destination._id}`} alt={destination.dtitle} />
                    <Card.Header>
                        <h5 className="pl-1 d-block">{destination.dtitle}</h5>
                        <span className="pl-1 d-block">Starting at Rs. {destination.dcost}</span>
                    </Card.Header>
                </Card>
            </button>
        </div>
    ))
    return (
        <div className="container">
            <div className="row">
                {places}
            </div>
        </div>
    )
}
export default Home;