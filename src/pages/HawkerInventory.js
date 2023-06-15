import React, { useState, useEffect } from 'react'
import Header from '../components/HawkerProfileHeader'
import Inventory from '../components/Inventory'

export default function HawkerInventory() {

    useEffect(() => {
        function isLoggedin() {
            if (!localStorage.getItem('hawker')) {
                window.location = '/hawker/signin';
                return;
            }
        }
        isLoggedin();
    }, [])
    return (
        <div className='App'>
            <Header />
            <Inventory />
        </div>
    );
}