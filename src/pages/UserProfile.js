import React, { useState, useEffect } from 'react';
import Header from '../components/UserProfileHeader';
import { Search } from 'react-feather';
import { backend } from '../urlConfig';
import Loading from '../components/Loading';
import SuggestionCards from '../components/SuggestionCards';
export default function UserProfile() {
	const [search, setSearch] = useState('');
	const [write, setWrite] = useState('');
	const [conn, setConn] = useState(0);
	const [onlineHawkers, setOnlineHawker] = useState([]);
	const [storeHawkers, setStoreHawker] = useState([]);
	const [itemfound, setItemFound] = useState([]);
	const [items, setItems] = useState([]);
	useEffect(() => {
		const token = localStorage.getItem('user');
		let currentLocation = {};
		const getuser = async () => {
			await fetch(`${backend}/suggestions`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'bearer ' + token,
				},
				body: JSON.stringify({
					currentLocation,
				}),
			})
				.then((rsp) => rsp.json())
				.then((data) => {
					if (data.error) {
						console.log('Data error ', data.error);
					} else {
						console.log(data.onlineHawkers);
						setOnlineHawker(data.onlineHawkers);
						setStoreHawker(data.storeHawkers);
						setConn(1);
					}
				})
				.catch((err) => {
					console.log('System error ', err);
				});
		};
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords;
					currentLocation = { latitude, longitude };
					await getuser();
				},
				async (error) => {
					console.log(error);
					await getuser();
				}
			);
		} else {
			console.log('Geolocation is not supported by this browser.');
		}
	}, []);
	useEffect(() => {
		function isLoggedin() {
			if (!localStorage.getItem('user')) {
				window.location = '/user/signin';
				return;
			}
		}
		isLoggedin();
	}, []);
	const SearchItem = async (e) => {
		if (e == 'Enter' && write != undefined && write != '') {
			console.log('1', write);
			Object.entries(items).map(([key, value]) => {
				// const s=value.product
				const ind1 = value.product
					.toLowerCase()
					.indexOf(write.toLowerCase());
				const ind2 = value.description
					.toLowerCase()
					.indexOf(write.toLowerCase());
				if (ind1 > -1 || ind2 > -1) {
					let arr = itemfound;
					arr.push(value);
					setItemFound(arr);
					setItems(itemfound);
				}
			});
			setSearch(write);
		}
	};
	// console.log('search ', search, write);
	return (
		<div className="App">
			<Header />
			<div className="search-box">
				<div className="search-bar">
					<input
						type="text"
						className="search-input"
						value={write}
						placeholder="Search"
						onChange={(e) => {
							setWrite(e.target.value);
						}}
						onKeyDown={SearchItem}
					/>
					<div className="search-icon">
						<Search
							className="search"
							onClick={() => {
								setSearch(write);
							}}
						/>
					</div>
				</div>
			</div>
			<div className="suggestions">
				{conn === 0 ? (
					<Loading />
				) : (
					<SuggestionCards prop={onlineHawkers} />
				)}
			</div>
		</div>
	);
}
