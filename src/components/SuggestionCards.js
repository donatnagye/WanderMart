import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import img1 from '../images/adds/add1.jpeg';
import img2 from '../images/adds/add2.jpeg';
import img3 from '../images/adds/add3.jpeg';
import img4 from '../images/adds/add4.jpeg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import IndividualCard from './IndividualCards';
export default function SuggestionCards(props) {
	const [hawkers, setHawkers] = useState([]);
	const [items, setItems] = useState([]);
	const [count, setCount] = useState(1);
	useEffect(() => {
		// console.log(props.prop);
		setHawkers(props.prop);
		let arr = items;
		Object.entries(props.prop).map(([key, value]) => {
			len += value?.Items.length;
			for (let i = 0; i < value.Items.length; i++) {
				arr.push(value?.Items[i]);
			}
			setItems(arr);
		});
		console.log(arr);
	}, []);

	var settings = {
		dots: true,
		infinite: true,
		arrows: false,
		rows: 1,
		speed: 500,
		autoplay: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1350,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 3,
					initialSlide: 6,
				},
			},
			{
				breakpoint: 1050,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					initialSlide: 3,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 400,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	const itemsPerPage = 20;
	var len = items.length;

	// Calculate the total number of pages
	const totalPages = Math.ceil(len / itemsPerPage);
	console.log(totalPages, count);

	// State to keep track of the current page
	const [currentPage, setCurrentPage] = useState(1);

	// Calculate the start and end indices for the current page
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	// Get the entries for the current page
	const entries = Object.entries(items)
		?.slice(startIndex, endIndex)
		.map(([key2, val]) => {
			return (
				<div
					className="displayCards"
					key={key2}
				>
					<IndividualCard props={val} />
				</div>
			);
		});
	// Function to handle page change
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	// console.log(hawkers);
	return (
		<div>
			<div>
				<Slider {...settings}>
					<div className="adds">
						<img src={img1} />
					</div>
					<div className="adds">
						<img src={img2} />
					</div>
					<div className="adds">
						<img src={img3} />
					</div>
					<div className="adds">
						<img src={img4} />
					</div>
					<div className="adds">
						<img src={img4} />
					</div>
					<div className="adds">
						<img src={img4} />
					</div>
					<div className="adds">
						<img src={img4} />
					</div>
				</Slider>
			</div>
			<div className="AllCards">{entries}</div>
			<div className="Pages">
				<button
					onClick={(e) => {
						if (count > 1) {
							setCount(count - 1);
						}
					}}
				>
					{'<'}
				</button>
				<div className="Pagination">
					{Array.from(
						{
							length:
								count * 5 <= totalPages ? 5 : totalPages % 5,
						},
						(_, index) => index + 1
					)
						.map((page) => (count - 1) * 5 + page)
						.map((page) => (
							<button
								key={page}
								onClick={() => handlePageChange(page)}
							>
								{page}
							</button>
						))}
				</div>
				<button
					onClick={(e) => {
						if (count * 5 < totalPages) {
							setCount(count + 1);
						}
					}}
				>
					{'>'}
				</button>
			</div>
		</div>
	);
}
