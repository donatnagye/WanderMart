import React, { useEffect, useState } from 'react';
import Prodimg from '../images/chips.png';
import Modal from 'react-modal';
import { backend } from '../urlConfig';

export default function IndividualCard(props) {
	// console.log(props.props);
	const hawker = props.props[0].hawker_id;
	const [prod, setProd] = useState();
	const [userName, setUserName] = useState();
	const [isOpen, setIsOpen] = useState(false);
	const [revOpen, setRevOpen] = useState(false);
	const [cost, setCost] = useState(0);
	const [count, setCount] = useState(0);
	const [rating, setRating] = useState(Number(1));
	const [reviewInd, setReviewInd] = useState();
	const token = localStorage.getItem('user');

	const openPopup = (e) => {
		setIsOpen(true);
	};
	const openReview = (e) => {
		setRevOpen(true);
	};

	const closePopup = () => {
		setIsOpen(false);
	};
	const closeReview = () => {
		setRevOpen(false);
	};
	const getuser = async (currentLocation) => {
		await fetch(`${backend}/order`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'bearer ' + token,
			},
			body: JSON.stringify({
				currentLocation,
				hawker: props.props[0].hawker_id,
				product: props.props[0]._id,
			}),
		})
			.then((rsp) => rsp.json())
			.then((data) => {
				if (data.error) {
					console.log('Data error ', data.error);
				}
			})
			.catch((err) => {
				console.log('System error ', err);
			});
	};
	const Order = async (e) => {
		let currentLocation = {};
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords;
					currentLocation = { latitude, longitude };
					await getuser(currentLocation);
				},
				async (error) => {
					console.log(error);
					await getuser(currentLocation);
				}
			);
		} else {
			console.log('Geolocation is not supported by this browser.');
		}
	};
	const AddFav = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem('user');
		await fetch(`${backend}/user/fav/add`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'bearer ' + token,
			},
			body: JSON.stringify({ favorites: prod._id }),
		})
			.then((rsp) => rsp.json())
			.then((data) => {
				if (data.error) {
					console.log('Data error ', data.error);
				} else window.location.reload();
			})
			.catch((err) => {
				console.log('System error ', err);
			});
	};
	useEffect(() => {
		const user = async () => {
			setProd(props.props[0]);
			setUserName(props.props[1]);
		};
		user();
	}, [props.props]);
	const AddReview = (e) => {
		e.preventDefault();
		openReview();
		closePopup();
		console.log('Add Review');
	};
	const postReview = async (e) => {
		e.preventDefault();
		await fetch(`${backend}/hawker/postreview/` + { hawker }, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'bearer ' + token,
			},
			body: JSON.stringify({ userName, reviewInd, rating, hawker }),
		}).then(() => {
			window.location.reload();
		});
	};
	return (
		<div className="display-prod">
			<div className="prod-img">
				<img
					className="prod-img-dis"
					src={Prodimg}
				/>
			</div>
			<div className="details">
				<p className="prod-details">Item: {prod?.product}</p>
				<p className="prod-details-des">
					Description: {prod?.description}
				</p>
				<p className="prod-details">Price: {prod?.price}$</p>
				<button onClick={openPopup}>Order</button>
				<Modal
					isOpen={isOpen}
					className="modal-content"
					onRequestClose={closePopup}
					overlayClassName="modal-overlay"
				>
					<h1>Order</h1>
					<div className="order-now">
						<p className="order-now-details">
							Item: {prod?.product}
						</p>
						<p className="order-now-des">
							Description: {prod?.description}
						</p>
						<p className="order-now-details">
							Price: {prod?.price}$
						</p>
					</div>
					<div className="order-button">
						<input
							type="number"
							value={count}
							placeholder="Quantity"
							onChange={(e) => {
								if (
									e.target.value >= 0 &&
									e.target.value < prod?.quantity
								) {
									setCost(prod?.price * e.target.value);
									setCount(e.target.value);
								} else if (e.target.value >= 0) {
									setCost(prod?.price * prod?.quantity);
									setCount(prod?.quantity);
								}
							}}
						></input>
						<button
							onClick={(e) => {
								Order();
							}}
						>
							Order Now
						</button>
						<button
							style={{
								backgroundColor: 'yellow',
								color: 'black',
							}}
							onClick={AddFav}
						>
							Add to favourite
						</button>
						<p>Cost : {cost}$</p>
					</div>
					<button onClick={AddReview}>Add Review</button>
				</Modal>
				<Modal
					isOpen={revOpen}
					className="modal-content-review"
					onRequestClose={closeReview}
					overlayClassName="modal-overlay"
				>
					<div className="review-heading">
						<h1>Review</h1>
					</div>
					<p>Name: {userName}</p>
					<div className="rating-div">
						<p>Rating</p>
						<input
							type="number"
							min={1}
							max={5}
							value={rating}
							onChange={(e) => {
								console.log(e.target.value);
								if (e.target.value >= 1 && e.target.value <= 5)
									setRating(e.target.value);
							}}
						></input>
					</div>
					<textarea
						contentEditable
						type="text"
						value={reviewInd}
						placeholder="Write a Review"
						rows={10}
						onChange={(e) => {
							setReviewInd(e.target.value);
						}}
						style={{ resize: 'none', outline: 'none' }}
						required={true}
					></textarea>
					<div className="review-submit">
						<button onClick={postReview}>Submit</button>
					</div>
				</Modal>
			</div>
		</div>
	);
}
