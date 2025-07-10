import AZ_Logo from "../../assets/logo2.png"
import userLogo from "../../assets/user.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function HomeNavBar() {
    let [userIcon, setUserIcon] = useState('');
    let [notificationCount, setNotificationCount] = useState(0);
    let userObjectString = localStorage.getItem('userDetails');
    let userObject = userObjectString ? JSON.parse(userObjectString) : null;
    let username: string = userObject.user.name;

    let [notificationsSpinner, setNotificationsSpinner] = useState(false);
    let [dropdown, setDropdown] = useState(false);
    let [notifications, setNotifications] = useState([]);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const handleBellClick = () => {
        if (!dropdown) getNotifications();
        setDropdown(!dropdown);
    };

    async function getNotifications() {
        setNotificationsSpinner(true);
        try {
            let response = await axios.get(`http://147.93.127.229:3008/notifications`, {
                headers: {
                    Authorization: `Bearer ${userObject.token}`
                }
            });
            console.log("Notifications obj :", response);
            setNotifications(response.data.notifications);
            setNotificationsSpinner(false);
        }
        catch (e: any) {
            console.log(e);
        }
    }
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
            console.log(response.data.count);
            setNotificationCount(response.data.count);
        } catch (error) {
            console.error("Error fetching notification count:", error);
        }
    }

    useEffect(() => {
        setUserIcon(username.charAt(0).toUpperCase());
        getNotificationCount();
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdown(false);
                setNotificationCount(0);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, []);

    return (
        <nav className='fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#6f02bd] via-[#420484] to-[#6e02a0] p-2 flex items-center justify-between'>
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
                    <div className="relative mr-5 cursor-pointer" ref={dropdownRef}>
                        <FontAwesomeIcon
                            icon={faBell}
                            onClick={handleBellClick}
                            className="text-white font-display text-xl hover:text-gray-400 transition-all duration-200"
                        />
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                            {notificationCount}
                        </span>

                        {dropdown && (
                            <div className="absolute right-0 mt-5 w-110 bg-white shadow-lg rounded-lg z-50 max-h-80 overflow-auto  p-2">
                                <button className="my-3 mx-2 py-1 px-4 text-white rounded-xl font-display cursor-pointer bg-gradient-to-r from-[#6f02bd] via-[#420484] to-[#6e02a0]">Clear</button>
                                {notificationsSpinner ? <div className="text-center"><FontAwesomeIcon icon={faSpinner} spin className="text-violet-500 text-md" /> </div> : (
                                    notifications.map((notification: any, index: number) => (
                                        <div key={index} className={`mb-5 flex items-center gap-3 text-left p-2 rounded-md hover:bg-gray-300 shadow-sm  transition-all duration-200 ease-in-out ${notification.seen?"bg-white":"bg-gray-400"}`}>
                                            <img
                                                className="w-12 h-12 rounded-full object-cover"
                                                src={notification.actorId.imgUrl?notification.actorId.imgUrl:userLogo}
                                                alt="actor"
                                            />
                                            <p className="text-sm font-display">
                                                {notification.actorId.name} is invited you to his unit "
                                                {notification.unitName}"
                                            </p>
                                        </div>
                                    ))
                                )}

                            </div>
                        )}
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