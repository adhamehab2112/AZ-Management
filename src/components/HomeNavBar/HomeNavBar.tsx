import AZ_Logo from "../../assets/logo2.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import axios from "axios";
function HomeNavBar() {
    let [userIcon, setUserIcon] = useState('');
    let [notificationCount, setNotificationCount] = useState(0);
    let userObjectString = localStorage.getItem('userDetails');
    let userObject = userObjectString ? JSON.parse(userObjectString) : null;
    let username: string = userObject.user.name;
    
    async function getNotificationCount() {
        const token = userObject?.token;

        if (!token) {
            console.error("Token not found");
            return;
        }

        try {
            const response = await axios.get("http://147.93.127.229:3008/notifications/count", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data);
            setNotificationCount(response.data.count);
        } catch (error) {
            console.error("Error fetching notification count:", error);
        }
    }

    useEffect(() => {
        setUserIcon(username.charAt(0).toUpperCase());
        getNotificationCount();
    }, []);

    return (
        <nav className='bg-gradient-to-r from-[#6f02bd] via-[#420484] to-[#6e02a0] p-2 flex items-center justify-between'>
            <div className="w-1/8">
                <img className="w-12" src={AZ_Logo} />
            </div>

            <div className="w-1/4">
                <ul className="flex items-center justify-between">
                    <li><button className='mx-4 text-white font-display cursor-pointer '>Home</button></li>
                    <li><button className='mx-4 text-white font-display cursor-pointer'>Files</button></li>
                    <li><button className='mx-4 text-white font-display cursor-pointer'>Notes</button></li>
                    <li><button className='mx-4 text-white font-display cursor-pointer'>Tasks</button></li>
                </ul>
            </div>
            <div className="flex items-center justify-between w-1/4">
                <div className="w-2/3">
                    <form className="max-w-md mx-auto">
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full h-3.5 p-4 ps-10 text-sm text-gray-900 border border-violet-800 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search Users ..." />
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-between w-1/4 ml-2">
                    <button className="mr-5 text-white font-display text-xl cursor-pointer hover:text-gray-400 transition-all duration-200  ">{userIcon}</button>
                    <div className="relative mr-5 cursor-pointer  ">
                        <FontAwesomeIcon icon={faBell} className=" text-white font-display text-xl hover:text-gray-400 transition-all duration-200" />
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                            {notificationCount}
                        </span>
                    </div>
                    <button className="mr-5  text-white font-display text-xl ">
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default HomeNavBar