import { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, MenuItem, FormControl, Select, InputLabel, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom'

// import { LocalizationProvider, DateTimePicker } from '@mui/lab'

// import AdapterMoment from '@mui/lab/AdapterMoment'


const Edit = () => {

  let navigate = useNavigate()
  let { id } = useParams()

  const [form, setForm] = useState({})
  const [restaurant, setRestaurant] = useState({})

  let token = localStorage.getItem('token')

  useEffect(() => {
      axios.get(`http://localhost:8001/restaurants/${id}`, {
          headers: {
              "Authorization": `Bearer ${token}`
          }
      })
            .then(response => {
              console.log(response.data)
              setRestaurant(response.data)
              // setForm(response.data)
            })
            .catch(err => {
              console.log(`Error: ${err}`)
            })
  }, [id, token])

  useEffect(() => {
    setForm({
      name: restaurant.name,
      address: restaurant.address,
      cuisine: restaurant.cuisine,
      start_date: restaurant.start_date,
      end_date: restaurant.end_date
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

    let token = localStorage.getItem('token')

    axios.put(`https://restaurants-api.herokuapp.com/api/restaurants/${id}`, form, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
        .then(response => {
          console.log(response.data)
          navigate(`/restaurants/${response.data._id}`)
        })
        .catch(err => console.log(err))
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

        <div className="form-group">
          <TextField variant="filled" label="Name" name="name" onChange={handleForm} value={form.name} InputLabelProps={{
          shrink: true,
        }} /> 
        </div>

        <div className="form-group">
          <TextField multiline rows="4" variant="filled" label="Address" name="address" value={form.address} onChange={handleForm} InputLabelProps={{
          shrink: true,
        }} /> 
        </div>

        <div className="form-group">
        <FormControl variant="filled" fullWidth >
          <InputLabel id="cuisine-select-label">Cuisine</InputLabel>
          <Select labelId="cuisine-select-label" onChange={handleForm} label="Cuisine" name="cuisine" >
            <MenuItem value="irish">Irish</MenuItem>
            <MenuItem value="indian">Indian</MenuItem>
            <MenuItem value="chinese">Chinese</MenuItem>
            <MenuItem value="italian">Italian</MenuItem>
            <MenuItem value="japanese">Japanese</MenuItem>
          </Select>
        </FormControl>
        </div>
        {/* <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Start Date"
            name="start_date"
            onChange={handleForm}
          />
        </LocalizationProvider> */}


<div className="form-group">

<TextField
id="date"
label="Date"
type="date"
variant="filled"
name="date"
onChange={handleForm}
// defaultValue="2017-05-24T10:30"
InputLabelProps={{
  shrink: true,
}}
/>
</div>

        

        <Button onClick={submitForm} variant="contained">Submit</Button>
        
      </div>
    )
  }
  
  export default Edit