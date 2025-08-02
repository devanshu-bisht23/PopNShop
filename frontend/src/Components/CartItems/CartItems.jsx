import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {

    const {all_product, cartItems, removeFromCart, getTotalCartAmount} = useContext(ShopContext)

  return (
    <div className='cartitems'>
      <div className="cartitem-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
        {all_product.map((e)=>{
            if(cartItems[e.id]>0){
                return <div>
                    <div className="cartitems-format cartitem-format-main">
                    <img src={e.image} alt="" className='caarticon-product-icon'/>
                    <p>{e.name}</p>
                    <p>Rs{e.new_price*10}</p>
                    <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                    <p>Rs{e.new_price*cartItems[e.id]*10}</p>
                    <img className = 'cartitems-remove-icon' src={remove_icon} onClick={()=>removeFromCart(e.id)} alt="" />
                </div>
                <hr />
            </div>
            }
            return null;
        })}
        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>cart Totals</h1>
            <div> 
              <div className="cartitems-total-items">
              <p>Subtotal</p>
              <p>Rs{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-items">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            </div>
            
            <div className="cartitems-total-items">
              <h3>Total</h3>
              <h3>Rs{getTotalCartAmount()}</h3>
            </div>
          </div>
          <div className="cartitems-promocode">
          <p>Enter promo code here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='promocode'/>
            <button>Submit</button>
          </div>
        </div>
        </div>
        <button>PROCEED TO CHECKOUT</button>
    </div>
  )
}

export default CartItems
