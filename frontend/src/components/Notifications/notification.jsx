import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useUser } from "@clerk/clerk-react"

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  let userID;

  try {
    const userId = user.id;
    userID = userId;
  } catch (error) {
    console.error("Error reading user.id:", error);
  }

  useEffect(() => {
    axios.get(`http://localhost:5555/noti?userID=${userID}`)
      .then(response => {
        // Sort notifications by date in descending order
        const sortedNotifications = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setNotifications(sortedNotifications);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      });
  }, [userID]);

  const deleteNotification = (id) => {
    axios.delete(`http://localhost:5555/noti/${id}`)
      .then(() => {
        setNotifications(notifications.filter(notification => notification._id !== id));
      })
      .catch(error => {
        console.error('Error deleting notification:', error);
      });
  };
  
  const deleteAllNotifications = () => {
    const deleteNotificationById = (idList) => {
      if (idList.length === 0) {
        window.location.reload();
        return;
      }
  
      const idToDelete = idList.pop();
      axios.delete(`http://localhost:5555/noti/${idToDelete}`)
        .then(response => {
          if (response.status === 200) {
            deleteNotificationById(idList);
          } else {
            console.error('Error deleting notification:', idToDelete);
          }
        })
        .catch(error => {
          console.error('Error deleting notification:', idToDelete, error);
        });
    };
  
    const notificationIds = notifications.map(notification => notification._id);
    deleteNotificationById(notificationIds);
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-[1300px] w-full">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {notifications.map((notification) => {
              const parsedDate = new Date(notification.date);
              const date = parsedDate.toDateString();
              const sriLankaOffset = 5.5 * 60 * 60 * 1000;
              const sriLankaTime = new Date(parsedDate.getTime() + sriLankaOffset);
              const hours = sriLankaTime.getHours();
              const minutes = sriLankaTime.getMinutes();
              const ampm = hours >= 12 ? 'PM' : 'AM';
              const displayHours = hours % 12 || 12;
              const time = `${displayHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

              return (
                <div
                  key={notification._id} // Use notification._id instead of notification.notificationID
                  className="bg-white rounded-lg shadow-lg mb-4 p-4 flex justify-between items-center border-[#8b8b8b] border-[3px]"
                  style={{ fontFamily: 'Arial', fontSize: '18px', minHeight: '80px' }}
                >
                  <div>
                    <div className="mb-2 font-serif">
                      <span className="text-[#757575] font-semibold">Description: </span>
                      <span>{notification.description}</span>
                    </div>
                    <div className="mb-2 font-serif">
                      <span className="text-[#757575] font-semibold">Date: </span>
                      <span>{date}</span>
                    </div>
                    <div className="mb-2 font-serif">
                      <span className="text-[#757575] font-semibold">Time : </span>
                      <span>{time}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteNotification(notification._id)}
                    className="bg-[#FF0000] hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
            {notifications.length > 0 && (
              <div className="flex justify-center">
                <button
                  onClick={deleteAllNotifications}
                  className="bg-[#FF0000] hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Delete All
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Notifications;
