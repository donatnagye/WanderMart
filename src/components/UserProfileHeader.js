import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import image from '../images/ProfilePic.jpg'
import favourite from '../images/favourite.png'
export default function Header() {
    const [menu, setMenu] = useState("hidden");
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
        localStorage.removeItem('user')
        window.location = '/user/signin'
        return
    }
    return (
        <div className="Header" onClick={(e) => { if (menu === 'visible') { Change(e) } }}>
            <header>
                <Link to={'/'}><h1 class="title">WanderMart</h1></Link>
                <div className='header-wrapper'>
                    <div className="Profile">
                        <div className="menu-link">
                            <img src={favourite} id="logo" />
                        </div>
                        <div className="menu-link">
                            <img src={image} id="logo" onClick={Change} />
                        </div>
                    </div>
                    <div className="trans">
                        <ul className={menu} >
                            <li className="menu" id="hover-underline-animation" >Profile</li>
                            <li className="menu" id="hover-underline-animation">My Orders</li>
                            <li className="menu" id="hover-underline-animation" onClick={Logout}>Sign Out</li>
                            {/* <li className="" ><button id="signout" onClick={''}> Log Out</button></li > */}
                        </ul >
                    </div >
                </div>
            </header>
        </div >
    );
}





