import React, { useState, useEffect } from 'react'
import Header from '../components/Header';
import Sign from '../images/hawkerSignIn.svg'
import { Link } from "react-router-dom"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { backend } from '../urlConfig';
export default function HawkerSignIn() {
    const [Email, setEmail] = useState(null)
    const [Pass, setPass] = useState(null)
    const [showPass, setShowPass] = useState('password')
    const [eye, setEye] = useState(0)
    const Submit = async (e) => {
        e.preventDefault();
        await fetch(`${backend}/hawker/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email,
                Password: Pass
            })
        }).then((rsp) => rsp.json())
            .then((data) => {
                console.log(data);
                if (data.error) {
                    console.log('Data error ', data.error);
                } else {
                    localStorage.setItem("hawker", data.token);
                    console.log(localStorage.getItem("hawker"));
                    window.location = '/hawker/home';
                    return;
                }
            }).catch((err) => {
                console.log('System error ', err);
            })
    }
    useEffect(() => {
        function isLoggedin() {
            if (localStorage.getItem('hawker')) {
                window.location = '/hawker/home';
                return;
            }
        }
        isLoggedin();
    }, [])
    return (
        <div className="App">
            <Header />
            <div className='Sign'>
                <h1>SignIn</h1>
                <div className="wrapper">
                    <div className="sign-box">
                        <img src={Sign} className="sign-img" />
                    </div>
                    <div className="sign-box">
                        <form>
                            <input className='Sign-input' type="email" id="email" value={Email} name="email" placeholder="Email" required onChange={(e) => { setEmail(e.target.value) }} />
                            <div className='pass'>
                                <input className='Sign-input' type={showPass} id="password" value={Pass} name="password" placeholder="Password" required onChange={(e) => { setPass(e.target.value) }} />
                                <i className='eye-icon' onClick={(e) => { setEye(1 - eye); if (showPass === 'password') { setShowPass('text') } else { setShowPass('password') } }} >
                                    {eye === 0 ? <FaEyeSlash /> : <FaEye />}
                                </i>
                            </div>
                            <button className='sign-button' type="submit" onClick={Submit}>Submit</button>
                        </form>
                        <p>Don't have an account? <br /><Link id="switch-sign" to={'/hawker/signup'}>SignUp</Link></p>
                    </div>
                </div>
            </div>
        </div >
    );
}



