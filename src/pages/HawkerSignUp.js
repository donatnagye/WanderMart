import React, { useState, useEffect } from "react"
import Sign from '../images/hawkerSignUp.svg'
import { Link } from "react-router-dom"
import Header from '../components/Header'
import StateCities from 'indian-states-cities-list'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { backend } from "../urlConfig"
export default function HawkerSignup() {
    const [Name, setName] = useState(null)
    const [Email, setEmail] = useState(null)
    const [Phn, setPhn] = useState(null)
    const [Pass, setPass] = useState(null)
    const [Locality, setLocality] = useState(null)
    const [City, setCity] = useState(null)
    const [State, setState] = useState(null)
    const [searchState, setSearchState] = useState([])
    const [Shop, setShop] = useState(null)
    const [Business, setBusiness] = useState('')
    const [IndianCities, setCities] = useState([]);
    const [IndianStates, setStates] = useState([]);
    const [showPass, setShowPass] = useState('password')
    const [eye, setEye] = useState(0)
    const Submit = (e) => {
        e.preventDefault();
        fetch(`${backend}/hawker/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name,
                Shop,
                Email,
                Phone: Phn,
                Password: Pass,
                Locality,
                City,
                State,
                Business,
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
        const Cities = (e) => {
            // console.log(StateCities);
            if (IndianCities.length === 0) {
                Object.entries(StateCities.STATE_WISE_CITIES).forEach(([key, value]) => {
                    // console.log(key);
                    let s = searchState;
                    s.push(key);
                    setSearchState(s);
                    value.forEach((item) => {
                        let c = IndianCities
                        c.push(item.value);
                        setCities(c);
                    })
                })
            }
            if (IndianStates.length === 0) {
                Object.entries(StateCities.INDIAN_STATES_AND_UT_ARRAY).forEach(([key, value]) => {
                    let s = IndianStates;
                    s.push(value);
                    setStates(s);
                })
            }
            setStates([...IndianStates].sort((a, b) => {
                const trimmedA = a.trim();
                const trimmedB = b.trim();
                if (trimmedA.toLowerCase() < trimmedB.toLowerCase()) {
                    return 1;
                }
                return 0;
            }));
            setCities([...IndianCities].sort());
        }
        Cities();
    }, []);
    const findState = (e, city) => {
        e.preventDefault()
        Object.entries(StateCities.STATE_WISE_CITIES).forEach(([key, value]) => {
            value.forEach((item) => {
                if (city === item.value) {
                    console.log(searchState);
                    console.log(IndianStates);
                    for (let i = 0; i < searchState.length; i++) {
                        // console.log(searchState[i], key);
                        if (searchState[i] === key) {
                            setState(IndianStates[i]);
                        }
                    }
                    // setState(key)
                    return;
                }
            })
        })
    }
    // useEffect(() => {
    //     function isLoggedin() {
    //         if (localStorage.getItem('hawker')) {
    //             window.location = '/hawker/home';
    //             return;
    //         }
    //     }
    //     isLoggedin();
    // }, [])
    // console.log(searchState);
    // console.log(IndianStates);
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
                            <input className='Sign-input' type="text" id="owner name" value={Name} name="name" placeholder="Owner Name" required onChange={(e) => { setName(e.target.value) }} />
                            <input className='Sign-input' type="text" id="shop name" value={Shop} name="name" placeholder="Shop Name" required onChange={(e) => { setShop(e.target.value) }} />
                            <input className='Sign-input' type="email" id="email" value={Email} name="email" placeholder="Email" required onChange={(e) => { setEmail(e.target.value) }} />
                            <input className='Sign-input' type="tel" id="phone" value={Phn} name="email" placeholder="Contact" required onChange={(e) => { setPhn(e.target.value) }} />
                            <div className='pass'>
                                <input className='Sign-input' type={showPass} id="password" value={Pass} name="password" placeholder="Password" required onChange={(e) => { setPass(e.target.value) }} />
                                <i className='eye-icon' onClick={(e) => { setEye(1 - eye); if (showPass === 'password') { setShowPass('text') } else { setShowPass('password') } }} >
                                    {eye === 0 ? <FaEyeSlash /> : <FaEye />}
                                </i>
                            </div>
                            <input className='Sign-input' type="text" id="locaity" value={Locality} name="locality" placeholder="Locality Address" required onChange={(e) => { setLocality(e.target.value) }} />
                            <select className='Sign-select' type="select" id='city' value={City} name="city" placeholder='Select' required onChange={(e) => { setCity(e.target.value); findState(e, e.target.value) }}>
                                <option hidden>Select City</option>
                                {
                                    IndianCities?.map((city) => {
                                        return (
                                            <option>{city}</option>
                                        )
                                    })
                                }
                            </select>
                            <select className='Sign-select' type="select" id='state' value={State} name="state" required onChange={(e) => { setState(e.target.value) }}>
                                <option hidden>Select State</option>
                                {
                                    IndianStates?.map((state) => {
                                        return (
                                            <option>{state}</option>
                                        )
                                    })

                                }
                            </select>
                            <select className='Sign-select' type="select" id='business-type' value={Business} name="business" required onChange={(e) => { setBusiness(e.target.value) }}>
                                <option hidden>Select Business Type</option>
                                <option>Online Business</option>
                                <option>Store/Offline Business</option>
                                <option>Both</option>
                            </select>
                            <button className='sign-button' type="submit" onClick={Submit}>Submit</button>
                        </form>
                        <p>Already have an account? <br /><Link id="switch-sign" to={'/hawker/signin'}>SignIn</Link></p>
                    </div>
                </div>
            </div>
        </div >
    );
}