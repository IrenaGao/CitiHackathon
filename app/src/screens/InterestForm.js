import React, { Component } from 'react';
import { Button, Form, Dropdown } from 'semantic-ui-react';
import NumericInput from 'react-numeric-input';
import _ from 'lodash';
import faker from 'faker';
import states from '../data/states.json';
import NavBar from './NavBar';
import axios from 'axios';

const state = [
    
]

export default class InterestForm extends Component {

    constructor(props){
        super(props);
        const addressDefinitions = faker.definitions.address
        this.state={
          name: '',
          cost:0,
          location: [],
          quality:0,
          type:'',
          bagMat: '',
          bagUse: 0,
        }

    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeQuality = this.onChangeQuality.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeBagMat = this.onChangeBagMat.bind(this);
        this.onChangeBagUse = this.onChangeBagUse.bind(this);
    }
    
      onChangeName(event){
        this.setState({name : event.target.value});
      }
    
      onChangeCost(event){
        this.setState({
            event
        });
        this.setState({cost: event});
      }

      onChangeLocation(event){
          this.setState({
              location: event.target.value
          });
      }

      onChangeQuality(event){
          this.setState({
              quality: event.target.value
          });
      }

      onChangeType(event){
        this.setState({
            type: event.target.value
        });
    }

      onChangeBagMat(event){
          this.setState({
              bagMat: event.target.value
          })
      }

      onChangeBagUse(event){
        this.setState({
            event
        });
        this.setState({bagUse: event});
    }

    mapLocation(states) {
        return states.map((state) => {
            const latlong = []
            latlong.push(state.latitude)
            latlong.push(state.longitude)
            latlong.push(state.abbr)
            return <option value={latlong}>{state.state}</option>
        })
    }
    
      handleSubmit(event){
        event.preventDefault();
        const order = {
          name: this.state.name,
          cost: this.state.cost,
          location: this.state.location,
          quality: this.state.quality,
          type: this.state.type,
          bagMat: this.state.bagMat,
          bagUse: this.state.bagUse
        }

        console.log(order);

        axios.post('/result', {
            event : order
        }).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log(error.response.data);
        }).then(() => window.open('/Recommendations/'));

        const order2 = {
            location: this.state.location,
        }

        axios.post('/result2', {
            event: order2
        }).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log(error.response.data);
        })
    }

    render() {
        return (
            <div>
                {/* <NavBar/> */}
            <div style={{backgroundColor: 'white', paddingBottom: '4%', width: '80%', marginLeft: '10%', borderRadius: '20px', boxShadow: '5px 5px 10px #555555'}}>
                <p style={{marginTop: '5%', paddingTop: '6%', fontSize: '25px', marginBottom: '4%', textAlign: 'center'}}>What qualities are you looking for in a distributor?</p>
                <Form onSubmit={this.handleSubmit} style={{marginLeft: '25%'}}>
                    <div style={{marginTop: '3%', marginBottom: '1%'}}>What's the name of your restaurant?</div>
                    <input type="text" value={this.state.name} onChange={this.onChangeName} placeholder='Name' />
                    <div style={{marginTop: '3%', marginBottom: '1%'}}>How much money can you put in to running your restaurant annually (in thousands)?</div>
                    <NumericInput min={0} max={500} value={this.state.cost} onChange={this.onChangeCost} />
                    <Form.Field>
                        <div style={{marginTop: '3%', marginBottom: '1%'}}>Where are you located?</div>
                        <select value={this.state.location} onChange={this.onChangeLocation}>
                            {this.mapLocation(states)}
                        </select>                        
                    </Form.Field>
                    <div style={{marginTop: '3%', marginBottom: '1%'}}>How important is quality to you in terms of cost?</div>
                    <Form.Field control='select' value={this.state.quality} onChange={this.onChangeQuality}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                    </Form.Field>
                    <div style={{marginTop: '3%', marginBottom: '1%'}}>What type of food do you need?</div>
                    <input type="text" value={this.state.type} onChange={this.onChangeType} placeholder='Food' />
                    <div style={{marginTop: '3%', marginBottom: '1%'}}>What material do you use for your bags?</div>
                    <Form.Field control='select' value={this.state.bagMat} onChange={this.onChangeBagMat}>
                        <option>Polypropylene</option>
                        <option>Nylon</option>
                        <option>Polyester</option>
                        <option>Plastic</option>
                        <option>Paper</option>
                    </Form.Field>
                    <div style={{marginBottom: '1%', marginTop: '3%'}}>How many bags do you use annually?</div>
                    <NumericInput min={0} max={500} value={this.state.bagUse} onChange={this.onChangeBagUse} />
                    <input style={{marginLeft: '20%', marginTop: '5%', display: 'block', backgroundColor: '#94B0DA', borderColor: '#94B0DA', borderRadius: '12px', padding: '12px', color: 'white'}} type='submit' value='Compute my Recommendations!' />
                </Form>
              
            </div>
            </div>
        )};
}
