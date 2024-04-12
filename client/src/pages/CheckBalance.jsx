import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";

const CheckBalance = () => {
  const [balance, setBalance] = useState(null);
  const [pin, setPin] = useState("");
  const [localPin, setLocalPin] = useState(null);
  const [showPinModal, setShowPinModal] = useState(true);

  const getUser = async () => {
    try {
      const res = await axios.get(
        "https://vihaan007.onrender.com/users/getUser",
        {
          headers: {
            Authorization: `${localStorage.getItem("userId")}`,
          },
        }
      );
      setLocalPin(res.data.user.pin);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handlePinSubmit = async () => {
    if (pin == localPin) {
      try {
        console.log("PIN is correct. Fetching balance...", pin);
        await fetchBalance();
        setShowPinModal(false);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    } else {
      alert("Wrong PIN. Please try again.");
      setPin("");
    }
  };

  const fetchBalance = async () => {
    try {
      const res = await axios.get(
        "https://vihaan007.onrender.com/users/getUser",
        {
          headers: {
            Authorization: `${localStorage.getItem("userId")}`,
          },
        }
      );
      setBalance(res.data.user.amount);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (balance !== null && showPinModal === true) {
      setShowPinModal(false);
    }
  }, [balance, showPinModal]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Bank Balance</h1>
        {balance !== null ? (
          <div className="text-xl">
            Your current balance: ₹ <span className="font-bold">{balance}</span>
          </div>
        ) : (
          <div>Loading...</div>
        )}

        {/* Pin Modal */}
        {showPinModal && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="modal-content bg-white p-4 rounded-md">
              <label htmlFor="pin">Enter PIN:</label>
              <input
                type="password"
                id="pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="block w-full border border-black rounded-md mt-2"
              />

              <div className="flex flex-col">
                <div>
                  <button
                    onClick={handlePinSubmit}
                    className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Submit
                  </button>
                </div>
                {/* <div>
       <Link to="/checkbalanceoffline"><button className='mt-2 bg-blue-500 text-white px-4 py-2 rounded-md'>Check Offline</button></Link> 
    </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckBalance;
