import React, { Component } from 'react';
import RecCard from '../components/RecCard';
import NavBar from './NavBar';
import { Card,Image, CardContent } from 'semantic-ui-react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';

import Quality from '../assets/medal.png';
import Coordinates from '../assets/placeholder.png';
import Reviews from '../assets/positive-review.png';
import Time from '../assets/chronometer.png';
import Duration from '../assets/durable.png';
import Cost from '../assets/money.png';

export class Recommendations extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            utensilmsg: '',
            utensilone: [],
            utensiltwo: [],
            utensilthree: [],
            groceryone: [],
            grocerytwo: [],
            grocerythree: [],
            groceryfour: [],
            groceryfive: [],
            allgroceries: [],
            allutensils: []
        }
    }

    async componentDidMount() {
        await axios.get('/getresult')
            .then(res => {
            console.log(res.data.recommendations);
            let utensils = res.data.recommendations;
            this.setState({
                name: utensils[0],
                utensilmsg: utensils[1],
                utensilone: utensils.slice(2, 7),
                utensiltwo: utensils.slice(7, 12),
                utensilthree: utensils.slice(12, 17)
            })
        }).catch(function(error) {
            console.log(error.response.data);
        })

        await axios.get('/getresult2')
            .then(res => {
            console.log(res.data.recommendations2);
            let groceries = res.data.recommendations2;
            this.setState({
                groceryone: groceries.slice(0, 5),
                grocerytwo: groceries.slice(5, 10),
                grocerythree: groceries.slice(10, 15),
                groceryfour: groceries.slice(15, 20),
                groceryfive: groceries.slice(20, 25)
            })
        }).catch(function(error) {
            console.log(error.response.data);
        })

        const groctemp = []
        groctemp.push(this.state.groceryone);
        groctemp.push(this.state.grocerytwo);
        groctemp.push(this.state.grocerythree);
        groctemp.push(this.state.groceryfour);
        groctemp.push(this.state.groceryfive);
        this.setState({allgroceries: groctemp});

        const utentemp = []
        utentemp.push(this.state.utensilone);
        utentemp.push(this.state.utensiltwo);
        utentemp.push(this.state.utensilthree);
        this.setState({allutensils: utentemp});
    }

    mapGroceries(groceries) {
        return groceries.map(grocery => {
            return <Card style={{width: '45%', marginLeft: '25%', marginTop: '3%', backgroundColor: 'white', padding: '3%', boxShadow: '5px 5px 10px #555555', borderRadius: '20px'}}>
                    <CardContent>
                        <p style={{fontWeight: 600, fontSize: '25px', color: '#505A5B'}}>{grocery[0]}</p>
                        <span style={{color: '#555555'}}>
                        <p><span style={{color: '#8F91A2'}}>Coordinates</span> <img src={Coordinates} style={{width: '4%', marginRight: '4%'}}/> <span style={{color: ''}}>{grocery[1]}, {grocery[2]}</span></p>
                        <p><span style={{color: '#8F91A2'}}>Product Quality (out of 5)</span> <img src={Quality} style={{width: '4%', marginRight: '4%'}}/> {grocery[3]}</p>
                        <p><span style={{color: '#8F91A2'}}>Reviews</span> <img src={Reviews} style={{width: '4%', marginRight: '4%'}}/> {grocery[4]}</p>
                        </span>
                    </CardContent>
            </Card>
        })
    }

    mapUtensils(utensils) {
        return utensils.map(utensil => {
            return <Card style={{width: '45%', marginLeft: '25%', marginTop: '3%', backgroundColor: 'white', padding: '3%', boxShadow: '5px 5px 10px #555555', borderRadius: '20px'}}>
                        <CardContent>
                           <p style={{fontWeight: 600, fontSize: '25px', color: '#505A5B'}}>{utensil[0]}</p> 
                           <span style={{color: '#555555'}}>
                           <p><span style={{color: '#8F91A2'}}>Distance Away from You</span> <img src={Coordinates} style={{width: '4%', marginRight: '4%'}}/>{utensil[1]} m</p>
                           <p><span style={{color: '#8F91A2'}}>Can last you for </span> <img src={Time} style={{width: '4%', marginRight: '4%'}}/> {utensil[2]} days</p>
                           <p><span style={{color: '#8F91A2'}}>Price per 100 items</span> <img src={Cost} style={{width: '4%', marginRight: '4%'}}/> ${utensil[3]}</p>
                           <p><span style={{color: '#8F91A2'}}>Time it takes to deliver</span> <img src={Duration} style={{width: '4%', marginRight: '4%'}}/> {utensil[4]} days</p>
                           </span>
                        </CardContent>
                </Card>
        })
    }

    render() {
        return (
            <div>
            {/* <NavBar/> */}
            <div className="rec">
                {/* <h2>Here is a list of our resataurants meal recommendations</h2> */}
                {/* <RecCard
                className="rec__foods" 
                foodName='lassangne' 
                image='https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made.jpg'
                storeName = 'Store A'
                price = '15'
                deliveryTime = '5 minutes'/> */}
                {/* <div style={{marginTop: '5%'}}> */}
                    <p style={{fontSize: '25px', textAlign: 'center', color: '#343F3E', fontWeight: 500}}>Here are some recommended grocery store distributors for {this.state.name}! :)</p>
                    {this.mapGroceries(this.state.allgroceries)}
                {/* </div> */}
                <div style={{marginTop: '10%'}}>
                <p style={{fontSize: '25px', textAlign: 'center', color: '#343F3E', fontWeight: 500}}>Here are some recommended utensil store distributors! :)</p>
                    <p style={{textAlign: 'center', fontSize: '20px', marginTop: '2%'}}>{this.state.utensilmsg}</p>
                    {this.mapUtensils(this.state.allutensils)}
                </div>
            </div>
            </div>
        )
    }
}

export default Recommendations
