import { useState } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';

// The imports are added into the application so that it execute functions for example axios is used in react to send 
// requests to an api application and the user is able to use crud functionality within their application.
const LoginForm = props => {

  const [form, setForm] = useState({email: "buddymail@email.com", password: "password"})

  const handleForm = e => {

    setForm(prevState => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))

  }
  // The set form and handle form function are controlled by the useState hook  and it allows you to state variables as functional
  // components 

  const submitForm = () => {
    console.log(form)

    axios.post('http://localhost:8001/users/login', {
      email: form.email,
      password: form.password
    })
        .then(response => {
          console.log(response.data.auth_token)
          props.onAuthenticated(true, response.data.auth_token)
        })
        .catch(err => console.log(err))
  }
// axios creates a login request for the user and uses takes in the email and password field 
// if the user is successful they are given an auth token which allows them to create read update and delete in the app 
// if not successful they will get a catch error which will display within the console. 
  let btnStyles = {
    backgroundColor: "yellow",
    fontWeight: "bold"
  }

  return (
    <>
      <TextField label="Email" variant="outlined" name="email" onChange={handleForm} /> <br/>
      Password: <input type="password" name="password" onChange={handleForm} />

      <button style={btnStyles} onClick={submitForm}>Submit</button>
    </>
  )
}

export default LoginForm

// Within the return statement is what the user sees for the login page, its displaying email and password field 