import React from 'react';
import { useRef, useState } from "react";
import axios from 'axios';
import { motion } from "framer-motion";
import {
    Card,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const AddItemsCatagory = () => {
    const [name, setName] = useState('');
    const [nameDesc, setNameDesc] = useState('');
    const [price, setPrice] = useState('');
    const [discPrice, setDiscPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState(null);
    const inputRef = useRef();

    const id = useParams().id;

    let typeValue;
    if (id === 'Nuts & Seeds') {
        typeValue = 'nuts&seeds';
    }
    else if (id === 'Snacks') {
        typeValue = 'snacks';
    }
    else if (id === 'Beverages') {
        typeValue = 'snacks';
    }
    else if (id === 'Grains') {
        typeValue = 'grains';
    }
    else if (id === 'Oils') {
        typeValue = 'oils';
    }
    else if (id === 'Sweetners') {
        typeValue = 'sweatners';
    }

    console.log(typeValue);

    const [type, setType] = useState(typeValue);

    const setData = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "quantity":
                setQuantity(value);
                break;
        }
        if (
            name === "quantity"
        ) {
            // Update this line
            console.log(`Selected ${name}:`, value);
        }
    };

    const [items, setItems] = useState([]);

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setFiles(event.dataTransfer.files)
    };

    const notify = () =>
        toast.promise(
            handleUpload(),
            {
                loading: "Saving...",
                success: <b>New Category Added!</b>,
                error: <b>Could not save.</b>,
            }
        );

    // send files to the server // learn from my other video
    const handleUpload = async (e) => {
        const formdata = new FormData()
        formdata.append('file', files[0])
        formdata.append('name', name);
        formdata.append('nameDesc', nameDesc);
        formdata.append('price', price);
        formdata.append('discPrice', discPrice);
        formdata.append('type', type);
        formdata.append('quantity', quantity);
        formdata.append('description', description);
        try {
            const response = await axios.post('http://localhost:5012/products', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
        } catch (error) {
            console.error("Error adding category:", error);
        }
    }
    return (
        <div>
            <div className="absolute ml-[320px] top-[110px] w-[1120px]">
                <Card className='mt-[50px]'>
                    <CardHeader variant="gradient" color="gray" className="mb-8 p-8">
                        <Typography variant="h5" color="white">
                            ADD A NEW PRODUCT
                        </Typography>
                    </CardHeader>
                    <div>
                        <div id="logInBox" className="w-[370px] h-[40%] text-center min-h-67vh my-70px bg-[rgb(225,225,225)] rounded-[20px] mx-auto mb-[60px] mt-[30px]">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: .8,
                                    delay: 1 / 10,
                                }}>
                                <div className="mainContent">
                                    <div className="headerAndInputs text-center pt-[20px]">
                                        <form onSubmit={(e) => {
                                            e.preventDefault(); // Prevent form submission
                                            notify(); // Call notify function
                                        }}>

                                            <div className="inputBoxes">
                                                <input type="text" name="name" htmlFor="name"
                                                    onChange={(e) => setName(e.target.value)} placeholder="Name of the Item" className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)]" id="name" />
                                                <input type="text" name="nameDesc" htmlFor="nameDesc"
                                                    onChange={(e) => setNameDesc(e.target.value)} placeholder="More about the Product" className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)]" id="name" />
                                                <input type="text" name="price" htmlFor="price"
                                                    onChange={(e) => setPrice(e.target.value)} placeholder="Price of the Item" className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)]" id="name" />
                                                <input type="text" name="discPrice" htmlFor="discPrice"
                                                    onChange={(e) => setDiscPrice(e.target.value)} placeholder="Discount price of the Item" className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)]" id="name" />

                                                <div className="mb-3 w-50 flex mt-[10px]">
                                                    <label className="ml-[35px]">Quantity</label>
                                                    <div className="ml-[30px]">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="quantity"
                                                            id="8"
                                                            value="8"
                                                            onChange={setData}
                                                            checked={quantity === "8"}
                                                        />
                                                        <label className="ml-[5px]" htmlFor="8">
                                                            8 oz.
                                                        </label>
                                                    </div>
                                                    <div className="ml-[10px]">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="quantity"
                                                            id="9"
                                                            value="9"
                                                            onChange={setData}
                                                            checked={quantity === "9"}
                                                        />
                                                        <label className="ml-[5px]" htmlFor="9">
                                                            9 oz.
                                                        </label>
                                                    </div>
                                                    <div className="ml-[10px]">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="quantity"
                                                            id="10"
                                                            value="10"
                                                            onChange={setData}
                                                            checked={quantity === "10"}
                                                        />
                                                        <label className="ml-[5px]" htmlFor="10">
                                                            10 oz.
                                                        </label>
                                                    </div>
                                                </div>

                                                <input type="text" name="Description" htmlFor="Description"
                                                    onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[5px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)]" id="name" />

                                                <input type="text" name="type" htmlFor="type"
                                                    onChange={(e) => setType(e.target.value)} className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)]" id="name" hidden />

                                                <div
                                                    className="flex flex-col justify-center h-[200px]  border-[2px] border-dashed border-[#282727] mx-[10%] mt-[20px] mb-[20px]"
                                                    onDragOver={handleDragOver}
                                                    onDrop={handleDrop}
                                                >
                                                    <h1>Drag and Drop Files to Upload</h1>
                                                    <h1>Or</h1>
                                                    <input
                                                        type="file"
                                                        multiple
                                                        onChange={(event) => setFiles(event.target.files)}
                                                        hidden
                                                        accept="image/png, image/jpeg"
                                                        ref={inputRef}
                                                    />
                                                    <button type="button" onClick={() => inputRef.current.click()}>Select Files</button>
                                                </div>
                                            </div>
                                            {files && (
                                                <div className="uploads">
                                                    <ul>
                                                        {Array.from(files).map((file, idx) => <li className="font-[12pt]" key={idx}>{file.name}</li>)}
                                                    </ul>
                                                    <div className="actions ">
                                                        <button className="rounded-[7px] p-[7px] bg-[#e9eda1] mb-[0]" onClick={() => setFiles(null)}>Cancel</button> <br />
                                                        <br />
                                                    </div>
                                                </div>
                                            )}
                                            <button className="rounded-[7px] w-[300px] p-[6px] text-[#fff] bg-[#c33636] mt-[0] mb-[20px]" type="submit" >Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default AddItemsCatagory;
