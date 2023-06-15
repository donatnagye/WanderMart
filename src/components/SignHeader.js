import React, { useState } from 'react'
import { Link } from 'react-router-dom';
export default function Header() {
    return (
        <div className="Header">
            <header>
                <Link to={'/'}><h1 class="title">WanderMart</h1></Link>
            </header>
        </div>
    );
}



