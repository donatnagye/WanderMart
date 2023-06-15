import React, { useEffect, useState } from 'react';
import Profile from '../images/ProfilePic.jpg'
import '../css/Profile.css'
import StateCities from 'indian-states-cities-list'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { backend } from '../urlConfig';
export default function ProfileCard() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [shop, setShop] = useState()
    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [business, setBusiness] = useState()
    const [IndianCities, setCities] = useState([]);
    const [IndianStates, setStates] = useState([]);
    const [butt, setButt] = useState('Edit');
    const [edit, setEdit] = useState(1);
    const [showPass, setShowPass] = useState('password')
    const [eye, setEye] = useState(0)
    const [Pass, setPass] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('hawker');
        const getuser = async () => {
            await fetch(`${backend}/hawker/signed`, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: 'bearer ' + token,
                },
                body: JSON.stringify({
                    token
                })
            }).then((rsp) => rsp.json())
                .then((data) => {
                    if (data.error) {
                        console.log('Data error ', data.error);
                    } else {
                        setName(data.user.name)
                        setShop(data.user.shop)
                        setEmail(data.user.email)
                        setPhone(data.user.phone)
                        setAddress(data.user.address)
                        setCity(data.user.city)
                        setState(data.user.state)
                        setBusiness(data.user.business)
                    }
                }).catch((err) => {
                    console.log('System error ', err);
                })
        }
        getuser();
    }, [])
    useEffect(() => {
        const Cities = (e) => {
            if (IndianCities.length === 0 && IndianStates.length === 0) {
                Object.entries(StateCities.STATE_WISE_CITIES).forEach(([key, value]) => {
                    let s = IndianStates;
                    s.push(key);
                    setStates(s);
                    value.forEach((item) => {
                        let c = IndianCities
                        c.push(item.value);
                        setCities(c);
                    })
                })
            }
            setStates([...IndianStates].sort());
            setCities([...IndianCities].sort());
        }
        Cities();
    }, []);
    const findState = (e, city) => {
        e.preventDefault()
        Object.entries(StateCities.STATE_WISE_CITIES).forEach(([key, value]) => {
            value.forEach((item) => {
                if (city === item.value) {
                    setState(key)
                    return;
                }
            })
        })
    }
    const handleEdit = async (e) => {
        e.preventDefault();
        if (butt === 'Edit') {
            setButt('Save');
            setEdit(1 - edit);
        }
        else {
            setButt('Edit');
            setEdit(1 - edit);
            console.log(name,
                shop,
                email,
                phone,
                Pass,
                city,
                address,
                state,
                business);
            const token = localStorage.getItem('hawker');
            await fetch(`${backend}hawker/edit/profile`, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: 'bearer ' + token,
                },
                body: JSON.stringify({
                    Name: name,
                    Shop: shop,
                    Email: email,
                    Phone: phone,
                    Password: Pass,
                    Locality: address,
                    City: city,
                    State: state,
                    Business: business,
                })
            }).then((rsp) => rsp.json())
                .then((data) => {
                    // console.log(data);
                    if (data.error) {
                        console.log('Data error ', data.error);
                    } else {
                        console.lo('Success.');
                    }
                }).catch((err) => {
                    console.log('System error ', err);
                })
        }

    }
    // console.log(name, shop, email, phone, address, city, state, business);
    return (
        <div className='main'>
            <div className="card">
                <img src={Profile} className="ProfileCardPic" />
                <div className="shopName">
                    <h1>{shop ? shop : "My Store"}</h1>
                </div>
            </div >
            <div className="card3">
                <div className="UserProfile">
                    <input className='editInput' type="text" id="owner name" value={name} name="name" placeholder="Owner Name" required onChange={(e) => { setName(e.target.value) }} disabled={edit} />
                    <input className='editInput' type="text" id="shop name" name="name" value={shop} placeholder="Shop Name" required onChange={(e) => { setShop(e.target.value) }} disabled={edit} />
                    <input className='editInput' type="email" id="email" name="email" value={email} placeholder="Email" required onChange={(e) => { setEmail(e.target.value) }} disabled={edit} />
                    <input className='editInput' type="tel" id="phone" name="email" value={phone} placeholder="Contact" required onChange={(e) => { setPhone(e.target.value) }} disabled={edit} />
                    <input className='editInput' type="text" id="address" name="name" value={address} placeholder="Address" required onChange={(e) => { setAddress(e.target.value) }} disabled={edit} />
                    <select className='editInput' type="select" id='city' name="city" placeholder='Select' required onChange={(e) => { setCity(e.target.value); findState(e, e.target.value) }} disabled={edit}>
                        <option hidden>{city}</option>
                        {
                            IndianCities?.map((city) => {
                                return (
                                    <option >{city}</option>
                                )
                            })
                        }
                    </select>
                    <select className='editInput' type="select" id='state' name="state" required onChange={(e) => { setState(e.target.value) }} disabled={edit}>
                        <option hidden>{state}</option>
                        {
                            IndianStates?.map((state) => {
                                return (
                                    <option>{state}</option>
                                )
                            })
                        }
                    </select>
                    <select className='editInput' type="select" id='business-type' name="business" required onChange={(e) => { setBusiness(e.target.value) }} disabled={edit}>
                        <option hidden>{business}</option>
                        <option>Online Business</option>
                        <option>Store/Offline Business</option>
                        <option>Both</option>
                    </select>
                    <div className='pass'>
                        <input className='editInput' type={showPass} id="password" value={Pass} name="password" placeholder="Password" required onChange={(e) => { setPass(e.target.value) }} disabled={edit} />
                        <i className='eye-icon' onClick={(e) => { setEye(1 - eye); if (showPass === 'password') { setShowPass('text') } else { setShowPass('password') } }} >
                            {eye === 0 ? <FaEyeSlash /> : <FaEye />}
                        </i>
                    </div>
                    <button onClick={handleEdit}>{butt}</button>
                </div>

            </div >
        </div >
    );
}





