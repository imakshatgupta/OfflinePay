import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/logo.png";

export default function Signup() {
  return (
    <div>
      <section className="">
        <div className="flex flex-col items-center justify-center  mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-66 h-24 mr-2"
              src={logo}
              alt="logo"
            />
          </Link>
          <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  bg-gray-100">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2x">
                Sign Up
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    for="email"
                    className="block mb-2  text-left text=black text-sm font-medium "
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="text"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Username"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="email"
                    className="block mb-2  text-left text=black text-sm font-medium "
                  >
                    FullName
                  </label>
                  <input
                    type="text"
                    name="text"
                    id="fullname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="FullName"
                    required=""
                    
                  />
                </div>
                <div>
                  <label
                    for="email"
                    className="block mb-2  text-left text=black text-sm font-medium "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="text"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Email"
                    required=""
                   
                  />
                </div>
                <div>
                  <label
                    for="pin"
                    className="block mb-2  text-left text=black text-sm font-medium "
                  >
                    PIN
                  </label>
                  <input
                    type="Number"
                    name="text"
                    id="pin"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter your Pin"
                    required=""
                    
                  />
                </div>
                <div>
                  <label
                    for="phoneNo"
                    className="block mb-2  text-left text=black text-sm font-medium "
                  >
                    Phone
                  </label>
                  <input
                    type="number"
                    name="text"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Mobile Number"
                    required=""
                  
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-left text-black"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required=""
                   
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-black"
                >
                  Sign Up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Have account ?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline text-black"
                  >
                    Login
                  </Link>
                    
                  
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
