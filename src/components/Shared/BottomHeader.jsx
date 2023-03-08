import React, {useState, useEffect} from 'react';
import Notifications from "./Notifications";
import {getAuth} from "firebase/auth";


import {UsersService} from "../../services/DatabaseService";
import {FiMoon, FiSun} from "react-icons/fi";
import useThemeSwitcher from "../../hooks/useThemeSwitcher";
// import {useNavigate} from "react-router";

const BottomHeader = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    const [user, setUser] = useState(getAuth().currentUser)
    const [userData, setUserData] = useState(null)
    const [activeTheme, setTheme] = useThemeSwitcher();

    // let navigate = useNavigate();

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth_Token')
        if (!authToken) {
            // navigate('/admin/auth/login')
        }

        getAuth().onAuthStateChanged(function (user) {

            if (user) {
                UsersService.getOne(user.uid)
                    .then(data => {
                        setUserData(data)
                    })
                setUserData(userData)
                setUser(user)

            } else {
                sessionStorage.getItem('Auth_Token')
                // navigate('/admin/auth/login')

            }
        });

    }, [])

    const logout = e => {
        const authentication = getAuth();
        authentication.signOut().then(
            response => {
                sessionStorage.removeItem('Auth_Token')
                // navigate('/admin/auth/login')
            }
        );
    }


    return (
        <div
            className="flex items-center justify-between w-full p-4 text-sm bg-white border-b md:py-0 md:px-12 d:text-md">
            <div className="mt-1 mr-4">{userData?.firstName} {userData?.lastName}</div>
            <div className="flex">
                {/*<div><Notifications/></div>*/}
                <div
                    onClick={() => setTheme(activeTheme)}
                    aria-label="Theme Switcher"
                    className="ml-8 bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
                >
                    {activeTheme === 'dark' ? (
                        <FiMoon className="text-ternary-dark hover:text-gray-400 dark:text-ternary-light dark:hover:text-primary-light text-xl" />
                    ) : (
                        <FiSun className="text-gray-200 hover:text-gray-50 text-xl" />
                    )}
                </div>
                <div className="relative">

                    <div
                        className="flex items-center cursor-pointer select-none group"
                        onClick={() => setMenuOpened(true)}>
                        <div
                            className="mr-1 text-gray-800 whitespace-nowrap group-hover:text-indigo-600 focus:text-indigo-600">
                            <span className="hidden ml-1 md:inline">{user?.email}</span>
                        </div>
                        <img className="h-10 w-10 rounded-full"
                             src={userData?.avatar}
                             alt=""/>
                    </div>
                    <div className={menuOpened ? '' : 'hidden'}>
                        <div
                            className="absolute top-0 right-0 left-auto z-20 py-2 mt-8 text-sm whitespace-nowrap bg-white rounded shadow-xl">
                            <a
                                href="/"
                                className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
                                onClick={() => setMenuOpened(false)}
                            >
                                My Profile
                            </a>
                            <a href="/"
                               className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
                               onClick={() => setMenuOpened(false)}
                            >
                                Manage Users
                            </a>
                            <a href="/"
                               onClick={logout}
                               className="block w-full px-6 py-2 text-left focus:outline-none hover:bg-indigo-600 hover:text-white"
                            >
                                Logout
                            </a>
                        </div>
                        <div
                            onClick={() => {
                                setMenuOpened(false);
                            }}
                            className="fixed inset-0 z-10 bg-black opacity-25"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BottomHeader