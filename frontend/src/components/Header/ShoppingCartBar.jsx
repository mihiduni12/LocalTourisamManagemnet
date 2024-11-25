import React, { useEffect } from "react";
import "./shoppingCartBar.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GlobalproductsInCart } from "@/pages/OrganicItems/ShopInside";
import { GlobalonQuantityChange } from "@/pages/OrganicItems/ShopInside";
import { GlobalonProductRemove } from "@/pages/OrganicItems/ShopInside";
import { useUser } from "@clerk/clerk-react"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


function ShoppingCartBar({ visibilty, onClose }) {

	const { user } = useUser();
	let userID;

	try {
		const userId = user.id;
		userID = userId;
	} catch (error) {
		console.error("Error reading user.id:", error);
	}

	console.log(userID)

	const navigate = useNavigate();

	let cartCount;

	if (GlobalproductsInCart !== undefined) {
		cartCount = GlobalproductsInCart.length;
		console.log(cartCount);
	} else {
		console.log("GlobalproductsInCart is null");
	}

	const notify = () => {
		if (userID === undefined) {
			toast.error('User should be signed in'); // Display the toast notification 
		} else {
			toast.promise(
				handlePayment(),
				{
					loading: "Saving...",
					success: <b>Payment Success!</b>
				}
			);
		}
	};

	// Assuming GlobalproductsInCart is an array of objects containing product information
	// Assuming GlobalproductsInCart is an array of objects containing product information

	const handlePayment = async () => {
		const products = GlobalproductsInCart.map(product => `${product._id}-${product.name}`).join('\n');
		console.log(products)
		const data = {
			userID,
			products
		};

		try {

	// 	await axios.post("http://localhost:5555/bill", {
    //     User_ID: idd,
    //     date : new Date().toISOString().split('T')[0],
    //     Value:totalPrice,
    //     type:"ticket",
    //     status:"unpaid",
    //   });
			const response = await axios.post('http://localhost:5555/cart', data);
			console.log(response);
			// Assuming response.data is an array
			for (let i = 0; i < response.data.length; i++) {
				alert(response.data[i]);
			}
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div
			className="modal"
			style={{
				display: visibilty
					? "block"
					: "none",
			}}>
			<div className="shoppingCart">
				<div className="header">
					<h2>Shopping cart</h2>
					<button
						className="btn close-btn"
						onClick={onClose}>
						<AiFillCloseCircle
							size={30}
						/>
					</button>
				</div>
				<div className="cart-products">
					{GlobalproductsInCart && GlobalproductsInCart.length === 0 && (
						<span className="empty-text">
							Your basket is
							currently empty
						</span>
					)}
					{Array.isArray(GlobalproductsInCart) && GlobalproductsInCart.map((product) => (
						<div
							className="cart-product"
							key={product.id}>
							<img
								src={'http://localhost:5555/products' + '/' +
									product.image
								}
								alt={product.name}
							/>
							<div className="product-info">
								<h3>
									{product.name}
								</h3>
								<span className="product-price">
									Rs:
									{product.price *
										product.count}

								</span>
							</div>
							<select
								className="count"
								value={
									product.count
								}
								onChange={(
									event
								) => {
									GlobalonQuantityChange(
										product.id,
										event
											.target
											.value
									);
								}}>
								{[...Array(10).keys(),].map(
									(number) => {
										const num =
											number + 1;
										return (
											<option
												value={num}
												key={num}>	{num}</option>
										);
									}
								)}
							</select>
							<button
								className="btn remove-btn"
								onClick={() =>
									GlobalonProductRemove(
										product
									)
								}>
								<RiDeleteBin6Line
									size={20}
								/>
							</button>
						</div>
					))}
					{GlobalproductsInCart && GlobalproductsInCart.length > 0 && (
						<button className="p-[5px] text-center mx-auto rounded-[7px] mt-[12px] bg-[#b3f18e]" onClick={notify}>
							Proceed to checkout
						</button>
					)}
					<Toaster position="top-center"
						reverseOrder={false}
						gutter={13}
						containerClassName=""
						containerStyle={{}}
						toastOptions={{
							// Define default options
							className: '',
							duration: 5000,
							style: {
								background: '#363636',
								color: '#fff',
								boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.2)',
								padding: '4px 4px 4px 8px',
							},

							// Default options for specific types
							success: {
								duration: 5555,
								theme: {
									primary: 'green',
									secondary: 'black',
								},
							},
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default ShoppingCartBar;

