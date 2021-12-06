import { useParams } from 'react-router-dom'
// import axios from '../../config'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'

const Show = () => {
    let { _id } = useParams()
    const [restaurant, setRestaurant] = useState(null)

    // let token = localStorage.getItem('token')

    useEffect(() => {
        axios.get(`http://localhost:8001/restaurants/${_id}`, {
            // headers: {
            //     "Authorization": `Bearer ${token}`
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

    return (
      <div>
        <h2>This is the restaurants show page: {_id}</h2>

        <p><b>Name: </b> {restaurant.name} </p>
        <p><b>Address: </b> {restaurant.address.street} </p>
        <p><b>Building: </b> {restaurant.address.building} </p>
        <p><b>Cuisine: </b> {restaurant.cuisine} </p>
        <Link to="edit" >Edit</Link>
      </div>
    )
  }
  
  export default Show