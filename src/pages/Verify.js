import React, { useState, useEffect } from 'react'
import Sign from '../images/verified.svg'
import { backend } from '../urlConfig';
export default function Verify() {
    const [Role, setRole] = useState();
    useEffect(() => {
        const path = window.location.pathname
        console.log(path);
        let id;
        if (path.startsWith('/user')) {
            setRole('User');
            id = String(path).slice(13);
            console.log(id);
            fetch(`${backend}/user/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id
                })
            }).then(response => {
                console.log(response);
                if (response.ok) {
                    console.log('Data sent successfully');
                } else {
                    throw new Error('Error sending data');
                }
            }).catch(err => {
                console.log('Error:', err);
            });
        }
        else if (path.startsWith('/hawker')) {
            id = String(path).slice(15);
            setRole('Hawker');
            console.log(id);
            fetch(`${backend}/hawker/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id
                })
            }).then(response => {
                console.log(response);
                if (response.ok) {
                    console.log('Data sent successfully');
                } else {
                    throw new Error('Error sending data');
                }
            }).catch(err => {
                console.log('Error:', err);
            });
        }

    }, [])
    return (
        <div className="App">
            <div className="Verified">
                <div className="verify-wrapper">
                    <img src={Sign} className="sign-img" />
                    <p><b>Congratulation!! Your Email is verified. Now you access your account.<br />
                        Go back to Sign-In page and sign-in from {Role} account</b></p>
                </div>
            </div>
        </div >
    );
}



