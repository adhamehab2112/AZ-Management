import AZ_Logo from "../../assets/logo2.png";
import userLogo from "../../assets/user.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faRightFromBracket, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

function HomeNavBar() {

    let location = useLocation();
    let navigate = useNavigate();

    let [userIcon, setUserIcon] = useState("");
    let [notificationCount, setNotificationCount] = useState(0);
    let [notificationsSpinner, setNotificationsSpinner] = useState(false);
    let [dropdown, setDropdown] = useState(false);
    let [notifications, setNotifications] = useState([]);
    let [usersSearchDropdown, setUsersSearchDropdown] = useState(false);
    let [usersSpinner, setUsersSpinner] = useState(false);
    let [allUsers, setAllUsers] = useState([]);
    let [usersSearchValue, setUsersSearchValue] = useState("");
    let [filteredUsers, setFilteredUsers] = useState([]);

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const usersSearchRef = useRef<HTMLDivElement | null>(null);

    const userObjectString = localStorage.getItem("userDetails");
    const userObject = userObjectString ? JSON.parse(userObjectString) : null;
    const username: string = userObject?.user?.name || "";

   function handleLogout()
   {
    localStorage.removeItem('userDetails');
    navigate("/");

   }
   
    function handleBellClick() {
        if (!dropdown) getNotifications();
        setDropdown(!dropdown);
    }

    function handleUsersSearch() {
        if (!usersSearchDropdown) getAllUsers();
        setUsersSearchDropdown(true);
    }
    async function getAllUsers() {
        setUsersSpinner(true);
        try {

            let response = await axios.get(`http://147.93.127.229:3008/users`);
            console.log(response.data);
            setAllUsers(response.data);
            setUsersSpinner(false);
        }
        catch (e: any) {
            console.log(e);
        }
    }
    async function getNotifications() {
        setNotificationsSpinner(true);
        try {
            const response = await axios.get(`http://147.93.127.229:3008/notifications`, {
                headers: {
                    Authorization: `Bearer ${userObject.token}`,
                },
            });
            setNotifications(response.data.notifications.reverse());
        } catch (e: any) {
            console.log(e);
        } finally {
            setNotificationsSpinner(false);
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
            setNotificationCount(response.data.count);
        } catch (error) {
            console.error("Error fetching notification count:", error);
        }
    }
    

    useEffect(() => {
        setUserIcon(username.charAt(0).toUpperCase());
        getNotificationCount();
        const interval = setInterval(() => {
            getNotificationCount();
        }, 3000);
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (dropdownRef.current && !dropdownRef.current.contains(target)) {
                setDropdown(false);
                setNotificationCount(0);
            }
            if (usersSearchRef.current && !usersSearchRef.current.contains(target)) {
                setUsersSearchDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    useEffect(() => {
        if (usersSearchValue.trim() === "") {
            setFilteredUsers([]);
            return;
        }

        const filtered = allUsers.filter((user: any) =>
            user.name.toLowerCase().includes(usersSearchValue.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [usersSearchValue]);
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#29015f] via-[#4204a0] to-[#6e02a0] p-2 flex items-center justify-between">
            <div className="w-1/8">
                <img className="w-12" src={AZ_Logo} />
            </div>

            <div className="w-1/4">
                <ul className="flex items-center justify-between">
                    <li><Link to ="/home" className={`mx-4 text-white font-display cursor-pointer ${location.pathname == "/home" ? "active-page" :""}`}>Home</Link></li>
                    <li><Link to="/files" className={`mx-4 text-white font-display cursor-pointer ${location.pathname == "/files" ? "active-page" :""}`}>Files</Link></li>
                    <li><Link to="/notes" className={`mx-4 text-white font-display cursor-pointer ${location.pathname == "/notes" ? "active-page" :""}`}>Notes</Link></li>
                    <li><Link to="/tasks" className={`mx-4 text-white font-display cursor-pointer ${location.pathname == "/tasks" ? "active-page" :""}`}>Tasks</Link></li>
                </ul>
            </div>

            <div className="flex items-center justify-between w-1/4">
                <div className="w-2/3">
                    <form className="max-w-md mx-auto">
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative" ref={usersSearchRef} onClick={handleUsersSearch}>
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                autoComplete="off"
                                value={usersSearchValue}
                                onChange={(e) => {
                                    setUsersSearchValue(e.target.value);
                                }}
                                className="block w-full h-3.5 p-4 pl-10 text-sm text-gray-900 border border-violet-800 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Search Users ..."
                            />
                            {usersSearchDropdown && (
                                <div className="absolute left-0 mt-3 w-80 bg-white shadow-lg rounded-lg z-50 max-h-80 overflow-auto p-2">
                                    {usersSpinner ? (
                                        <div className="text-center">
                                            <FontAwesomeIcon icon={faSpinner} spin className="text-violet-500 text-md" />
                                        </div>
                                    ) : filteredUsers.length > 0 ? (
                                        filteredUsers.map((user: any) => (
                                            <div key={user._id} className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2" onClick={()=>{navigate(`/user-profile/${user.username}`)}}>
                                                <img
                                                    src={user.imgUrl ? user.imgUrl : userLogo}
                                                    alt="user"
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                                <div>
                                                    <p className="font-semibold">{user.name}</p>
                                                    <p className="text-sm text-gray-500">@{user.username}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : usersSearchValue.trim().length > 0 ? (
                                        <div className="text-center">
                                            <p className="font-display italic text-red-500">No matching users</p>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <p className="font-display italic text-gray-400">Type username to search</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-between w-1/4 ml-2">
                    <Link to="/profile" className="mr-5 text-white font-display text-xl cursor-pointer hover:text-gray-400 transition-all duration-200">
                        {userIcon}
                    </Link>

                    <div className="relative mr-5 cursor-pointer" ref={dropdownRef} onClick={handleBellClick}>
                        <FontAwesomeIcon icon={faBell} className="text-white font-display text-xl hover:text-gray-400 transition-all duration-200" />
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                            {notificationCount}
                        </span>

                        {dropdown && (
                            <div className="absolute right-0 mt-5 w-130 bg-white shadow-lg rounded-lg z-50 max-h-80 overflow-auto p-2">
                                {notificationsSpinner ? (
                                    <div className="text-center">
                                        <FontAwesomeIcon icon={faSpinner} spin className="text-violet-500 text-md" />
                                    </div>
                                ) : (
                                    notifications.map((notification: any, index: number) => (
                                        <div
                                            key={index}
                                            className={`mb-5 flex items-center gap-3 text-left p-2 rounded-md hover:bg-gray-300 shadow-sm transition-all duration-200 ease-in-out ${notification.seen ? "bg-white" : "bg-gray-400"
                                                }`}
                                        >
                                            <img
                                                className="w-12 h-12 rounded-full object-cover"
                                                src={notification.actorId.imgUrl ? notification.actorId.imgUrl : userLogo}
                                                alt="actor"
                                            />
                                            <p className="text-sm font-display">
                                                {notification.actorId.name} invited you to his unit "{notification.unitName}"
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    <button className="mr-5 text-white font-display text-xl cursor-pointer" onClick={()=>{handleLogout()}}>
                        <FontAwesomeIcon icon={faRightFromBracket} className="hover:text-gray-400" />
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default HomeNavBar;
