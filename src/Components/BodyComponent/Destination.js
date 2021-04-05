import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

export const Destination = () => {

    const { id } = useParams();
    let history = useHistory();

    const [destination, setDestination] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:90/destination/get-destination/${id}`).then((place) => {
            setDestination(place.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    if(localStorage.getItem('user-token')){
        var displayAccordingToUser = <button className="btn btn-success px-4 mb-3">BOOK NOW</button>
    }else if(localStorage.getItem('admin-token')){
        displayAccordingToUser=
        <>
            <button className="btn btn-outline-primary px-4 mb-3">EDIT</button> 
            <button className="btn btn-outline-danger px-4 mb-3 ml-3">DELETE</button> 
        </>
    }else{
        displayAccordingToUser = <button onClick={()=>{history.push('/login')}} className="btn btn-secondary px-4 mb-3">LOG IN TO BOOK NOW</button>
    }

    return (
        <div className="container">
            <div className="card card0 border-0 mt-5 p-5">
                <div className="row">
                    <div className="col-md-4">
                        <img src={`http://localhost:90/destination/photo/${id}`} alt={destination.dtitle} width="100%" />
                    </div>
                    <div className="col-md-8">
                        <h1>{destination.dtitle}</h1>
                        Package:
                        <input type='radio' checked={booking.package==="Individual"} onChange={handleBooking}
                        name="package" value="Individual" id="one" />
                        <label htmlFor="one">Individual</label>
                        <input type='radio' checked={booking.package==="Couple"} onChange={handleBooking}
                        name="package" value="Couple" id="two" />
                        <label htmlFor="two">Couple</label>
                        <input type='radio' checked={booking.package==="Family"} onChange={handleBooking}
                        name="package" value="Family" id="fam" />
                        <label htmlFor="fam">Family</label>
                        <h5>Price: Rs. {destination.dcost}</h5>
                        {displayAccordingToUser}
                        <p>{destination.ddescription}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Destination;