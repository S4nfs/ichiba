import React from 'react'
import "./style.css"
const Card = (props) => {
    return (
        <div className='card' {...props}>
            <div className="cardHeader">
                {
                    props.headerLeft && <div>{props.headerLeft}</div>

                }
                {
                    props.headerRight && props.headerRight

                }
            </div>
            {props.children}
        </div>
    )
}

export default Card