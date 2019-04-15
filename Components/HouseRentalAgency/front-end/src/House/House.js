import React from 'react'
import './House.css'

const House = (props)=> (
    <div className="House" onMouseEnter={()=>props.houseHoverEvent(props.id)}>
        <img src={props.imageUrl} alt={'house phoho' + props.id}/>
    </div>
)

export default House