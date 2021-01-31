import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function Dashboard(props) {
    return(
        <div style={{marginTop: '5%'}}>
            Here are some recommended distributors based on your restaurant's qualities:
            <Card style={{width: '35%', marginLeft: '33%', marginTop: '3%'}}>
                <CardContent>
                    <p>About your Company: </p>
                    <p>Distributor Name</p>
                    <p>Match: %</p>
                    <p>Product Costs: </p>
                    <p>Location: </p>
                    <p>Product quality: </p>
                    <p>Products sold: </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default Dashboard;