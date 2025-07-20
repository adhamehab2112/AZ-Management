import userLogo from "../../assets/user.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faNoteSticky, faStar , faSpinner  } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
function Invitations() {
    const location = useLocation();
    let navigate = useNavigate();
    const userObjectString = localStorage.getItem("userDetails");
    const userObject = userObjectString ? JSON.parse(userObjectString) : null;
    const [loadingInvitations, setLoadingInvitations] = useState(true);
    const [invitations, setInvitations] = useState([]);
    const [handleInvitation, setHandleInvitation] = useState(false);
    const [loading,setLoading] = useState(false);
    
    async function handleAccept(invitationId: string) {
        setHandleInvitation(true);
        setLoading(true);
        toast('Accepted');
        let token = userObject?.token;
        try {
            let response = await axios.post(`http://147.93.127.229:3008/invitations/accept/${invitationId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
            setHandleInvitation(false);
            navigate('/files');
        }
        catch (e: any) {
            console.log(e);
        }

    }
    async function handleDecline(invitationId: string) {
        setHandleInvitation(true);
        setLoading(true);
        let token = userObject?.token;
        try {
            let response = await axios.post(`http://147.93.127.229:3008/invitations/decline/${invitationId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
            setHandleInvitation(false);
            navigate(0);
        }
        catch (e: any) {
            console.log(e);
        }

    }

    async function getInvitations() {
        let token = userObject?.token;
        try {
            let response = await axios.get(`http://147.93.127.229:3008/invitations`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setInvitations(response.data);
            setLoadingInvitations(false);
        }
        catch (e: any) {
            console.log(e);
        }
    }

    useEffect(() => {
        getInvitations();
    }, [])
    return (
        <>
            <div className=" flex w-full  ">
                <div className="w-1/5">
                    <div className="min-h-screen shadow-2xl border-2 border-gray-300 p-5 bg-gray-200 ">
                        <div className="flex items-center border-2 rounded-xl px-2 shadow-xl bg-gradient-to-r from-[#a31be2] via-[#4204a0] to-[#29015f] cursor-pointer transition-all duration-300 transform hover:scale-105"
                            onClick={() => { navigate("/profile") }}>
                            <img src={userObject.user.imgUrl ? userObject.user.imgUrl : userLogo} alt="user" className="w-15 h-15 my-3 rounded-full object-cover" />
                            <div className="mx-2">
                                <p className=" text-white font-bold font-display">{userObject.user.name}</p>
                                <p className="text-sm text-gray-200 font-display">{userObject.user.email}</p>
                            </div>
                        </div>
                        <hr className="mt-10 text-gray-500" />
                        <Link to="/files" className={`${!(location.pathname === '/files') ? "flex items-center mt-5 ml-2 cursor-pointer" : "flex items-center mt-5  cursor-pointer border border-[#29015f] p-2 w-1/2 rounded-xl bg-[#29015f]"}`}>
                            <FontAwesomeIcon icon={faNoteSticky} className={`${!(location.pathname === '/files') ? "text-[#29015f] text-xl" : "text-white text-xl"}`} />
                            <p className={`${!(location.pathname === '/files') ? "ml-2 font-bold font-display text-[#29015f] hover:underline" : "ml-2 font-bold font-display text-white hover:underline"}`}>Units</p>
                        </Link>
                        <Link to="/files/starred" className={`${!(location.pathname === '/files/starred') ? "flex items-center mt-5 ml-2 cursor-pointer" : "flex items-center mt-5  cursor-pointer border border-[#29015f] p-2 w-1/2 rounded-xl bg-[#29015f]"}`}>
                            <FontAwesomeIcon icon={faStar} className={`${!(location.pathname === '/files/starred') ? "text-[#29015f] text-xl" : "text-white text-xl"}`} />
                            <p className={`${!(location.pathname === '/files/starred') ? "ml-2 font-bold font-display text-[#29015f] hover:underline" : "ml-2 font-bold font-display text-white hover:underline"}`}>Starred</p>
                        </Link>
                        <Link to="/files/invitations" className={`${!(location.pathname === '/files/invitations') ? "flex items-center mt-5 ml-2 cursor-pointer" : "flex items-center mt-5  cursor-pointer border border-[#29015f] p-2 w-1/2 rounded-xl bg-[#29015f]"}`}>
                            <FontAwesomeIcon icon={faUser} className={`${!(location.pathname === '/files/invitations') ? "text-[#29015f] text-xl" : "text-white text-xl"}`} />
                            <p className={`${!(location.pathname === '/files/invitations') ? "ml-2 font-bold font-display text-[#29015f] hover:underline" : "ml-2 font-bold font-display text-white hover:underline"}`}>Invitations</p>
                        </Link>

                    </div>
                </div>
                <div className="w-4/5 min-h-screen">
                    <div className="m-4">
                        <h2 className="text-2xl font-display underline underline-offset-8">Your Invitations :</h2>
                        {loadingInvitations ? (<p className="text-xl font-medium font-display italic text-gray-500 mt-5 ml-4">Loading Invitations ... </p>) : (
                            <div className="m-4 border border-gray-100 rounded-3xl p-2 bg-gray-100">

                                {
                                    invitations.length > 0 ? (
                                        invitations.map((invitation: any, _i) => (
                                            <div key={_i} className="mx-auto p-2 bg-white m-3 rounded-xl w-90/100 shadow-2xl flex items-center justify-between">
                                                <div className="">
                                                    <p className="text-md font-display p-2"><span className="font-medium">{invitation.invitedBy.name}</span> invited you to its unit "<span className="italic"> {invitation.unit.name} </span>"</p>
                                                    <p className="text-sm font-display p-2 text-gray-400">Date : {invitation.date.split("T")[0]}</p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <button disabled={handleInvitation} className=" text-center bg-green-400 p-3 mr-5 rounded-xl font-display cursor-pointer transition-all duration-300 transform hover:scale-105" onClick={() => { handleAccept(invitation._id) }}>Accept</button>
                                                    <button disabled={handleInvitation} className=" text-center bg-red-500 p-3 mr-5 rounded-xl font-display cursor-pointer transition-all duration-300 transform hover:scale-105 " onClick={() => { handleDecline(invitation._id) }}>Reject</button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (<p className="text-xl text-center italic text-gray-600 font-display p-2 ">No Invitations yet , Go to units and create your own unit </p>)
                                }

                            </div>
                        )}
                    </div>
                </div>
            </div>
            {loading&&<div className="fixed inset-0 flex items-center justify-center bg-white/75 bg-opacity-40 z-50">
                 <FontAwesomeIcon icon={faSpinner} spin className="text-violet-500 text-md" />
                </div>}
        </>
    )
}

export default Invitations