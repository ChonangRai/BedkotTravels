import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';


export const Home = () => {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:90/destination/all').then((response) => {
            setDestinations(response.data.data);
        }).catch((e) => {
            console.log(e.response);
        })
    }, []);

    const places = destinations.map(destination => (
        <div key={destination._id} className="col-sm-3 m-2">
            <Card>
                <Card.Img style={{ height: '250px' }} src={`http://localhost:90/destination/photo/${destination._id}`} alt={destination.dtitle} />
                <Card.Header>
                    <p className="px-2">{destination.dtitle}</p>
                    <p className="px-4">{destination.dcost}</p>
                </Card.Header>
            </Card>
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