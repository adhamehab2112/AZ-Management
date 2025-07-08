import AZ_Logo from "../../assets/logo2.png"
function NavBar() {
    return (
        <nav className=" flex justify-between items-center">
            <div className="mt-5 ml-40">
                <img className="w-15" src={AZ_Logo} />
            </div>

            <div className="mt-5 mr-40">
                <button className="text-white mr-5  font-display cursor-pointer border border-white p-1 px-2 rounded-md ">Sign In</button>
                <button className="text-white  font-display cursor-pointer border border-white p-1 px-2 rounded-md">Sign Up</button>
            </div>

        </nav>
    )
}

export default NavBar