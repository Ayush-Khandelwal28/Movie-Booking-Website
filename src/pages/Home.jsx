import React from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import './Home.scss';

function Home(){
    const location = useLocation()
    return(
        <div classname="homepage">
        <h1>Hello {location.state.id} and welcome to the home</h1>
        </div>
    )

}

export default Home;
