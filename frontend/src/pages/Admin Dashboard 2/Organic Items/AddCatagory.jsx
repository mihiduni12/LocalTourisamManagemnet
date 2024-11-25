import React from 'react';
import { useRef, useState } from "react";
import axios from 'axios';
import { motion } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';
import {
    CardHeader,
    Typography,
    CardBody,
    Card
} from "@material-tailwind/react";

const AddCatagory = () => {

    const [name, setName] = useState('');
    const [files, setFiles] = useState(null);
    const inputRef = useRef();
    // console.log(inputRef.current.files[0]);

    const notify = () =>
        toast.promise(
            handleUpload(),
            {
                loading: "Saving...",
                success: <b>New Category Added!</b>,
                error: <b>Could not save.</b>,
            }
        );


    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setFiles(event.dataTransfer.files)
    };


    const handleUpload = async (e) => {
        const formdata = new FormData()
        formdata.append('file', files[0])
        formdata.append('name', name);
        try {
            const response = await axios.post('http://localhost:5012/catagories', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
            return response; // Return response for success
        } catch (error) {
            console.error("Error adding category:", error);
            throw error; // Throw error for failure
        }
    }


    return (
        <div className="absolute ml-[320px] top-[110px] w-[1120px]">
            <Card className='mt-[50px]'>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-8">
                    <Typography variant="h5" color="white">
                        ADD A NEW CATAGORIES
                    </Typography>
                </CardHeader>
                <div>
                    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                        <div>
                            <div id="logInBox" className="w-[370px] h-[40%] text-center min-h-67vh my-70px bg-[rgb(225,225,225)] rounded-[20px] mx-auto mt-[70px]">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        duration: 1.5,
                                        delay: 1 / 10,
                                    }}>
                                    <div className="mainContent">
                                        <div className="headerAndInputs text-center pt-[20px] mb-[60px]">

                                            <form onSubmit={(e) => {
                                                e.preventDefault(); // Prevent form submission
                                                notify(); // Call notify function
                                            }}>
                                                <div className="inputoxes">
                                                    <input type="text" name="name" htmlFor="name"
                                                        onChange={(e) => setName(e.target.value)} placeholder="Name of the Catagory" className="border-none pl-[10px] p-y-[40px] text-[12pt] mb-[3px] mt-[10px] rounded-[10px] bg-[rgba(255, 255, 255, 0.6)] h-[40px] w-[320px] hover:bg-[rgb(255,255,255)] transition-duration-70ms" id="name" />

                                                    <div
                                                        className="flex flex-col justify-center h-[200px] border-[2px] border-dashed border-[#282727] mx-[10%] mt-[20px] mb-[20px]"
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
                                                <div>
                                                    <button className="rounded-[7px] w-[300px] p-[6px] text-[#fff] bg-[#c33636] mt-[0] mb-[20px]" type="submit" >Submit</button>
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
                                                                duration: 3000,
                                                                theme: {
                                                                    primary: 'green',
                                                                    secondary: 'black',
                                                                },
                                                            },
                                                        }}
                                                    />
                                                </div>

                                            </form>
                                            {/* </form> */}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </CardBody>
                </div>
            </Card>
        </div>
    );
}

export default AddCatagory;
