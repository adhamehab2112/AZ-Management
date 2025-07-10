import userLogo from "../../assets/user.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket , faGear  } from '@fortawesome/free-solid-svg-icons';

function SideBar() {
    const userObjectString = localStorage.getItem("userDetails");
    const userObject = userObjectString ? JSON.parse(userObjectString) : null;
    console.log(userObject)
    return (
        <div className="min-h-161 shadow-2xl border-2 border-gray-300 p-5 bg-gray-200 ">
            <div className="flex items-center border-2 rounded-xl px-2 shadow-xl bg-gradient-to-r from-[#a31be2] via-[#4204a0] to-[#29015f] cursor-pointer transition-all duration-300 transform hover:scale-105">
                <img src={userObject.user.imgUrl ? userObject.imgUrl : userLogo} alt="user" className="w-15 h-15 rounded-full object-cover" />
                <div className="mx-2">
                    <p className=" text-white font-bold font-display">{userObject.user.name}</p>
                    <p className="text-sm text-gray-200 font-display">{userObject.user.email}</p>
                </div>
            </div>
            <hr className="mt-10 text-gray-500"/>
            <div className="flex items-center mt-10 cursor-pointer">
                <FontAwesomeIcon icon={faRightFromBracket} className="text-[#29015f] text-2xl" />
                <p className="ml-2 font-semibold font-display text-[#29015f] hover:underline">Logout</p>
            </div>
            <div className="flex items-center mt-10 cursor-pointer">
                <FontAwesomeIcon icon={faGear} className="text-[#29015f] text-2xl" />
                <p className="ml-2 font-semibold font-display text-[#29015f] hover:underline">Settings</p>
            </div>
        </div>
    )
}

export default SideBar