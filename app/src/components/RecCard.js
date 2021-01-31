import React from 'react';
import './RecCard.css'
import { Button } from 'semantic-ui-react';


function RecCard ({image,storeName, foodName, price, deliveryTime}) {
    return (
        <div className="food">
            <img className='food__thumbnail' src={image} alt='foodeoImg'/>
            <div className="food__info">
                <div className="food__text">
                    <h3>{storeName}</h3>
                    <h4>{foodName}</h4>
                    <p>${price} . {deliveryTime}</p>
                    <p>
                    <Button style={{backgroundColor: 'blue', color: 'white', borderRadius: '5px'}} >Order now</Button>
                    </p>
                </div>
            </div>
        </div>
    )
}


export default RecCard;