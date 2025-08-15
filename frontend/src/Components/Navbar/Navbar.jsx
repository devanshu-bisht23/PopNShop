
 import React, { useContext, useState } from 'react'
 import './Navbar.css'
 import logo from '../Assets/logo.png'
 import cart_icon from '../Assets/cart_icon.png'
 import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
 
 const Navbar = () => {

  const {getTotalCartItems} = useContext(ShopContext);

  const [menu, setMenu] = useState("shop");  // react hook: useState
   return (
     <div className = 'navbar'>

        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>

        <ul className="nav-menu">
            <li onClick = {()=>{setMenu("shop")}}> <Link style={{textDecoration: 'none'}} to ='/'>Shop</Link> {menu === "shop"? <hr/>:<></>}</li>
            <li onClick = {()=>{setMenu("mens")}}> <Link style={{textDecoration: 'none'}} to ='/mens'> Men </Link> {menu === "mens"? <hr/>:<></>}</li>
            <li onClick = {()=>{setMenu("women")}}> <Link style={{textDecoration: 'none'}} to ='/women'>Women</Link> {menu === "women"? <hr/>:<></>}</li>
            <li onClick = {()=>{setMenu("kids")}}> <Link style={{textDecoration: 'none'}} to ='/kids'>Kids</Link> {menu === "kids"? <hr/>:<></>}</li>
            
        </ul>

        <div className="nav-login-cart">

            {localStorage.getItem('auth-token') // if auth-token then logout will be displayed else the login button
            ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
            :<button>  <Link style={{textDecoration: 'none'}} to = '/login'>Login</Link>  </button>} 

            <Link style={{textDecoration: 'none'}} to = '/cart'>  <img src= {cart_icon} alt="" />  </Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
     </div>
   )
 }
 
 export default Navbar
