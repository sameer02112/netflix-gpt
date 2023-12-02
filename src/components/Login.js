import React from 'react';
import Header from './Header';
import { useState , useRef} from 'react';
import { checkValidData } from '../utils/validate';
import { useNavigate } from 'react-router';

import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const email = useRef(null);
    const password = useRef(null);
    const displayName = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
    const handleButtonClick = () => {
        // Validate the form data
        const message = checkValidData(email.current.value,password.current.value);
        setErrorMessage(message);
        if(message) return;

        // signUp
        if(!isSignInForm){
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                updateProfile(user, {
                  displayName: displayName.current.value, 
                  photoURL: "https://occ-0-6245-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABY20DrC9-11ewwAs6nfEgb1vrORxRPP9IGmlW1WtKuaLIz8VxCx5NryzDK3_ez064IsBGdXjVUT59G5IRuFdqZlCJCneepU.png?r=229"
                }).then(() => {
                  // Profile updated!
                  const {uid, email, displayName, photoURL} = auth.currentUser;
                  dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
                  navigate('/browse');
                }).catch((error) => {
                  // An error occurred
                  setErrorMessage(error.message);
                });
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
            });

        }
        // sign in
        else{
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigate('/browse');
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
            });
            
        }

        
        
    }


    return (
      <div>
        <Header />

        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c906271d-7184-4eec-83c9-b6d4c1a068ec/728874a6-eeda-400a-9bcf-a935a1408a4f/IN-en-20231127-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="body-image"
          className="absolute"
        />

        <form className="absolute p-12 bg-black w-3/12 my-36 mx-auto left-0 right-0 text-white bg-opacity-80" onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-4 my-2 w-full bg-gray-700"
              ref={displayName}
            />
          )}
          <input
            type="text"
            placeholder="Email Address"
            className="p-4 my-2 w-full bg-gray-700"
            ref={email}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-4 my-2 w-full bg-gray-700"
            ref={password}
          />

          <p className="text-red-500 font-bold text-lg p-2">{errorMessage}</p>

          <button className="p-4 my-6 bg-red-700 w-full rounded-lg"
            onClick={handleButtonClick}>
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p className="p-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to Netflix? Sign Up Now"
              : "Already a User? Sign In"}
          </p>
        </form>
      </div>
    );
}

export default Login
