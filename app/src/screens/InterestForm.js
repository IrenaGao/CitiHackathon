import React, { Component } from 'react';
import { Button, Form, Dropdown } from 'semantic-ui-react';
import NumericInput from 'react-numeric-input';
import _ from 'lodash';
import faker from 'faker';
import states from '../data/states.json';

const state = [
    
]

export default class InterestForm extends Component {

    constructor(props){
        super(props);
        const addressDefinitions = faker.definitions.address
        this.state={
          cost:0,
          location:'',
          quality:'',
          type:'',
          stateOptions: _.map(addressDefinitions.state, (state, index) => ({
            key: addressDefinitions.state_abbr[index],
            text: state,
            value: addressDefinitions.state_abbr[index],
          }))
        }

    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeQuality = this.onChangeQuality.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
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

    mapLocation(states) {
        return states.map((state) => {
            return <option value={state.name}>{state.name}</option>
        })
    }
    
      handleSubmit(event){
        event.preventDefault();
        const order = {
          cost: this.state.cost,
          location: this.state.location,
          quality: this.state.quality,
          type: this.state.type
        }
        console.log(order);
    }
    

    render() {
        return (
            <div style={{backgroundColor: 'white', paddingBottom: '4%', width: '80%', marginLeft: '10%', borderRadius: '20px', boxShadow: '5px 5px 10px #555555'}}>
                <p style={{marginTop: '5%', paddingTop: '6%', fontSize: '25px', marginBottom: '4%', textAlign: 'center'}}>What qualities are you looking for in a distributor?</p>
                <Form onSubmit={this.handleSubmit} style={{marginLeft: '25%'}}>
                    <div style={{marginBottom: '1%'}}>How much money can you put in to running your restaurant annually (in thousands)?</div>
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
                    <div style={{marginTop: '3%', marginBottom: '1%'}}>What food do you need?</div>
                    <input type="text" value={this.state.type} onChange={this.onChangeType} placeholder='Food' />
                    <input style={{marginLeft: '20%', marginTop: '5%', display: 'block', backgroundColor: '#94B0DA', borderColor: '#94B0DA', borderRadius: '12px', padding: '12px', color: 'white'}} type='submit' value='Compute my Recommendations!' />
                </Form>
              
            </div>
        )};
}
