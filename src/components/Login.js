import React from 'react';
import Header from './Header';
import { useState } from 'react';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }


    return (
        <div>
            <Header/>

            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/c906271d-7184-4eec-83c9-b6d4c1a068ec/728874a6-eeda-400a-9bcf-a935a1408a4f/IN-en-20231127-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                 alt="body-image"
                 className="absolute"/>

            <form className="absolute p-12 bg-black w-3/12 my-36 mx-auto left-0 right-0 text-white bg-opacity-80">
                <h1 className="text-bold text-3xl py-4">{isSignInForm ?  'Sign In' : 'Sign Up'}</h1>
                {!isSignInForm && <input type="text" placeholder="Full Name" className="p-4 my-2 w-full bg-gray-700"/>}
                <input type="text" placeholder="Email Address" className="p-4 my-2 w-full bg-gray-700"/>
                <input type="password" placeholder="Password" className="p-4 my-2 w-full bg-gray-700"/>
                <button className="p-4 my-6 bg-red-700 w-full rounded-lg">{isSignInForm ?  'Sign In' : 'Sign Up'}</button>
                <p className="p-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ?  'New to Netflix? Sign Up Now' : 'Already a User? Sign In'}</p>
            </form>
        </div>
    )
}

export default Login
