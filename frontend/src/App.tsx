import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Contact from './components/Contact'
import Home from './pages/Home'
import About from './components/About'
import Register from './pages/Register'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path="/about" element={<About />} />
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
      </Routes>
    </>
  );
}

export default App
