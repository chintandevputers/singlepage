import React from 'react';
import logo from './logo.svg';
import './App.css';

function Login(props: any) {
    return (
        <div className='form-container'>
            <p className="title">Create account</p>
            <form className='form'>
                <input type="text" className="input" placeholder="First Name" onChange={e => props.setFirstName(e.target.value)} />
                <input type="text" className="input" placeholder="Last Name" />
                <input type="text" className="input" placeholder="Date Of Birth" />
                <input type="text" className="input" placeholder="Phone Number" />
                <input type="email" className="input" placeholder="Email" />
                <input type="password" className="input" placeholder="Password" />
                <button className="form-btn">Create account</button>
            </form>
            <p className="sign-up-label">
                Already have an account?<span className="sign-up-link">Log in</span>
            </p>
        </div>
    );
}

export default Login;
