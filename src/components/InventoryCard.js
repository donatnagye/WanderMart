import React, { useState, useEffect } from 'react'
import img from '../images/chips.png'
import '../css/prodCard.css'
import Modal from 'react-modal';
import { backend } from '../urlConfig';
export default function InventoryCard(props) {
    const data = props.prod;
    const [isOpen, setIsOpen] = useState(false);
    const [product, setProduction] = useState(data.product);
    const [description, setDescription] = useState(data.description);
    const [price, setPrice] = useState(data.price);
    const [qty, setQty] = useState(data.quantity);
    const [edit, setEdit] = useState(1);
    const [editSave, setEditSave] = useState('Edit');
    const token = localStorage.getItem('hawker');
    const openPopup = (e) => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };
    const EditProd = async () => {
        console.log(data);
        console.log(editSave);
        setEdit(1 - edit);
        if (editSave === 'Edit') {
            setEditSave('Save');
        }
        else if (editSave === 'Save') {
            await fetch(`${backend}/hawker/editItem`, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: 'bearer ' + token,
                },
                body: JSON.stringify({
                    id: data._id,
                    product,
                    description,
                    price,
                    quantity: qty

                })
            }).then((rsp) => rsp.json())
                .then((data) => {
                    window.location.reload();
                }).catch((err) => {
                    console.log('error ', err);
                })
            setEditSave('Edit');
        }
    }
    const Delete = async () => {
        await fetch(`${backend}/hawker/deleteItem`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: 'bearer ' + token,
            },
            body: JSON.stringify({
                id: data._id
            })
        }).then((rsp) => rsp.json())
            .then((data) => {
                setTimeout(1000);
                window.location.reload();
            }).catch((err) => {
                console.log('error ', err);
            })
        setEditSave('Edit');
    }
    return (
        <div className="prodCard">
            <div className="prodImg">
                <img src={img} />
            </div>
            <div className="prodDetails">
                <p>Name : {data.product}</p>
                <p>Price : {data.price}$</p>
                <p>Description : {data.description}</p>
                <p>Available Qty : {data.quantity}</p>
                <div className="edit-button"><button onClick={openPopup}>Edit</button></div>
                <Modal isOpen={isOpen} className="modal-content" onRequestClose={closePopup} overlayClassName="modal-overlay">
                    <h1>Edit Product</h1>
                    <input className='editInput' type="text" id="product name" value={product} placeholder="Product Name" required onChange={(e) => { setProduction(e.target.value) }} disabled={edit} />
                    <input className='editInput' type="text" id="product description" value={description} placeholder="Product Description" required onChange={(e) => { setDescription(e.target.value) }} disabled={edit} />
                    <input className='editInput' type="number" step="0.1" id="product price" value={price} placeholder="Price" required onChange={(e) => { setPrice(e.target.value) }} disabled={edit} />
                    <input className='editInput' type="number" id="quantity" value={qty} placeholder="Quantity" required onChange={(e) => { setQty(e.target.value) }} disabled={edit} />
                    <div>
                        <button className="edit-delete-button" onClick={EditProd}>{editSave}</button>
                        <button className="edit-delete-button1" onClick={Delete}>Delete</button>
                    </div>
                </Modal>
            </div>
        </div>
    )
}