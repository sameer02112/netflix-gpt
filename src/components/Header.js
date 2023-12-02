import React from 'react';
import { auth } from '../utils/firebase';
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user)

    const handleSignOut = () => {
        signOut(auth).then(() => {
            dispatch(removeUser());
            navigate('/');

          }).catch((error) => {
            // An error happened.
            navigate('/error');
          });
          
    }
    return (
        <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between">
            <img src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" 
                 alt="netflix-logo"
                 className="w-44"
                 />
            {user && 
                <div className="flex p-2 ">
                    <img src={user?.photoURL}
                    alt="user-icon"
                    className="w-12 h-12"
                    />
                    <button className="font-bold text-white m-2 p-2" onClick={handleSignOut}>Sign Out</button>
                </div>}
        </div>

    )
}

export default Header
