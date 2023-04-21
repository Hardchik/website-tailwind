import React from "react";
import { useNavigate } from "react-router-dom";
import {FcGoogle} from 'react-icons/fc'

const SignIn = () => {
    const navigate = useNavigate();
    return(<>
        <div className="h-full flex justify-center">
            <div className="py-48">
            <div className="shadow-2xl p-10 w-80">
                <p className="p-8 text-center font-bold text-2xl">Welcome</p>
                <div className="space-y-5">
                    <div className="relative">
                        <label
                            htmlFor="email"
                            className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="block p-2 h-12 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder=""
                        />
                    </div>

                    <div className="relative">
                        <label
                            htmlFor="password"
                            className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="email"
                            className="block p-2 h-12 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder=""
                        />
                    </div>
                </div>
                <div className="block w-full mt-3 space-y-3">
                    <a href='#' className="text-sm w-full text-blue-400 font-bold">Forgot password?</a>
                    <button onClick={() => {navigate('/dashboard')}} className="w-full p-3 bg-pinky block align-center">Continue</button>
                </div>
                <div className="flex text-sm mt-2"><p>Don't have an account? <a href="/signup" className="text-blue-400 font-medium">Sign up</a></p></div>
                <div className="h-full flex justify-center text-middle align-center w-full align-middle space-x-2 mt-2"><hr className="w-24" /><p className="text-xs">OR</p><hr className="w-24" /></div>
                <button className="flex w-full border h-full text-middle mt-3 p-2.5 align-center"><FcGoogle className="align-self mr-3 middle text-2xl" /> Continue with Google</button>
            </div>
            </div>
        </div>
    </>);
}

export default SignIn;