import React from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const navigate = useNavigate();
    return(<>
        <main className="py-80 flex justify-center min-h-full">
          <div className="inline-block align-middle min-h-full">
            <p className="text-center mb-5 font-bold text-xl">App</p>
            <div className="flex justify-center gap-5">
                <button className="p-3 bg-pink-400 text-white-100 font-medium rounded hover:bg-gray-200" onClick={() => {navigate('/login')}}>LogIn</button>
                <button className="p-3 bg-pink-400 text-white-100 font-medium rounded hover:bg-gray-200" onClick={() => {navigate('/signup')}}>SignUp</button>
            </div>
            
          </div>
        </main>
    </>);
}

export default Auth;