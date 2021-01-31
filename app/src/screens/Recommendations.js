import React, { Component } from 'react';
import { Card,Image } from 'semantic-ui-react';
import { Button, Form } from 'semantic-ui-react';

export class Recommendations extends Component {
    render() {
        return (
            <div>
            <Card.Group>
                <Card>
                    <Image/>
                    <Card.Content>
                        <h3>Info about the food</h3>
                    </Card.Content>
                    
                    <Card.Content extra>
                        <Button basic color='green'>
                            Order Now
                        </Button>
                    </Card.Content>

                </Card>
            </Card.Group>
            </div>
        )
    }
}

export default Recommendations
