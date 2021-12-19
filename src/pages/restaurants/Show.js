import { useParams, Link, useNavigate } from 'react-router-dom'
// import axios from '../../config'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';


const Show = () => {
    let { _id } = useParams()
    let navigate = useNavigate()
    const [restaurant, setRestaurant] = useState(null)

    let auth_token = localStorage.getItem('auth_token')

    useEffect(() => {
        axios.get(`http://localhost:8001/restaurants/${_id}`, {
            // headers: {
            //     "Authorization": `Bearer ${auth_token}`
            // }
        })
             .then(response => {
                console.log(response.data)
                setRestaurant(response.data.restaurant)
             })
             .catch(err => {
                console.log(`Error: ${err}`)
             })
    }, [_id ])

    if(!restaurant) return null

    const Delete = () => {
      axios.delete(`http://localhost:8001/restaurants/delete/${_id}`, {
            headers: {
                "Authorization": `Bearer ${auth_token}`
            }
        })

        .then(response => {
          console.log(response.data)
          navigate('/restaurants')
       })
       .catch(err => {
          console.log(`Error: ${err}`)
       })
    }

    return (
      <div>
        <h2>This is the restaurants show page: {_id}</h2>
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        // alt="green iguana"
      />
      <CardContent>
        {/* <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
        <Typography gutterBottom variant="h5"><p><b>Name: </b> {restaurant.name} </p>
        </Typography>
        <Typography variant="h6" color="text.secondary"><p><b>Address: </b> {restaurant.address.street} </p>
        </Typography>
        <Typography variant="h6" color="text.secondary"><p><b>Building: </b> {restaurant.address.building} </p>
        </Typography>
        <Typography variant="h6" color="text.secondary"><p><b>Cuisine: </b> {restaurant.cuisine} </p>
        </Typography>
        <Link to="edit" >Edit</Link>
        <Button onClick={() => Delete(restaurant._id)} variant="contained" color="error" >Delete</Button>
      </CardContent>
    
    </Card>

        
      </div>
    )
  }
  
  export default Show