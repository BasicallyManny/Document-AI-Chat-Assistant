import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import Home from './pages/Home';
import About from './components/About';
import Register from './pages/Register';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import {Toaster} from 'react-hot-toast'

import {UserContextProvider} from '../context/userContext'

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      {/**Cool Notifications Library */}
      <Toaster position='bottom-right' toastOptions={{duration: 3000}}/> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
