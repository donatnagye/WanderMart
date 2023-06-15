import React, { useEffect, useState } from 'react';
import Prodimg from '../images/chips.png';
import Modal from 'react-modal';

export default function IndividualCard(props) {
	const [prod, setProd] = useState();
	const [isOpen, setIsOpen] = useState(false);
	const [cost, setCost] = useState(0);
	const [count, setCount] = useState(0);
	const openPopup = (e) => {
		setIsOpen(true);
	};

	const closePopup = () => {
		setIsOpen(false);
	};
	useEffect(() => {
		setProd(props.props);
	}, []);
	// console.log(prod);
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
						<button>Order Now</button>
						<button
							style={{
								backgroundColor: 'yellow',
								color: 'black',
							}}
						>
							Add to favourite
						</button>
						<p>Cost : {cost} S</p>
					</div>
				</Modal>
			</div>
		</div>
	);
}
