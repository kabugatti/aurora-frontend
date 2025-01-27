import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const Notification = () => {
    const [Notification, setNotification] = useState([]);
    const notifications = [
        "You have a new message from John.",
        "Your profile was viewed 5 times today.",
        "New comment on your post.",
        "Your subscription is about to expire.",
        "System maintenance scheduled for tomorrow.",
    ];
    useEffect(() => {
        setNotification(notifications)
    }, [])
    const deleteNotification = (notificationtodel) => {
        setNotification(Notification.filter((notification) => notification !== notificationtodel))
    }
    return (
        <>
            <div className='text-xl font-semibold'>Available Notifications</div>
            {Notification.length > 0 ?
                (Notification.map((notification, index) => (<div className='flex justify-between p-5 cursor-pointer hover:bg-gray-100' key={index} ><div className="text-md" >{notification}</div> <div className="text-red-500 hover:text-red-700" onClick={() => deleteNotification(notification)}><Trash2 /></div></div>)))
                : (<div>No Notifications </div>)}
        </>)
}

export default Notification