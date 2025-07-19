import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import userLogo from "../../assets/user.svg";
import Skeleton from '@mui/material/Skeleton';
import {
    faUser, faNoteSticky, faGear
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import axios from "axios";
function UnitMembers() {
    const location = useLocation();
    let navigate = useNavigate();
    const userObjectString = localStorage.getItem("userDetails");
    const userObject = userObjectString ? JSON.parse(userObjectString) : null;
    const { unitId } = useParams<string>();
    const [loadingSkeleton, setLoadingSkeleton] = useState(true);
    const [unit, setUnit] = useState<any>(null);
    const [users, setUsers] = useState([]);


    async function getUnitUsers() {
        let token = userObject?.token;

        try {
            let response = await axios.get(`http://147.93.127.229:3008/units/users/${unitId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                });
            console.log(response.data);
            setUnit(response.data.unit);
            setUsers(response.data.users);
            setLoadingSkeleton(false);
        }
        catch (e: any) {
            console.log(e);
        }
    }

    useEffect(() => {
        getUnitUsers();

    }, [])
    return (
        <div className="flex w-full">
            <div className="w-1/5">
                <div className="min-h-161 shadow-2xl border-2 border-gray-300 p-5 bg-gray-200 ">
                    <div className="flex items-center border-2 rounded-xl px-2 shadow-xl bg-gradient-to-r from-[#a31be2] via-[#4204a0] to-[#29015f] cursor-pointer transition-all duration-300 transform hover:scale-105"
                        onClick={() => { navigate("/profile") }}>
                        <img src={userObject.user.imgUrl ? userObject.user.imgUrl : userLogo} alt="user" className="w-15 h-15 my-3 rounded-full object-cover" />
                        <div className="mx-2">
                            <p className=" text-white font-bold font-display">{userObject.user.name}</p>
                            <p className="text-sm text-gray-200 font-display">{userObject.user.email}</p>
                        </div>
                    </div>
                    <hr className="mt-10 text-gray-500" />
                    <div className="flex items-center mt-10 cursor-pointer bg-white w-1/2 text-center border-1 border-gray-400 rounded-2xl p-2 shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <button className="font-display text-lg font-bold cursor-pointer w-full mr-2"  >+ Invite</button>
                    </div>
                    <Link to={`/files/${unitId}`} className={`${!(location.pathname === `/files/${unitId}`) ? "flex items-center mt-5 ml-2 cursor-pointer" : "flex items-center mt-5  cursor-pointer border border-[#29015f] p-2 w-1/2 rounded-xl bg-[#29015f]"}`}>
                        <FontAwesomeIcon icon={faNoteSticky} className={`${!(location.pathname === `/files/${unitId}`) ? "text-[#29015f] text-xl" : "text-white text-xl"}`} />
                        <p className={`${!(location.pathname === `/files/${unitId}`) ? "ml-2 font-bold font-display text-[#29015f] hover:underline" : "ml-2 font-bold font-display text-white hover:underline"}`}>Nodes</p>
                    </Link>
                    <Link to={`/files/${unitId}/members`} className={`${!(location.pathname === `/files/${unitId}/members`) ? "flex items-center mt-5 ml-2 cursor-pointer" : "flex items-center mt-5  cursor-pointer border border-[#29015f] p-2 w-1/2 rounded-xl bg-[#29015f]"}`}>
                        <FontAwesomeIcon icon={faUser} className={`${!(location.pathname === `/files/${unitId}/members`) ? "text-[#29015f] text-xl" : "text-white text-xl"}`} />
                        <p className={`${!(location.pathname === `/files/${unitId}/members`) ? "ml-2 font-bold font-display text-[#29015f] hover:underline" : "ml-2 font-bold font-display text-white hover:underline"}`}>Members</p>
                    </Link>
                    <Link to={`/files/${unitId}/invitations`} className={`${!(location.pathname === 'invitation') ? "flex items-center mt-5 ml-2 cursor-pointer" : "flex items-center mt-5  cursor-pointer border border-[#29015f] p-2 w-1/2 rounded-xl bg-[#29015f]"}`}>
                        <FontAwesomeIcon icon={faGear} className={`${!(location.pathname === 'invitations') ? "text-[#29015f] text-xl" : "text-white text-xl"}`} />
                        <p className={`${!(location.pathname === '/invitations') ? "ml-2 font-bold font-display text-[#29015f] hover:underline" : "ml-2 font-bold font-display text-white hover:underline"}`}>Invitations</p>
                    </Link>
                    <div className="mt-50 w-3/4 bg-red-500 mx-auto text-center p-1 rounded-sm text-white font-display cursor-pointer hover:bg-red-700" onClick={() => { navigate("/files") }}>
                        <p>Leave Unit</p>
                    </div>
                </div>
            </div>

            <div className="w-4/5">
                {loadingSkeleton ? (
                    <div className="mx-5 w-3/4 flex flex-wrap items-center justify-between">
                        {[...Array(1)].map((_, i) => (
                            <div key={i} className="flex flex-wrap mt-10 w-3/4">
                                <Skeleton variant="rectangular" width="100%" height={118} />
                                <Skeleton width="90%" />
                                <Skeleton width="80%" />
                                <Skeleton width="60%" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="ml-5 mt-5">
                        <h2 className="font-display text-2xl font-medium">{unit?.name}</h2>
                        <p className="font-display text-gray-500 text-xl italic ">{unit?.description}</p>
                        <p className="font-display">Owner : <span className="text-blue-600">{unit.owner.name}</span></p>
                        <hr className="text-gray-400 mt-5 mr-5" />
                        <h2 className="font-display text-xl mt-5 underline underline-offset-6 ">Unit Members :- </h2>
                        {users.map((user: any, _i) => {
                            if (user.status === 'PENDING') return null;
                            return (
                                <div key={_i} className="m-4 border w-1/2 p-2 bg-[#4204a0] rounded-sm shadow-2xl flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img
                                            className="w-14 h-14 rounded-full border p-1 bg-white"
                                            src={user.imgUrl || userLogo}
                                            alt="User"
                                        />
                                        <div className="ml-3">
                                            <p className="font-display text-white">{user.name}</p>
                                            <p className="font-display text-gray-400 italic">{user.email}</p>
                                        </div>
                                    </div>
                                    {userObject.user._id === unit.owner._id && (
                                        <div className="mr-4 p-2 rounded-xl bg-red-600 text-white cursor-pointer transition-all duration-300 transform hover:scale-105">
                                            <button className="cursor-pointer">Remove User</button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );

}
export default UnitMembers
