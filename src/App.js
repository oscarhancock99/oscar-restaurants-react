import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react'
//Components

// My components consist of a navbar login and Register 
// The components are functions that accepts inputs for example
// props and returns a react element. 

import Navbar from './components/Navbar'

//PAGES
import Home from './pages/Home';
import RestaurantsIndex from './pages/restaurants/Index';
import RestaurantsShow from './pages/restaurants/Show';
import RestaurantsCreate from './pages/restaurants/Create';
import RestaurantsEdit from './pages/restaurants/Edit';

import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import RegisterForm from './components/RegisterForm'

// Within the app application is where all the pages for my application are being imported,
// The app page is the main parent of the application and the pages within the parent are its 
// children 

const App = () => {
  const [authenticated, setAuthenticated] = useState(false)
  let protectedRestaurants

  useEffect(() => {
    if(localStorage.getItem('auth_token'))
    { 
      setAuthenticated(true)
    }
  }, [])
  // If the user has an auth token within their console the user is authenticated

  const onAuthenticated = (auth, auth_token) => {
    setAuthenticated(auth)
    if(auth){
      localStorage.setItem('auth_token', auth_token)
    }
    else {
      localStorage.removeItem('auth_token')
    }
    
  }

  // If the user is authenticated give them an authtoken that allows them to create and edit

  if(authenticated) {
    protectedRestaurants = (
      <>
        <Route path="/restaurants/create" element={<RestaurantsCreate />} />
        <Route path="/restaurants/:_id/edit" element={<RestaurantsEdit />} />
       
      </>
      // if the user is authenticated allow them to utilise the create and edit Restaurant 
      // functionality
    )
  }

  return (
    <Router>
      <Navbar onAuthenticated={onAuthenticated} authenticated={authenticated} />
      <Routes>
        <Route path="/" element={<Home onAuthenticated={onAuthenticated} authenticated={authenticated} />} />
        <Route path="/restaurants" element={<RestaurantsIndex />} />
        <Route path="/restaurants/:_id" element={<RestaurantsShow />} />
        {protectedRestaurants}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
