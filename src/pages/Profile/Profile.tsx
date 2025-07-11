import HomeNavBar from "../../components/HomeNavBar/HomeNavBar";
import ProfileMainSection from "../../components/ProfileMainSection/ProfileMainSection";
import SideBar from "../../components/SideBar/SideBar";

function Profile() {
  return (
    <>
    <HomeNavBar/>
    <div className="mt-12 flex  ">
      <div className="w-1/5">
        {/* Side Bar */}
        <SideBar/>
      </div>
      <div className="mx-auto w-1/2">
        {/* profile main */}
        <ProfileMainSection/>
      </div>
          
    </div>
    </>
  )
}

export default Profile