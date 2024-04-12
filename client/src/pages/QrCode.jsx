import React, { useState, useEffect } from 'react';
import QRCode from "qrcode.react";
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';

const QrCode = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        getUser();
      },[]);
    
      const getUser = async () => {
        const res = await axios.get("https://dtu.onrender.com/users/getUser" , {
          headers: {
            Authorization: `${localStorage.getItem("userId")}`
          }
        });
        setData(res.data.user);
        console.log(res.data.user);
      }

    return (
        <>
            <Navbar/>
        <div className='flex flex-col gap-10 items-center justify-center '>
            <QRCode
                value={JSON.stringify({upiId: data.upiId  , receiverId : data._id})}
                style={{ width: "200px", height: "200px",marginTop:"100px"}}
                />
            <span className='border border-black p-3 rounded-md bg-white'>{data.upiId}</span>
        </div>
                </>
    );
}

export default QrCode;
