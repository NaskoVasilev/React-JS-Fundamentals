import React from 'react'
import './HouseDetails.css'

const HouseDetails = (props)=>(
    <div className="HouseDetails">
        <h2>{props.type}</h2>
        <div className="image">
            <img src={props.imageUrl} alt="photo"/>
        </div>
        <p>Description : {props.description}</p>
        <p>Price $ :{props.price}</p>
    </div>
)

export default HouseDetails