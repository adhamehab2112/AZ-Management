import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faEnvelope, faCheck, faXmark, faUsers, faUpload, faUser } from '@fortawesome/free-solid-svg-icons';
import userLogo from "../../assets/user.svg";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProfileMainSection() {
    let navigate = useNavigate();
    const userObjectString = localStorage.getItem("userDetails");
    const userObject = userObjectString ? JSON.parse(userObjectString) : null;

    const [username, setUsername] = useState(userObject.user.name);
    const [editUserName, setEditUsername] = useState(false);


    async function getProfileData() {
        let response = await axios.get(`http://147.93.127.229:3008/profile`,
            {
                headers: {
                    Authorization: `Bearer ${userObject.token}`,
                }
            }
        );
        console.log(response);
    }
    async function editUsername(uname: string) {
        setUsername(uname);
        try {
            const response = await axios.put(
                `http://147.93.127.229:3008/users`,
                {
                    name: uname,
                    email: userObject.user.email,
                    username: userObject.user.username,
                },
                {
                    headers: {
                        Authorization: `Bearer ${userObject.token}`,
                    },
                }
            );
            console.log(response);
            getProfileData();
            userObject.user.name = uname;
            localStorage.setItem('userDetails', JSON.stringify(userObject));
            setEditUsername(false);
            navigate(0);

        } catch (e: any) {
            console.log(e);
        }
    }
    return (
        <div className="my-5 rounded-xl bg-gray-100 min-h-110 w-full border-2 border-gray-200 shadow-2xl py-3 px-10">
            <div className="bg-gradient-to-r from-[#5007af] via-[#4204a0] to-[#6e02a0] flex items-center rounded-lg">
                <div className="bg-white m-5 rounded-full">
                    <img
                        className="h-30 w-30 rounded-full object-cover"
                        src={userObject.user.imgUrl ? userObject.user.imgUrl : userLogo}
                        alt="User"
                    />
                </div>

                <div className="flex flex-col">
                    {editUserName ? (
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full p-3 bg-white/30 text-2xl text-white font-display font-semibold border border-gray-300 rounded-lg"
                            />
                            <button
                                className="ml-3 cursor-pointer bg-green-400 p-1 rounded-sm"
                                onClick={() => editUsername(username)}
                            >
                                <FontAwesomeIcon icon={faCheck} className="text-white text-2xl font-bold" />
                            </button>
                            <button
                                className="ml-3 cursor-pointer bg-red-400 p-1 rounded-sm"
                                onClick={() => setEditUsername(false)}
                            >
                                <FontAwesomeIcon icon={faXmark} className="text-white text-2xl font-bold" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <h2 className="text-2xl text-white font-display font-semibold">{username}</h2>
                            <button className="ml-3 cursor-pointer" onClick={() => setEditUsername(true)}>
                                <FontAwesomeIcon icon={faPenToSquare} className="text-white text-lg" />
                            </button>
                        </div>
                    )}

                    <p className="text-gray-400 font-display mt-1">@ {userObject.user.username}</p>
                    <p className="text-gray-400 font-display mt-1">
                        <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 text-lg mr-1" />
                        {userObject.user.email}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center border-2 p-3 rounded-xl border-gray-300 mt-5 w-1/3">
                    <div className="flex items-center ml-4">
                        <FontAwesomeIcon icon={faUsers} className="text-blue-700 text-lg mt-1 border-2 border-blue-200 px-3 py-4 rounded-xl bg-blue-200" />
                        <div className="">
                            <p className='text-xl mx-3 font-display font-semibold'>154</p>
                            <p className='text-sm ml-3 font-display text-gray-600'>Connections</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center border-2 p-3 rounded-xl border-gray-300 mt-5 w-1/3 ml-3">
                    <div className="flex items-center ml-4">
                        <FontAwesomeIcon icon={faCheck} className="text-green-700 text-lg font-bold mt-1 border-2 border-green-200 px-3 py-4 rounded-xl bg-green-200" />
                        <div className="">
                            <p className='text-xl mx-3 font-display font-semibold'>42</p>
                            <p className='text-sm ml-3 font-display text-gray-600'>Projects</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center border-2 p-3 rounded-xl border-gray-300 mt-5 w-1/3 ml-3">
                    <div className="flex items-center ml-4">
                        <FontAwesomeIcon icon={faUpload} className="text-violet-700 text-lg font-bold mt-1 border-2 border-violet-200 px-3 py-4 rounded-xl bg-violet-200" />
                        <div className="">
                            <p className='text-xl mx-3 font-display font-semibold'>24</p>
                            <p className='text-sm ml-3 font-display text-gray-600'>Uploads</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-2 p-5 rounded-xl border-gray-300 mt-5 ">
                <h2 className='text-lg font-display font-semibold'>About</h2>
                <p className='text-sm mt-2 font-display text-gray-600'>Welcome to my profile! I'm passionate about creating innovative solutions and collaborating with amazing teams. Feel free to connect with me to discuss projects,
                    opportunities, or just to say hello.</p>
            </div>
            <div className="border-2 p-5 rounded-xl border-gray-300 mt-5 ">
                <h2 className='text-lg font-display font-semibold'>Recent Activity</h2>
                <div className="flex items-center border-2 p-1 rounded-xl border-gray-200 mt-2 bg-gray-200">
                    <div className="flex items-center ml-4">
                        <FontAwesomeIcon icon={faUser} className="text-blue-700 text-sm mt-1 border-2 border-blue-200 px-2 py-2 rounded-full bg-blue-200" />
                        <div className="">
                            <p className='text-sm mx-3 font-display font-semibold'>Updated profile information</p>
                            <p className='text-xs ml-3 font-display text-gray-600'>2 hrs ago.</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center border-2 p-1 rounded-xl border-gray-200 mt-2 bg-gray-200">
                    <div className="flex items-center ml-4">
                        <FontAwesomeIcon icon={faCheck} className="text-green-700 text-sm mt-1 border-2 border-green-200 px-2 py-2 rounded-full bg-green-200" />
                        <div className="">
                            <p className='text-sm mx-3 font-display font-semibold'>Completed project milestone.</p>
                            <p className='text-xs ml-3 font-display text-gray-600'>1 day ago.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProfileMainSection;
