import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Contact from './components/Contact'
import Home from './pages/Home'
import About from './components/About'

function App() {
  
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path="/about" element={<About />} />
        <Route path='/contact' element={<Contact></Contact>}></Route>
      </Routes>
    </>
  );
}

export default App
