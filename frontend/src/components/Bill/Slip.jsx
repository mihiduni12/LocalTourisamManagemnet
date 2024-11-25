import React, { useState } from "react";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const Slip = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const id = JSON.parse(localStorage.getItem("id"));
  const total = JSON.parse(localStorage.getItem("total"));

  const handleFileUpload = async (file) => {
    if (file) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(file.name);
      setLoading(true);
      try {
        const snapshot = await fileRef.put(file);
        const url = await snapshot.ref.getDownloadURL();
        setImageUrl(url);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("No files selected.");
       
      console.log("No file selected");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storedIds = localStorage.getItem('filteredBillIds');
      if (!storedIds) {
        alert("No filtered bill IDs found in local storage.");
        return;
      }
      const filteredBillIds = JSON.parse(storedIds);

      for (const billId of filteredBillIds) {
        await axios.put(`http://localhost:5555/bill/${billId}`, {
          status: "pending",
        });
      }

      const response = await axios.post("http://localhost:5555/slips", {
        User_ID: id,
        Value: total,
        imagePath: imageUrl,
        date:new Date().toISOString().split('T')[0]
      });
      await axios.post("http://localhost:5555/noti", {
        date: new Date().toISOString(),
        status: "unread",
        description: "Your slip has been submitted for review",
        topic: "Slip",
        userID: id,
      });
      console.log("Response:", response.data);
      alert("Slip created successfully!");
      setImageUrl("");
      window.location.href = "/uploaded";
    } catch (error) {
      console.error("Error creating slip:", error);
      alert(`Please Select the file`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Upload Slip</h2>
          <h2 className="text-lg font-semibold mb-4 text-center text-gray-600">Your Bill Amount: Rs. {total}</h2>
          
          <form onSubmit={handleSubmit} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className="flex flex-col items-center">
            <div className="border-dashed border-2 border-gray-400 h-40 w-40 flex items-center justify-center mb-4" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
              <p>Drag &amp; Drop your file here</p>
            </div>
          
            <button
              className="bg-[#44d658] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading} // Disable button during loading
            >
              {loading ? "Uploading..." : "Upload Slip"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Slip;
