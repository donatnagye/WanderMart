import React, { useEffect, useState} from 'react';
import InventoryCard from './InventoryCard';
import '../css/inventory.css'
import { Search } from 'react-feather'
import Loading from './Loading';
import { backend } from '../urlConfig';
export default function ProfileCard() {
    const [product, setProduction] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [qty, setQty] = useState();
    const [allProduct, setAllProduct] = useState([]);
    const [file, setFile] = useState();
    const [rsp, setRsp] = useState([]);
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState();
    const [write, setWrite] = useState();
    const token = localStorage.getItem('hawker');
    const [itemfound, setItemFound] = useState([]);
    const [conn, setConn] = useState(0);
    const data = [
        {
            "product": "Milk",
            "description": "1 Liter Pack jdfgefkjg kjdnfgkjnfd jdnfgjndf jdnfgjndf jkdfngjndf dkjnfgjndfg jdfngjndfg ngjdnfgj",
            "price": 20,
            "quantity": 20
        },
        {
            "product": "Bread",
            "description": "Whole Wheat",
            "price": 10,
            "quantity": 25
        },
        {
            "product": "Eggs",
            "description": "Pack of 6",
            "price": 15,
            "quantity": 30
        },
        {
            "product": "Apple",
            "description": "Red Delicious",
            "price": 5,
            "quantity": 40
        },
        {
            "product": "Orange",
            "description": "Juicy",
            "price": 3,
            "quantity": 50
        },
        {
            "product": "Banana",
            "description": "Ripe",
            "price": 2,
            "quantity": 60
        },
        {
            "product": "Chicken",
            "description": "Boneless",
            "price": 50,
            "quantity": 10
        },
        {
            "product": "Tomato",
            "description": "Fresh",
            "price": 2,
            "quantity": 30
        },
        {
            "product": "Cucumber",
            "description": "Organic",
            "price": 2.5,
            "quantity": 20
        },
        {
            "product": "Carrot",
            "description": "Juicy",
            "price": 2,
            "quantity": 25
        },
        {
            "product": "Potato",
            "description": "Farm Fresh",
            "price": 1.5,
            "quantity": 35
        },
        {
            "product": "Onion",
            "description": "Red",
            "price": 2,
            "quantity": 40
        },
        {
            "product": "Lettuce",
            "description": "Green Leaf",
            "price": 3,
            "quantity": 15
        },
        {
            "product": "Broccoli",
            "description": "Fresh",
            "price": 4,
            "quantity": 20
        },
        {
            "product": "Spinach",
            "description": "Baby Spinach",
            "price": 3.5,
            "quantity": 25
        },
        {
            "product": "Cheese",
            "description": "Cheddar",
            "price": 6,
            "quantity": 10
        },
        {
            "product": "Yogurt",
            "description": "Strawberry",
            "price": 2.5,
            "quantity": 30
        },
        {
            "product": "Ice Cream",
            "description": "Vanilla",
            "price": 5,
            "quantity": 15
        },
        {
            "product": "Pasta",
            "description": "Spaghetti",
            "price": 3,
            "quantity": 25
        },
        {
            "product": "Rice",
            "description": "Basmati",
            "price": 4,
            "quantity": 30
        },
        {
            "product": "Burger Patty",
            "description": "Beef",
            "price": 8,
            "quantity": 12
        },
        {
            "product": "Salmon",
            "description": "Fresh Fillet",
            "price": 15,
            "quantity": 8
        },
        {
            "product": "Shrimp",
            "description": "Peeled and Deveined",
            "price": 12,
            "quantity": 20
        },
        {
            "product": "Lamb Chops",
            "description": "Grass-fed",
            "price": 18,
            "quantity": 10
        },
        {
            "product": "Avocado",
            "description": "Ripe",
            "price": 2.5,
            "quantity": 30
        },
        {
            "product": "Watermelon",
            "description": "Seedless",
            "price": 5,
            "quantity": 15
        },
        {
            "product": "Pineapple",
            "description": "Sweet and Juicy",
            "price": 3.5,
            "quantity": 20
        },
        {
            "product": "Grapes",
            "description": "Green Seedless",
            "price": 4,
            "quantity": 25
        },
        {
            "product": "Strawberries",
            "description": "Fresh",
            "price": 3,
            "quantity": 30
        },
        {
            "product": "Blueberries",
            "description": "Organic",
            "price": 4.5,
            "quantity": 20
        },
        {
            "product": "Raspberries",
            "description": "Packed with Antioxidants",
            "price": 5,
            "quantity": 15
        },
        {
            "product": "Blackberries",
            "description": "Sweet and Tangy",
            "price": 3.5,
            "quantity": 25
        },
        {
            "product": "Peaches",
            "description": "Juicy and Fragrant",
            "price": 2.5,
            "quantity": 35
        },
        {
            "product": "Plums",
            "description": "Sweet and Juicy",
            "price": 2,
            "quantity": 40
        },
        {
            "product": "Apricots",
            "description": "Velvety and Delicious",
            "price": 3,
            "quantity": 30
        },
        {
            "product": "Kiwi",
            "description": "Green and Fuzzy",
            "price": 2,
            "quantity": 25
        },
        {
            "product": "Mango",
            "description": "Ripe and Juicy",
            "price": 4,
            "quantity": 20
        },
        {
            "product": "Pears",
            "description": "Sweet and Juicy",
            "price": 2.5,
            "quantity": 25
        },
        {
            "product": "Cantaloupe",
            "description": "Fresh and Sweet",
            "price": 4,
            "quantity": 30
        },
        {
            "product": "Honeydew Melon",
            "description": "Juicy and Refreshing",
            "price": 3.5,
            "quantity": 35
        },
        {
            "product": "Lemon",
            "description": "Citrus",
            "price": 1.5,
            "quantity": 50
        },
        {
            "product": "Lime",
            "description": "Tart",
            "price": 1,
            "quantity": 40
        },
        {
            "product": "Papaya",
            "description": "Tropical",
            "price": 3,
            "quantity": 30
        },
        {
            "product": "Mushrooms",
            "description": "Button",
            "price": 2,
            "quantity": 20
        },
        {
            "product": "Bell Pepper",
            "description": "Red",
            "price": 2.5,
            "quantity": 25
        },
        {
            "product": "Zucchini",
            "description": "Fresh",
            "price": 2,
            "quantity": 30
        },
        {
            "product": "Corn",
            "description": "Sweet",
            "price": 1.5,
            "quantity": 40
        },
        {
            "product": "Asparagus",
            "description": "Green",
            "price": 3.5,
            "quantity": 15
        },
        {
            "product": "Cauliflower",
            "description": "White",
            "price": 2.5,
            "quantity": 20
        }
    ]
    useEffect(() => {
        const getData = async () => {
            await fetch(`${backend}/hawker/getItem`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: 'bearer ' + token,
                }
            }).then((rsp) => rsp.json())
                .then((data) => {
                    // console.log(data);
                    setConn(1);
                    setRsp(data.data);
                    setItems(data.data);
                }).catch((err) => {
                    console.log('error ', err);
                })

        }
        getData();
    }, [])
    const Add = async (e) => {
        e.preventDefault()
        if ((!product || !description || !price || !qty) && !file) {
            return;
        }
        if (!file) {
            let arr = []
            arr.push({ product, description, price, quantity: qty });
            await fetch(`${backend}/hawker/addItem`, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: 'bearer ' + token,
                },
                body: JSON.stringify({
                    allProduct: arr,
                })
            }).then((rsp) => rsp.json())
                .then((data) => {
                    console.log(data);
                    if (data.error) {
                        console.log('Data error ', data.error);
                    } else {
                        window.location.reload();
                        return;
                    }
                }).catch((err) => {
                    console.log('System error ', err);
                })
            return;
        }
        else {
            const reader = new FileReader();
            reader.onload = async (e) => {
                // console.log(e.target.result);
                await fetch(`${backend}/hawker/addItem`, {
                    method: 'POST',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: 'bearer ' + token,
                    },
                    body: JSON.stringify({
                        allProduct: e.target.result,
                    })
                }).then((rsp) => rsp.json())
                    .then((data) => {
                        console.log(data);
                        if (data.error) {
                            console.log('Data error ', data.error);
                        } else {
                            window.location.reload();
                            return;
                        }
                    }).catch((err) => {
                        console.log('System error ', err);
                    })
            };
            reader.readAsText(file);
            return;
        }
    }
    const SearchItem = async (e) => {
        if (e == 'Enter' && (write != undefined && write != '')) {
            console.log('1', write);
            Object.entries(items).map(([key, value]) => {
                // const s=value.product
                const ind1 = value.product.toLowerCase().indexOf(write.toLowerCase());
                const ind2 = value.description.toLowerCase().indexOf(write.toLowerCase());
                if (ind1 > -1 || ind2 > -1) {
                    let arr = itemfound;
                    arr.push(value);
                    setItemFound(arr);
                    setItems(itemfound);
                }
            })
            setSearch(write);
        }
    }
    setTimeout(conn, 1000);
    // console.log(items, write);
    return (
        <div className='main'>
            <div className="card4">
                <h1>Add Product</h1>
                <form>
                    <input className='editInput' type="text" id="product name" value={product} placeholder="Product Name" required onChange={(e) => { setProduction(e.target.value) }} />
                    <input className='editInput' type="text" id="product description" value={description} placeholder="Product Description" required onChange={(e) => { setDescription(e.target.value) }} />
                    <input className='editInput' type="number" step="0.1" id="product price" value={price} placeholder="Price" required onChange={(e) => { setPrice(e.target.value) }} />
                    <input className='editInput' type="number" id="quantity" value={qty} placeholder="Quantity" required onChange={(e) => { setQty(e.target.value) }} />
                    <h1 style={{ margin: '5px' }}>OR</h1>
                    <p style={{ margin: '5px', width: '90%' }}>Upload Product as Json file for multiple product. File must contain {'{ product, description, price, quantity  }'} as entries for each product.</p>
                    <label htmlFor="fileInput" className="chooseFileLabel">
                        Choose file:
                        <input type="file" id="fileInput" accept=".json" onChange={(e) => { console.log(e.target.files[0]); setFile(e.target.files[0]); }} />
                        {file && <p style={{ display: 'none' }}>Selected file: {file.name}</p>}
                    </label>
                    <button type="submit" onClick={(e) => { Add(e) }}>Add</button>

                </form>
            </div >

            <div className="card5">
                <div className="search-box" >
                    <div className="search-bar" >
                        <input type="text" className="search-input" value={write} placeholder="Search" onChange={(e) => { setWrite(e.target.value); setItemFound([]); setItems(rsp) }} onKeyDown={(e) => { SearchItem(e.key) }} />
                        <div className="search-icon">
                            <Search className="search" onClick={(e) => { SearchItem('Enter') }/*() => { setSearch(write) }*/} />
                        </div>
                    </div>
                </div>
                <div className="prodBox">
                    {
                        items === undefined ? <p>Nothing Added</p> : conn === 1 ? Object.entries(items).map(([key, value]) => {
                            return (
                                <InventoryCard prod={value} />
                            )
                        }) : <Loading />
                    }
                </div>
            </div >
        </div >
    );
}
