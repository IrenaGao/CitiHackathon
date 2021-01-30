import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

export default class InterestForm extends Component {

    constructor(props){
        super(props);
        this.state={
          cost:'',
          location:'',
          quality:'',
          type:''
        }
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeQuality = this.onChangeQuality.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
      }
    
      onChangeCost(event){
        this.setState({
            cost: event.target.value
        });
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
    
      handleSubmit(event){
        event.preventDefault();
        const order = {
          // id: nextId(),
          cost: this.state.cost,
          location: this.state.location,
          quality: this.state.quality,
          type: this.state.type
        }
        console.log(order);

    render() 
        return (
            <div>
                <h2>Interest</h2>

                <Form>
                    <Form.Field label = 'Cost Requirement' control='select'>
                        <option>$5-$10</option>
                        <option>$10-$15</option>
                        <option>$15-$20</option>
                    </Form.Field>
                    <Form.Field>
                        <label>Location</label>
                        <input placeholder='Location' />
                    </Form.Field>
                    <Form.Field label = 'Quality' control='select'>
                        <option>Low</option>
                        <option>High</option>
                    </Form.Field>
                    <Form.Field label = 'Type' control='select'>
                        <option>Vegetarian</option>
                        <option>Chinese</option>
                        <option>Indian</option>
                    </Form.Field>
                    
                    <Button type='submit'>Submit</Button>
                </Form>
              
            </div>
        );
    }
}
