import React, { Component } from 'react';
import RecCard from '../components/RecCard';
import NavBar from './NavBar';

export class Recommendations extends Component {
    render() {
        return (
            <div>
            <NavBar/>
            <div className="rec">
                <h2>Here is a list of our resataurants meal recommendations</h2>
                <RecCard
                className="rec__foods" 
                foodName='lassangne' 
                image='https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made.jpg'
                storeName = 'Store A'
                price = '15'
                deliveryTime = '5 minutes'/>
                <RecCard
                className="rec__foods" 
                foodName='lassangne' 
                image='https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made.jpg'
                storeName = 'Store B'
                price = '15'
                deliveryTime = '3 minutes'/>
                <RecCard
                className="rec__foods" 
                foodName='lassangne' 
                image='https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made.jpg'
                storeName = 'Store C'
                price = '15'
                deliveryTime = '3 minutes'/>
                <RecCard
                className="rec__foods" 
                foodName='lassangne' 
                image='https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made.jpg'
                storeName = 'Store D'
                price = '15'
                deliveryTime = '1 minutes'/>
                <RecCard
                className="rec__foods" 
                foodName='lassangne' 
                image='https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made.jpg'
                storeName = 'Store A'
                price = '15'
                deliveryTime = '6 minutes'/>
            </div>
            </div>
        )
    }
}

export default Recommendations
