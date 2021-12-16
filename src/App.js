import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react'
//Components
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


const App = () => {
  const [authenticated, setAuthenticated] = useState(false)
  let protectedRestaurants

  useEffect(() => {
    if(localStorage.getItem('auth_token'))
    { 
      setAuthenticated(true)
    }
  }, [])

  const onAuthenticated = (auth, auth_token) => {
    setAuthenticated(auth)
    if(auth){
      localStorage.setItem('auth_token', auth_token)
    }
    else {
      localStorage.removeItem('auth_token')
    }
    
  }

  if(authenticated) {
    protectedRestaurants = (
      <>
        <Route path="/restaurants/create" element={<RestaurantsCreate />} />
        <Route path="/restaurants/:_id/edit" element={<RestaurantsEdit />} />
       
      </>
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
