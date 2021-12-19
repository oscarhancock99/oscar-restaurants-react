import { useState } from 'react'
import axios from 'axios'
import { TextField, MenuItem, FormControl, Select, InputLabel, Button, Card, Container, buttonBaseClasses } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import userEvent from '@testing-library/user-event';
import { create } from '@mui/material/styles/createTransitions';

// import { LocalizationProvider, DateTimePicker } from '@mui/lab'

// import AdapterMoment from '@mui/lab/AdapterMoment'

// Within my pages folder i have a restaurants folder and in that folder i have the pages which allow the user
// to create,edit,update and show a particular restuarant.


const Create = () => {

  let navigate = useNavigate()

  const [form, setForm] = useState({})

  const handleForm = e => {

    setForm(prevState => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))

  }

  const submitForm = () => {
    console.log(form)

    let auth_token = localStorage.getItem('auth_token')

    axios.post('http://localhost:8001/restaurants', form, {
      headers: {
        "Authorization": `Bearer ${auth_token}`
      }
    })
        .then(response => {
          console.log(response.data)
          navigate(`/restaurants`)
        })
        .catch(err => console.log(err))
  }

  // When creating a restaurant axios will retreive the request in the form of a post request, the bearer 
  // token is created when the request has been successful. then navigate to restaurants index page
  // if not throw a catch error unauthorized
  
    return (

      // Inside the return statement the user will see the fields that they will have to fill in order to 
      // create a restaurant. once the the fields are complete the user hits the submit button 

      <Container maxWidth="sm">
      <div>
        <Card>
        <h2>Create</h2>

        <div className="form-group">
          <TextField variant="filled" label="Name" name="name" onChange={handleForm} /> 
        </div>

        <div className="form-group">
          <TextField multiline rows="4" variant="filled" label="Address" name="address" onChange={handleForm} />
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
        </Card>
      </div>
    </Container>

    )
  }
  
  export default Create