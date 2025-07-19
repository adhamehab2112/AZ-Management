import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import userLogo from "../../assets/user.svg";
import defaultUnit from "../../assets/default-unit.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faNoteSticky, faStar } from "@fortawesome/free-solid-svg-icons";

function Starred() {
    const location = useLocation();
    const navigate = useNavigate();
    const userObjectString = localStorage.getItem("userDetails");
    const userObject = userObjectString ? JSON.parse(userObjectString) : null;
    const [units, setUnits] = useState<any[]>([]);
    const [loadingSkeleton, setLoadingSkeleton] = useState(true);
    const [starredUnits, setStarredUnits] = useState<any[]>([]);

    async function starUnit(unitId: string) {
        setStarredUnits(prev => [...prev, unitId]);
        const token = userObject?.token;
        try {
            await axios.put(
                `http://147.93.127.229:3008/units/star/${unitId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
        } catch (e) {
            setStarredUnits(prev => prev.filter(id => id !== unitId));
            console.error("Failed to star unit:", e);
        }
    }

    async function unstarUnit(unitId: string) {
        setStarredUnits(prev => prev.filter(id => id !== unitId));
        const token = userObject?.token;
        try {
            await axios.put(
                `http://147.93.127.229:3008/units/unstar/${unitId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
        } catch (e) {
            setStarredUnits(prev => [...prev, unitId]);
            console.error("Failed to unstar unit:", e);
        }
    }

    async function getAllStarredUnits() {
        const token = userObject?.token;
        try {
            const response = await axios.get(`http://147.93.127.229:3008/units/starred`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUnits(response.data.units);
            setStarredUnits(response.data.units.map((u: any) => u._id));
            setLoadingSkeleton(false);
        } catch (e) {
            console.error("Failed to load starred units:", e);
        }
    }

    useEffect(() => {
        getAllStarredUnits();
    }, []);

    return (
        <div className="flex w-full">
            <div className="w-1/5">
                <div className="min-h-161 shadow-2xl border-2 border-gray-300 p-5 bg-gray-200">
                    <div
                        className="flex items-center border-2 rounded-xl px-2 shadow-xl bg-gradient-to-r from-[#a31be2] via-[#4204a0] to-[#29015f] cursor-pointer transition-all duration-300 transform hover:scale-105"
                        onClick={() => navigate("/profile")}
                    >
                        <img
                            src={userObject?.user?.imgUrl || userLogo}
                            alt="user"
                            className="w-15 h-15 my-3 rounded-full object-cover"
                        />
                        <div className="mx-2">
                            <p className="text-white font-bold font-display">{userObject.user.name}</p>
                            <p className="text-sm text-gray-200 font-display">{userObject.user.email}</p>
                        </div>
                    </div>

                    <hr className="mt-10 text-gray-500" />

                   
                    <Link
                        to="/files"
                        className={`${location.pathname !== "/files"
                                ? "flex items-center mt-5 ml-2 cursor-pointer"
                                : "flex items-center mt-5 cursor-pointer border border-[#29015f] p-2 w-1/2 rounded-xl bg-[#29015f]"
                            }`}
                    >
                        <FontAwesomeIcon
                            icon={faNoteSticky}
                            className={`text-xl ${location.pathname !== "/files" ? "text-[#29015f]" : "text-white"
                                }`}
                        />
                        <p
                            className={`ml-2 font-bold font-display hover:underline ${location.pathname !== "/files" ? "text-[#29015f]" : "text-white"
                                }`}
                        >
                            Units
                        </p>
                    </Link>

                    <Link
                        to="/files/starred"
                        className={`${location.pathname !== "/files/starred"
                                ? "flex items-center mt-5 ml-2 cursor-pointer"
                                : "flex items-center mt-5 cursor-pointer border border-[#29015f] p-2 w-1/2 rounded-xl bg-[#29015f]"
                            }`}
                    >
                        <FontAwesomeIcon
                            icon={faStar}
                            className={`text-xl ${location.pathname !== "/files/starred" ? "text-[#29015f]" : "text-white"
                                }`}
                        />
                        <p
                            className={`ml-2 font-bold font-display hover:underline ${location.pathname !== "/files/starred" ? "text-[#29015f]" : "text-white"
                                }`}
                        >
                            Starred
                        </p>
                    </Link>

                    <Link
                        to="/files/invitations"
                        className={`${location.pathname !== "/files/invitations"
                                ? "flex items-center mt-5 ml-2 cursor-pointer"
                                : "flex items-center mt-5 cursor-pointer border border-[#29015f] p-2 w-1/2 rounded-xl bg-[#29015f]"
                            }`}
                    >
                        <FontAwesomeIcon
                            icon={faUser}
                            className={`text-xl ${location.pathname !== "/files/invitations" ? "text-[#29015f]" : "text-white"
                                }`}
                        />
                        <p
                            className={`ml-2 font-bold font-display hover:underline ${location.pathname !== "/files/invitations" ? "text-[#29015f]" : "text-white"
                                }`}
                        >
                            Invitations
                        </p>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-4/5">
                {loadingSkeleton ? (
                    <div className="mx-10 w-3/4 flex flex-wrap items-center justify-between">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex flex-wrap mt-10 w-1/4 mr-10">
                                <Skeleton variant="rectangular" width={230} height={118} />
                                <Skeleton width="90%" />
                                <Skeleton width="80%" />
                                <Skeleton width="70%" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-6 px-10 py-8">
                        {units.map((unit, index) => (
                            <div key={index} className="transition-all duration-300 transform hover:scale-105">
                                <div className="rounded overflow-hidden shadow-md bg-white">
                                    <Link to="/">
                                        <img
                                            className="w-full h-40 object-cover"
                                            src={unit.coverUrl || defaultUnit}
                                            alt="Unit Preview"
                                        />
                                    </Link>
                                    <div className="p-3 flex items-center justify-between z-10">
                                        <h2 className="font-display font-semibold">{unit.name}</h2>
                                        {starredUnits.includes(unit._id) ? (
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className="text-yellow-400 cursor-pointer"
                                                onClick={() => unstarUnit(unit._id)}
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className="text-gray-400 cursor-pointer"
                                                onClick={() => starUnit(unit._id)}
                                            />
                                        )}
                                    </div>
                                    <p className="px-3 font-display text-sm text-gray-600">{unit.description}</p>
                                    <p className="px-3 mt-2 mb-3 text-sm text-gray-500 font-display">
                                        Created by: <span className="font-medium">{unit.owner.name}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Starred;
