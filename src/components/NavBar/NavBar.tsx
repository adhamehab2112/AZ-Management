import { Link } from "react-router-dom"
import AZ_Logo from "../../assets/logo2.png"

function NavBar() {
    return (
        <nav className=" flex justify-between items-center">
            <div className="mt-5 ml-40">
                <img className="w-15" src={AZ_Logo} />
            </div>

            <div className="mt-5 mr-40">
                <Link to="/login" className="text-white mr-5  font-display cursor-pointer border border-white p-1 px-2 rounded-md hover:bg-white/30 transition-all duration-200">Sign In</Link>
                <Link to="/sign_up" className="text-white mr-5  font-display cursor-pointer border border-white p-1 px-2 rounded-md hover:bg-white/30 transition-all duration-200">Sign Up</Link>
            </div>

        </nav>
    )
}

export default NavBar