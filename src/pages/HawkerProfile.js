import React, { useState, useEffect } from 'react'
import Header from '../components/HawkerProfileHeader'
import ProfileCard from '../components/HawkerProfileCard'

export default function HawkerProfile() {

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
            <ProfileCard />
        </div>
    );
}