import { useParams, Link, useNavigate } from 'react-router-dom'
// import axios from '../../config'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material';


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

        <p><b>Name: </b> {restaurant.name} </p>
        <p><b>Address: </b> {restaurant.address.street} </p>
        <p><b>Building: </b> {restaurant.address.building} </p>
        <p><b>Cuisine: </b> {restaurant.cuisine} </p>
        <Link to="edit" >Edit</Link>
        <Button onClick={() => Delete(restaurant._id)} variant="contained" color="error" >Delete</Button>
      </div>
    )
  }
  
  export default Show