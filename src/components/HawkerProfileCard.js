import React, { useEffect, useState } from 'react';
import '../css/hawkerProfileCard.css';
import Profile from '../images/ProfilePic.jpg';
import { BsStarFill } from 'react-icons/bs';
import Modal from 'react-modal';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { backend } from '../urlConfig';
export default function ProfileCard() {
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [phone, setPhone] = useState();
	const [shop, setShop] = useState();
	const [showAll, setShowAll] = useState(false);
	const [showreview, setShowReview] = useState();
	const [ind, setInd] = useState(-1);
	const [isOpen, setIsOpen] = useState(false);
	const token = localStorage.getItem('hawker');
	const [review, setReviews] = useState([]);
	const [totRating, setTotRating] = useState(0);
	const totalStars = 5;
	const getStarIcon = (index, rating) => {
		const starValue = index + 1;
		if (starValue <= rating) {
			return (
				<FaStar
					key={index}
					className="star-filled"
				/>
			);
		} else if (starValue - rating < 1 && starValue - rating > 0) {
			return (
				<FaStarHalfAlt
					key={index}
					className="star-half-filled"
				/>
			);
		} else {
			return (
				<FaStar
					key={index}
					className="star-empty"
				/>
			);
		}
	};
	const openPopup = (e, indexs) => {
		setShowReview(e);
		setInd(indexs);
		setIsOpen(true);
	};

	const closePopup = () => {
		setIsOpen(false);
	};

	const toggleShowAll = () => {
		setShowAll(!showAll);
	};
	useEffect(() => {
		const getReview = async () => {
			await fetch(`${backend}/hawker/review/`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'bearer ' + token,
				},
			})
				.then((rsp) => rsp.json())
				.then((data) => {
					if (data.error) {
						console.log('Data error ', data.error);
					}
					// console.log(Object.entries(data));
					let arr = [];
					var rat = 0;
					Object.entries(data).forEach(([key, value]) => {
						rat = rat + value.rating;
					});
					rat = rat / Object.entries(data).length;
					setTotRating(rat);
					Object.entries(data)
						.slice(-50)
						.forEach(([key, value]) => {
							arr.push({
								rating: value.rating,
								message: value.review,
							});
						});
					setReviews(arr);
					// console.log(arr);
				})
				.catch((err) => {
					console.log('System error ', err);
				});
		};
		getReview();
	}, []);

	const data = [
		{
			item: 'Milk',
			quantity: 5,
		},
		{
			item: 'Milk',
			quantity: 3,
		},
		{
			item: 'Milk',
			quantity: 1,
		},
		{
			item: 'Chocolate',
			quantity: 5,
		},
		{
			item: 'Milky Bar',
			quantity: 5,
		},
		{
			item: 'Bread',
			quantity: 5,
		},
		{
			item: 'Milky Bar',
			quantity: 5,
		},
		{
			item: 'Bread',
			quantity: 5,
		},
		{
			item: 'Milky Bar',
			quantity: 5,
		},
		{
			item: 'Bread',
			quantity: 5,
		},
	];
	useEffect(() => {
		const token = localStorage.getItem('hawker');
		const getuser = async () => {
			await fetch(`${backend}/hawker/signed`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'bearer ' + token,
				},
				body: JSON.stringify({
					token,
				}),
			})
				.then((rsp) => rsp.json())
				.then((data) => {
					if (data.error) {
						console.log('Data error ', data.error);
					} else {
						setName(data.user.name);
						setShop(data.user.shop);
					}
				})
				.catch((err) => {
					console.log('System error ', err);
				});
		};
		getuser();
	}, []);
	return (
		<div className="main">
			<div className="card">
				<img
					src={Profile}
					className="ProfileCardPic"
				/>
				<div className="shopName">
					<h1>{shop ? shop : 'My Store'}</h1>
				</div>
			</div>
			<div className="card2">
				<div className="rating-section">
					<div className="rated-review">
						<h3 style={{ margin: '10px' }}>Rating</h3>
						<div className="rate">
							<p style={{ margin: '5px' }}>{totRating}</p>{' '}
							<BsStarFill color="yellow" />
						</div>
					</div>
					<div className="reviewMenu">
						<h3 style={{ margin: '10px' }}>Reviews</h3>
						<div className="reviewSection">
							{review?.map((review, index) => {
								return (
									<div className="reviewList">
										<div className="review">
											<p id="reviewStar">
												{' '}
												{review.rating}{' '}
												<BsStarFill color="yellow" />{' '}
											</p>{' '}
											<button
												className="read"
												onClick={(e) => {
													openPopup(
														review.message,
														index
													);
												}}
											>
												Read
											</button>
										</div>
										<Modal
											isOpen={isOpen && ind === index}
											onRequestClose={closePopup}
											className="modal-content"
											overlayClassName="modal-overlay"
										>
											<h2>Review</h2>
											<div className="rating">
												{[...Array(totalStars)].map(
													(_, index) =>
														getStarIcon(
															index,
															review.rating
														)
												)}
											</div>
											<div className="reviewText">
												<p style={{ margin: '20px' }}>
													{showreview}
												</p>
											</div>
											<button
												onClick={closePopup}
												className="close"
											>
												Close
											</button>
										</Modal>
									</div>
								);
							})}
						</div>
					</div>
					<div className="rated-review">
						<h3 style={{ margin: '10px' }}>Pending Orders</h3>
						<div className="rate">35</div>
					</div>
					<div className="rated-review">
						<h3 style={{ margin: '10px' }}>Completed Orders</h3>
						<div className="rate">500</div>
					</div>
				</div>
				<div className="order-section">
					<div className="orderMenu">
						<h3>New Orders</h3>
						<div className="scrollMenu">
							{data
								?.slice(0, showAll ? data.length : 5)
								.map((item) => {
									return (
										<div className="orderList">
											<div className="order">
												<p
													style={{
														width: '80%',
														overflowX: 'auto',
													}}
												>
													{' '}
													{item.item}
												</p>{' '}
												<p style={{ width: '100px' }}>
													{' '}
													Qty : {item.quantity}
												</p>{' '}
											</div>
											<div className="order-buttons">
												<button id="accept">
													Accept
												</button>
												<button id="reject">
													{' '}
													Reject
												</button>
											</div>
										</div>
									);
								})}
							{!showAll && (
								<div className="view-all-button">
									<button
										onClick={toggleShowAll}
										id="viewButton"
									>
										View all {'>'}
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
