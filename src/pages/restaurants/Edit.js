import { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, MenuItem, FormControl, Select, InputLabel, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom'

// import { LocalizationProvider, DateTimePicker } from '@mui/lab'

// import AdapterMoment from '@mui/lab/AdapterMoment'


const Edit = () => {

  let navigate = useNavigate()
  let { _id } = useParams()

  const [form, setForm] = useState({})
  const [restaurant, setRestaurant] = useState({})

  let token = localStorage.getItem('auth_token')

  useEffect(() => {
      axios.get(`http://localhost:8001/restaurants/${_id}`, {
          headers: {
              "Authorization": `Bearer ${token}`
          }
      })
            .then(response => {
              console.log(response.data)
              setRestaurant(response.data.restaurant)
              // setForm(response.data)
            })
            .catch(err => {
              console.log(`Error: ${err}`)
            })
  }, [_id, token])

  useEffect(() => {
    setForm({
      name: restaurant.name,
      // address: restaurant.address,
      // address: {
      //   building: restaurant.address.building,
      // //  coord: {
      // //         coord: restaurant.address.coord
      // // },
      //   zipcode: restaurant.address.zipcode,
      //   street: restaurant.address.street
      // },
      cuisine: restaurant.cuisine,
      borough: restaurant.borough
      // date: restaurant.date
    })
  }, [restaurant])

  if(!restaurant) return null


  const handleForm = e => {

    setForm(prevState => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))

  }

  const submitForm = () => {
    console.log(form)

    let token = localStorage.getItem('auth_token')

    axios.put(`http://localhost:8001/restaurants/${_id}`, form, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
        .then(response => {
          console.log(response.data)
          navigate(`/restaurants/${_id}`)
        })
        .catch(err => console.log(err))
  }
  
  const Loading = () => {
    return <div className="form-group">Loading...</div>
  }
    return (
      <div>
        <h2>Edit</h2>

        {/* {
          form.name ? ( <div className="form-group">
          <TextField variant="filled" label="Name" name="name" onChange={handleForm} value={form.name} InputLabelProps={{
          shrink: true,
        }} /> 
        </div>


          ) : (<loading/>
            
          )
        } */}

        {
          form.name ? (
        <div className="form-group">
          <TextField variant="filled" label="Name" name="name" onChange={handleForm} value={form.name} InputLabelProps={{shrink: true,}} /> 
        </div>
          ) : (<Loading />) 
          }

{
          form.borough ? (
        <div className="form-group">
          <TextField variant="filled" label="Borough" name="borough" onChange={handleForm} value={form.borough} InputLabelProps={{shrink: true,}} /> 
        </div>
          ) : (<Loading />) 
          }

{/* {
          form.restauraunt.address.building ? (
        <div className="form-group">
          <TextField multiline rows="4" variant="filled" label="Address" name="address" value={form.restaurant.address.building} onChange={handleForm} InputLabelProps={{
          shrink: true,
        }} /> 
        </div>
        ) : (<Loading />) 
      } */}

{
          form.cuisine ? (
        <div className="form-group">
        <FormControl variant="filled" fullWidth >
          <InputLabel id="cuisine-select-label">Cuisine</InputLabel>
          <Select labelId="cuisine-select-label" onChange={handleForm} label="Cuisine" name="cuisine" value={form.cuisine} >
            <MenuItem value="Irish">Irish</MenuItem>
            <MenuItem value="Indian">Indian</MenuItem>
            <MenuItem value="Chinese">Chinese</MenuItem>
            <MenuItem value="Italian">Italian</MenuItem>
            <MenuItem value="Japanese">Japanese</MenuItem>
            <MenuItem value="Delicatessen">Delicatessen</MenuItem>
           
          </Select>
        </FormControl>
        </div>
         ) : (<Loading />) 
        }
        {/* <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Start Date"
            name="start_date"
            onChange={handleForm}
          />
        </LocalizationProvider> */}

{/* {
          form.date ? (
<div className="form-group">

<TextField
id="date"
label="Date"
type="date"
variant="filled"
name="date"
onChange={handleForm}
value={form.date}
// defaultValue="2017-05-24T10:30"
InputLabelProps={{
  shrink: true,
}}
/>
</div>
  ) : (<Loading />) 
} */}

        

        <Button onClick={submitForm} variant="contained">Submit</Button>
        
      </div>
    )
  }
  
  export default Edit