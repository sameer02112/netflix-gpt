import React,{useEffect} from 'react';
import { auth } from '../utils/firebase';
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { addUser } from '../utils/userSlice';
import { onAuthStateChanged } from "firebase/auth";
import { LOGO } from '../utils/constants';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              const {uid, email, displayName, photoURL} = user;
              dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
              navigate('/browse');
            } else {
              dispatch(removeUser());
              navigate('/');
            }
          });
          return () => {
              unsubscribe();
          }
    }, [])

    const handleSignOut = () => {
        signOut(auth).then(() => {
            dispatch(removeUser());
          }).catch((error) => {
            navigate('/error');
          });
          
    }

    return (
        <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between">
            <img src={LOGO}
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
