import './App.css';
import Navbar from './Components/Navbar/Navbar';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup'; 
import Footer from './Components/Footer/Footer';

import Men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'

function App() {
  return (
    <div>
      <BrowserRouter>
 
        <Navbar/> 
        
        <Routes>


          <Route path='/' element = {<Shop/>}/>

          {/* props are passed dynamically: banner and category */}
          <Route path='/mens' element = {<ShopCategory banner = {Men_banner} category="men"/>}/>
          <Route path='/women' element = {<ShopCategory banner = {women_banner} category="women"/>}/>
          <Route path='/kids' element = {<ShopCategory banner = {kid_banner} category="kid"/>}/> 

          {/* <Route path='/product' element = {<Product/>}>
            <Route path=':productId' element={<Product/>}/> 
          </Route>  */}

          <Route path='/product/:productId' element={<Product />} />
          {/* The : before productId is React Router syntax. This part of the URL is dynamic — it's a variable.  */}

          <Route path='/cart' element = {<Cart/>}/>
          <Route path='/login' element = {<LoginSignup/>}/>

        </Routes>

        <Footer/>


      </BrowserRouter>
      {/* we have set up our routes, now we will link these up with our naviagtion bar */}
    </div>
  );
}

export default App;
