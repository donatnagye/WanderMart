import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import image from '../images/ProfilePic.jpg'
import '../css/hawkerHeader.css'
import { FaBell } from 'react-icons/fa';
import { backend } from '../urlConfig';
export default function Header() {
    const path = window.location.pathname
    const [menu, setMenu] = useState("hidden");
    const [notification, setNotification] = useState(1);
    const [link, setLink] = useState();
    
    // const [image, setImage] = useState();
    useEffect(() => {
        const token = localStorage.getItem('hawker');
        if (path.startsWith('/hawker')) {
            setLink('/hawker/home');
        } else if (path.startsWith('/user')) {
            setLink('/user/home');
        }
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
                    // console.log(data);
                    if (data.error) {
                        console.log('Data error ', data.error);
                    } else {
                        // console.log(data.user.profileimg);
                    }
                }).catch((err) => {
                    console.log('System error ', err);
                })
        }
        getuser();
    }, [])
    const Change = (e) => {
        e.preventDefault();
        if (menu == "hidden") {
            setMenu("visible");
        }
        else {
            setMenu("hidden");
        }
    }
    const Logout = (e) => {
        localStorage.removeItem('hawker')
        window.location = '/user/signin'
        return
    }
    return (
        <div className="Header" onClick={() => { if (menu === 'visible') setMenu("hidden"); }}>
            <header>
                <h1 class="title"><Link to={link} className='Link'>WanderMart</Link></h1>
                <div className='header-wrapper'>
                    <div className="Profile">
                        <Link to={link} style={{ height: '100%' }}>
                            <div className="menu-link">
                                <FaBell className="bell-icon" size={30} />
                                {
                                    notification > 0 && <div className="notification-dot" >{notification > 9 ? '9+' : notification}</div>
                                }
                            </div>
                        </Link>
                        <div className="menu-link" onClick={Change} >
                            <img src={image} id="logo" />
                        </div>
                    </div>
                    <div className="hawker-menu">
                        <ul className={menu} >
                            <Link to="/hawker/edit/profile" className='MenuLink'><li className="menu" id="hover-underline-animation" >Profile</li></Link>
                            <Link to="/hawker/inventory" className='MenuLink'><li className="menu" id="hover-underline-animation">Inventory</li></Link>
                            <Link to="/hawker/edit/profile" className='MenuLink'><li className="menu" id="hover-underline-animation">Orders</li></Link>
                            <Link to="/hawker/edit/profile" className='MenuLink'><li className="menu" id="hover-underline-animation" onClick={Logout}>Sign Out</li></Link>
                        </ul >
                    </div >
                </div>
            </header>
        </div >
    );
}





