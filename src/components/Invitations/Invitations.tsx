import userLogo from "../../assets/user.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faNoteSticky, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"
function Invitations() {
    const location = useLocation();
    let navigate = useNavigate();
    const userObjectString = localStorage.getItem("userDetails");
    const userObject = userObjectString ? JSON.parse(userObjectString) : null;
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
                <div className="w-4/5">
                    {location.pathname}
                </div>
            </div>
        </>
    )
}

export default Invitations