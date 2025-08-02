import React from 'react'
import './CSS/LoginSignup.css'
const LoginSignup = () => {
  return (
    <div className = 'loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Your Name'/>
          <input type="text" placeholder='Email Address'/>
          <input type="text" placeholder='Password'/>
        </div>
        <button>Continue</button>
        <p className="loginsignup-login">Already Have an Account? <span>Login here</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id=''/>
          <p>I agree with the terms that I wont read anyways.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
