import HomeNavBar from "../../components/HomeNavBar/HomeNavBar";
import SideBar from "../../components/SideBar/SideBar";

function Home() {
  return (
    <>
    <HomeNavBar/>
    <div className="mt-12 flex flex-col justify-between">
      <div className="">
        {/* Side Bar */}
        <SideBar/>
      </div>
      <div className="w-1/4">
        {/* main */}
      </div>
      <div className="">
        {/* recently viewed */}
      </div>
      
    </div>
    </>
  )
}

export default Home