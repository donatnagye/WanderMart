import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function Header() {
	const path = window.location.pathname;
	const [Sign, setSign] = useState(null);
	const [Profile, setProfile] = useState(null);
	const [ProfilePath, setProfilePath] = useState(null);
	const [SignPath, setSignPath] = useState(null);
	useEffect(() => {
		function SetHeader() {
			if (path === '/user/signin') {
				setSign('SignUp');
				setProfile('Hawker');
				setSignPath('/user/signup');
				setProfilePath('/hawker/signin');
			} else if (path == '/hawker/signin') {
				setSign('SignUp');
				setProfile('User');
				setSignPath('/hawker/signup');
				setProfilePath('/user/signin');
			} else if (path === '/hawker/signup') {
				setSign('SignIn');
				setProfile('User');
				setSignPath('/hawker/signin');
				setProfilePath('/user/signin');
			} else if (path === '/user/signup') {
				setSign('SignIn');
				setProfile('Hawker');
				setSignPath('/user/signin');
				setProfilePath('/hawker/signin');
			} else {
				setSign('SignUp');
				setProfile('Hawker');
				setSignPath('/user/signup');
				setProfilePath('/hawker/signin');
			}
		}
		SetHeader();
	}, []);
	return (
		<div className="Header">
			<header>
				<Link to={'/'} id="wanderMart">
					<h1 class="title">WanderMart</h1>
				</Link>
				<ul>
					<div
						className="box"
						onClick={(e) => {
							window.location = SignPath;
						}}
					>
						<li className="link">
							<a>
								<Link to={SignPath}>{Sign}</Link>
							</a>
						</li>
					</div>
					<div
						className="box"
						onClick={(e) => {
							window.location = ProfilePath;
						}}
					>
						<li className="link">
							<a>
								<Link to={ProfilePath}>{Profile}</Link>
							</a>
						</li>
					</div>
				</ul>
			</header>
		</div>
	);
}
