import { useState } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';

const RegisterForm = (props) => {

  const [form, setForm] = useState({name: "test3", email: "register3@email.com", password: "password"})

  const handleForm = e => {

    setForm(prevState => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))

  }

  const submitForm = () => {
    console.log(form)

    axios.post('http://localhost:8001/users/register', {
      name:  form.name,
      email: form.email,
      password: form.password
    })
        .then(response => {
          console.log(response.data.auth_token)
        //   props.onAuthenticated(true, response.data.auth_token)
        })
        .catch(err => console.log(err))
        axios.post('http://localhost:8001/users/login', {
        email: form.email,
        password: form.password
  })
  .then(response => {
    // console.log(response.data.auth_token)
    props.onAuthenticated(true, response.data.auth_token)
  })

}



  let btnStyles = {
    backgroundColor: "yellow",
    fontWeight: "bold"
  }

  return (
    <>
       <TextField label="Name" variant="outlined" name="name" onChange={handleForm} /> <br/>
      <TextField label="Email" variant="outlined" name="email" onChange={handleForm} /> <br/>
      Password: <input type="password" name="password" onChange={handleForm} />

      <button style={btnStyles} onClick={submitForm}>Submit</button>
    </>
  )
}

export default RegisterForm