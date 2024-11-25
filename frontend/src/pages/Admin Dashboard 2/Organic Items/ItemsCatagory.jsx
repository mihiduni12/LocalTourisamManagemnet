import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import PDFFile from '../Create Report/pdfItemTable';
import { PDFDownloadLink } from "@react-pdf/renderer";

const ItemsCatagory = () => {
    axios.defaults.baseURL = `http://localhost:5012`;
    const [items, setItems] = useState([]);

    const catagoryName = useParams().id;
    let value;
    if (catagoryName === "Nuts & Seeds") {
        value = "Nuts&Seeds";
    } else if (catagoryName === "Snacks") {
        value = "Snacks";
    } else if (catagoryName === "Sweetners") {
        value = "Sweetners";
    }
    console.log(value);

    const fetchItems = async () => {
        try {
            const response = await axios.get(`/api/${value}`);
            setItems(response.data.data);
        } catch (error) {
            console.error("Error fetching Nuts catagory:", error);
        }
    };

    const deleteItemsCatagory = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5012/products/${id}`);
            fetchItems()
            console.log(response);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2x
                console.error("Error status:", error.response.status);
                console.error("Error data:", error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error message:", error.message);
            }
            console.error("Error config:", error.config);
        }
    }

    const Navigate = useNavigate();

    const updateItemsCatagory = (id) => {
        Navigate(`/admin/updateItemsCatagory/${id}`)
    }

    const AddItemsCatagory = () => {
        Navigate(`/admin/addItemsCatagory/${catagoryName}`)
    }

    useEffect(() => {
        fetchItems()
    }, [])


    return (
        <>
            <div className="absolute ml-[320px] top-[110px] w-[1120px]">
                <div className="mt-12 mb-8 flex flex-col gap-12">
                    <Card>
                        <CardHeader variant="gradient" color="gray" className="mb-8 p-8">
                            <Typography variant="h5" color="white">
                                <PDFDownloadLink className='ml-[880px] mt-[-10px] rounded-[7px] mx-auto absolute bg-[#a0803b]' document={<PDFFile items={items} />} fileName="Report-category_table.pdf">
                                    {({ loading }) => (loading ? <button className='bg-BrownLi rounded-md p-[11px] font-CantoraOne font-bold text-[17px]'><motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 1.5,
                                            delay: 1 / 10,
                                        }}>Preparing...</motion.button></button> : <button className='bg-BrownLi rounded-md p-[11px] font-CantoraOne font-bold text-[17px]'>Monthly Report</button>)}
                                </PDFDownloadLink>
                                MANAGE PRODUCTS
                            </Typography>
                        </CardHeader>
                        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                            <div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        duration: 5,
                                        delay: 4 / 10,
                                    }}>
                                    <button type='button' onClick={AddItemsCatagory} className='p-[4px] h-[37px] w-[930px] text-[#000] mb-[20px] ml-[90px] rounded-[7px] bg-[#cbc88f]'>Add Item</button><br />
                                    <table className="min-w-[550px] table-auto ml-[90px]">
                                        <thead>
                                            <tr className="border">
                                                {["Item", "ID", "Name", "Img", "Options"].map((el) => (
                                                    <th
                                                        key={el}
                                                        className="border-b border-r border-blue-gray-50 py-3 px-5 text-left text-[16px]"
                                                    >
                                                        <Typography
                                                            variant="small"
                                                            className="text-[14px] font-bold uppercase text-blue-gray-400"
                                                        >
                                                            {el}
                                                        </Typography>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items?.length
                                                ?
                                                items.map((items) => (
                                                    <tr key={items._id} className='border h-[160px] text-center'>
                                                        <td className='border w-[110px]'>
                                                            <img className="max-h-[120px] transition duration-300 mx-auto" src={`http://localhost:5012/products/` + items.image} alt='Catagories' />
                                                        </td>
                                                        <td className='w-[240px]'>{items._id}</td>
                                                        <td className='border w-[180px]'>{items.name}</td>
                                                        <td className='border w-[200px]'>
                                                            {items.image}
                                                        </td>
                                                        <td className='flex-row align-middle w-[200px]'>

                                                            <button onClick={() => updateItemsCatagory(items._id)} className='p-[4px] py-[8px] w-[170px] rounded-[7px] bg-[#d0e0a0] mt-[10px] mb-[10px]'>Update Item</button><br />
                                                            <button onClick={() => deleteItemsCatagory(items._id)} className='p-[4px] py-[8px] w-[170px] rounded-[7px] bg-[#ba3434] text-[#fff] mb-[10px]'>Delete Item</button>
                                                        </td>
                                                    </tr>
                                                )) :
                                                <tr>
                                                    <td className="border px-4 py-2 text-center " rowSpan={10} colSpan={10}>No Data Found</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </motion.div>
                            </div>
                        </CardBody>
                    </Card>

                </div>
            </div>
        </>
    );
}

export default ItemsCatagory;
