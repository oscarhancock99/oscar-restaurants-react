import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Container} from '@mui/material/';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const Index = () => {

    const [restaurants, setRestaurants] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:8001/restaurants')
             .then(response => {
                 console.log(response.data)
                 setRestaurants(response.data.restaurants)
             })
             .catch(err => {
                 console.log(`Error: ${err}`)
             })
    }, [])

    if(!restaurants) return null

    const restaurantsList = restaurants.map(restaurant => {
        return (
            <Card style={{ margin: '10px' }} sx={{ minWidth: 275 }}>
                <CardContent>
                <div key={restaurant._id}>
                <Typography variant="h5" component="div"> Name: {restaurant.name}</Typography>
                    <p><b>Type: </b> {restaurant.cuisine} </p>
                    <p><b>Street: </b> {restaurant.address.street} </p>
                    <CardActions>
                        <Button size="small"> <Link to={`/restaurants/${restaurant._id}`}>More Info</Link></Button>
                    </CardActions>
                </div>
                </CardContent>
            </Card>
        )
    })

    return (
      <Container>
        <h2>Restaurants</h2>
        <p>This is the Restaurants Index page</p>
        <Link to="create">Create</Link>
        { restaurantsList }
        </Container>
    )
  }

  export default Index