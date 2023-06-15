import React, { useState, useEffect } from "react"
import Sign from '../images/sign.svg'
import { Link } from "react-router-dom"
import Header from '../components/Header'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { backend } from "../urlConfig";

export default function UserSignUp() {
    const [Name, setName] = useState(null)
    const [Email, setEmail] = useState(null)
    const [Phn, setPhn] = useState(null)
    const [Pass, setPass] = useState(null)
    const [showPass, setShowPass] = useState('password')
    const [eye, setEye] = useState(0)
    function Submit(e) {
        e.preventDefault();
        fetch(`${backend}/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name,
                Email,
                Phone: Phn,
                Password: Pass
            })
        }).then(response => {
            if (response.ok) {
                console.log('Signed Up Successfully.');
            } else {
                console.log(response.status);
                if (response.status == 400) {
                    console.log('Email already used.');
                }
                else if (response.status == 422) {
                    console.log("Invalid Entry.");
                }
                else if (response.status == 500) {
                    console.log('Internal error.');
                }
            }
        }).catch(err => {
            console.log('Error:', err);
        });
    }
    useEffect(() => {
        function isLoggedin() {
            if (localStorage.getItem('user')) {
                window.location = '/user/home';
                return;
            }
        }
        isLoggedin();
    }, [])
    return (
        <div>
            <Header />
            <div className='Sign'>
                <h1>SignUp</h1>
                <div className="wrapper">
                    <div className="sign-box">
                        <img src={Sign} className="sign-img" />
                    </div>
                    <div className="sign-box">
                        <form>
                            <input className='Sign-input' type="text" id="name" value={Name} name="name" placeholder="Name" required onChange={(e) => { setName(e.target.value) }} />
                            <input className='Sign-input' type="email" id="email" value={Email} name="email" placeholder="Email" required onChange={(e) => { setEmail(e.target.value) }} />
                            <input className='Sign-input' type="tel" id="phone" value={Phn} name="email" placeholder="Contact" required onChange={(e) => { setPhn(e.target.value) }} />
                            <div className='pass'>
                                <input className='Sign-input' type={showPass} id="password" value={Pass} name="password" placeholder="Password" required onChange={(e) => { setPass(e.target.value) }} />
                                <i className='eye-icon' onClick={(e) => { setEye(1 - eye); if (showPass === 'password') { setShowPass('text') } else { setShowPass('password') } }} >
                                    {eye === 0 ? <FaEyeSlash /> : <FaEye />}
                                </i>
                            </div>
                            <button className='sign-button' type="submit" onClick={Submit}>Submit</button>
                        </form>
                        <p>Already have an account? <br /><Link id="switch-sign" to={'/user/signin'}>SignIn</Link></p>
                    </div>
                </div>
            </div>
        </div >
    );
}