import React, { useEffect, useState } from 'react';
import Header from '../components/UserProfileHeader';
import { backend } from '../urlConfig';
import Loading from '../components/Loading';
import '../css/favorite.css';
export default function Favorite() {
	const [fav, setFav] = useState([]);
	const [conn, setConn] = useState(0);
	const token = localStorage.getItem('user');
	useEffect(() => {
		const fetchData = async () => {
			await fetch(`${backend}/user/fav`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'bearer ' + token,
				},
			})
				.then((rsp) => rsp.json())
				.then(async (data) => {
					if (data.error) {
						console.log('Data error ', data.error);
					} else {
						setFav(data.favs);
						setConn(1);
					}
				});
		};
		fetchData();
	}, []);
	const Delete = async (id) => {
		// e.preventDefault();
		await fetch(`${backend}/user/fav/delete`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'bearer ' + token,
			},
			body: JSON.stringify({ favorites: id }),
		}).then(() => {
			window.location.reload();
		});
	};
	// console.log(typeof fav);
	return (
		<div>
			<Header />
			<div className="row-display">
				<h1>Favorites</h1>
				{conn === 0 ? (
					<Loading />
				) : (
					<div className={'row odd-row'}>
						<p
							className="ind-row"
							style={{ color: 'black' }}
						>
							Product
						</p>
						<p
							className="ind-row-desc"
							style={{ color: 'black' }}
						>
							Description
						</p>
						<p
							className="ind-row-action"
							style={{ color: 'black' }}
						>
							Price
						</p>
						<p
							className="ind-row-action"
							style={{ color: 'black' }}
						>
							Action
						</p>
					</div>
				)}
				{Object.entries(fav).map(([key, val]) => {
					// console.log(key, val);
					return (
						<div
							key={key}
							className={
								key % 2 === 0 ? 'row even-row' : 'row odd-row'
							}
						>
							<p
								className="ind-row"
								style={{ color: 'black' }}
							>
								{val.product}
							</p>
							<p
								className="ind-row-desc"
								style={{ color: 'black' }}
							>
								{val.description}
							</p>
							<p
								className="ind-row"
								style={{ color: 'black' }}
							>
								{' '}
								{val.price}$
							</p>
							<div className="buttons">
								<button
									onClick={''}
									class="order-again"
								>
									Order
								</button>
								<button
									onClick={() => Delete(val._id)}
									class="delete"
								>
									Delete
								</button>
							</div>
							{/* {val.map(([value, idx]) => (
								<div
									key={idx}
									className="cell"
								>
									{value}
								</div>
							))} */}
						</div>
					);
				})}
			</div>
		</div>
	);
}
