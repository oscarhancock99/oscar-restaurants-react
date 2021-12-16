import { Link, useNavigate } from 'react-router-dom'
import {AppBar, Toolbar, Typography, Button} from '@mui/material'


const Navbar = props => {
  
  let logoutButton
  let navigate = useNavigate()

  const logout = () => {
    props.onAuthenticated(false)
    navigate('/', { replace: true})
  }
  const home = () => {
    navigate('/')
  }
  const restaurants = () => {
    navigate('/restaurants')
  }
  const about = () => {
    navigate('/about')
  }
  const contact = () => {
    navigate('/contact')
  }
  if(props.authenticated){
    logoutButton = (
        // <button onClick={logout}>Logout</button>
        logoutButton = <Button onClick={logout} color="inherit">Logout</Button>
    )
  }

  return (
    <>

<AppBar position="static">
        <Toolbar>
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Restaurants
          </Typography>
          <Button onClick={home} color="inherit">Home</Button>
          <Button onClick={restaurants} color="inherit">Restaurants</Button>
          <Button onClick={about} color="inherit">About</Button>
          <Button onClick={contact} color="inherit">Contact</Button>
          {logoutButton}
        </Toolbar>
      </AppBar>
  
      {/* <Link to="/">Home</Link> |  
      <Link to="restaurants"> Restaurants</Link> |
      <Link to="/about">About</Link> |
      <Link to="/contact">Contact</Link>
      {logoutButton} */}
    </>
  )
  
}

export default Navbar