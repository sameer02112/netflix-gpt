import React from 'react';
import Header from './Header';
import { useState , useRef} from 'react';
import { checkValidData } from '../utils/validate';

import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';
import { IMG_BG } from '../utils/constants';

const Login = () => {

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
                  photoURL: USER_AVATAR,
                }).then(() => {
                  // Profile updated!
                  const {uid, email, displayName, photoURL} = auth.currentUser;
                  dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));

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
          src={IMG_BG}
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
