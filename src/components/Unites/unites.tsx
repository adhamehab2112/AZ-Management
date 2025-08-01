import { useLocation } from "react-router-dom"
import userLogo from "../../assets/user.svg";
import defaultUnit from "../../assets/default-unit.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faNoteSticky, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from '@mui/material/Skeleton';
import NewUnitModal from "../../modals/NewUnitModal";

function Units() {
    const location = useLocation();
    let navigate = useNavigate();
    const userObjectString = localStorage.getItem("userDetails");
    const userObject = userObjectString ? JSON.parse(userObjectString) : null;
    let [units, setUnites] = useState<any>([]);
    let [loadingSkeleton, setLoadingSkeleton] = useState(true);
    const [starredUnites, setStarredUnites] = useState<any[]>([]);
    let [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const unitsPerPage = 4;

    async function starUnit(unitId: string) {
        setStarredUnites([...starredUnites, unitId]);
        let token = userObject?.token;
        try {
            await axios.put(`http://147.93.127.229:3008/units/star/${unitId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        catch (e: any) {
            setStarredUnites(starredUnites.filter(id => id !== unitId));
        }
    }

    async function unstartUnit(unitId: string) {
        setStarredUnites(starredUnites.filter(id => id !== unitId));
        let token = userObject?.token;
        try {
            await axios.put(`http://147.93.127.229:3008/units/unstar/${unitId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        catch (e: any) {
            setStarredUnites([...starredUnites, unitId]);
        }
    }

    async function getAllUnites() {
        const token = userObject?.token;
        try {
            let response = await axios.get(`http://147.93.127.229:3008/units`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setUnites(response.data.units);
            setStarredUnites(response.data.starred);
            setLoadingSkeleton(false);
        }
        catch (e: any) {
        }
    }

    useEffect(() => {
        getAllUnites();
    }, []);

    useEffect(() => {
        if (!showModal) {
            getAllUnites();
            setCurrentPage(1);
        }
    }, [showModal]);

    const indexOfLastUnit = currentPage * unitsPerPage;
    const indexOfFirstUnit = indexOfLastUnit - unitsPerPage;
    const currentUnits = units.slice(indexOfFirstUnit, indexOfLastUnit);
    const totalPages = Math.ceil(units.length / unitsPerPage);

    return (
        <>
            <div className=" flex w-full  ">
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
                        <div className="flex items-center mt-10 cursor-pointer bg-white w-1/3 text-center border-1 border-gray-400 rounded-2xl p-2 shadow-2xl transition-all duration-300 transform hover:scale-105" onClick={() => setShowModal(true)}>
                            <button className="font-display text-lg font-bold cursor-pointer w-full mr-2"  >+ New</button>
                        </div>
                        <Link to="/files" className={`${!(location.pathname === '/files') ? "flex items-center mt-5 ml-2 cursor-pointer" : "flex items-center mt-5  cursor-pointer border border-[#29015f] p-2 w-1/2 rounded-xl bg-[#29015f]"}`}>
                            <FontAwesomeIcon icon={faNoteSticky} className={`${!(location.pathname === '/files') ? "text-[#29015f] text-xl" : "text-white text-xl"}`} />
                            <p className={`${!(location.pathname === '/files') ? "ml-2 font-bold font-display text-[#29015f] hover:underline" : "ml-2 font-bold font-display text-white hover:underline"}`}>Units</p>
                        </Link>
                        <Link to="starred" className={`${!(location.pathname === 'starred') ? "flex items-center mt-5 ml-2 cursor-pointer" : "flex items-center mt-5  cursor-pointer border border-[#29015f] p-2 w-1/2 rounded-xl bg-[#29015f]"}`}>
                            <FontAwesomeIcon icon={faStar} className={`${!(location.pathname === 'starred') ? "text-[#29015f] text-xl" : "text-white text-xl"}`} />
                            <p className={`${!(location.pathname === '/starred') ? "ml-2 font-bold font-display text-[#29015f] hover:underline" : "ml-2 font-bold font-display text-white hover:underline"}`}>Starred</p>
                        </Link>
                        <Link to="invitations" className={`${!(location.pathname === 'invitation') ? "flex items-center mt-5 ml-2 cursor-pointer" : "flex items-center mt-5  cursor-pointer border border-[#29015f] p-2 w-1/2 rounded-xl bg-[#29015f]"}`}>
                            <FontAwesomeIcon icon={faUser} className={`${!(location.pathname === 'invitations') ? "text-[#29015f] text-xl" : "text-white text-xl"}`} />
                            <p className={`${!(location.pathname === '/invitations') ? "ml-2 font-bold font-display text-[#29015f] hover:underline" : "ml-2 font-bold font-display text-white hover:underline"}`}>Invitations</p>
                        </Link>
                    </div>
                </div>
                <div className="w-4/5">
                    {loadingSkeleton ? (<div className="mx-5 w-3/4 flex flex-wrap items-center justify-between">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex flex-wrap mt-5 w-1/4">
                                <Skeleton variant="rectangular" width={230} height={118} />
                                <Skeleton width="90%" />
                                <Skeleton width="80%" />
                                <Skeleton width="70%" />
                            </div>
                        ))}
                    </div>) : (
                        <div className="px-10 py-4">
                            <div className="grid grid-cols-2 gap-6">
                                {units.length === 0 ? (
                                    <p className="text-gray-500 italic font-display mt-10 text-lg text-center">
                                        No units available. Press <span className="font-bold">+ New</span> button to create one.
                                    </p>
                                ) : (
                                    currentUnits.map((unit: any, index: number) => (
                                        <div key={index} className="transition-all duration-300 transform hover:scale-105">
                                            <div className="rounded overflow-hidden shadow-md bg-white">
                                                <Link to={unit._id}>
                                                    <img className="w-full h-40 object-cover" src={unit.coverUrl ? unit.coverUrl : defaultUnit} alt="Unit Preview" />
                                                </Link>
                                                <div className="p-3 flex items-center justify-between z-10">
                                                    <h2 className="font-display font-semibold">{unit.name}</h2>
                                                    {starredUnites.includes(unit._id)
                                                        ? <FontAwesomeIcon icon={faStar} className="text-yellow-400 cursor-pointer" onClick={() => { unstartUnit(unit._id) }} />
                                                        : <FontAwesomeIcon icon={faStar} className="text-gray-400 cursor-pointer" onClick={() => { starUnit(unit._id) }} />}
                                                </div>
                                                <p className="px-3 font-display text-sm text-gray-600">{unit.description}</p>
                                                <p className="px-3 mt-2 mb-3 text-sm text-gray-500 font-display">
                                                    Created by: <span className="font-medium">{unit.owner.name}</span>
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}

                            </div>
                            <div className="flex justify-center items-center mt-4 space-x-4">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 rounded-xl font-bold font-display text-white cursor-pointer border-[#29015f] bg-[#29015f]"
                                >
                                    Previous
                                </button>
                                <span className="text-sm font-display text-gray-700">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 rounded-xl font-bold font-display text-white cursor-pointer border-[#29015f] bg-[#29015f]"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {showModal && <NewUnitModal onClose={() => setShowModal(false)} />}
        </>
    )
}

export default Units
