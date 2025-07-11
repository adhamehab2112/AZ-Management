import HomeNavBar from "../../components/HomeNavBar/HomeNavBar";
import SideBar from "../../components/SideBar/SideBar";
import UserProfileMainSection from "../../components/UserProfileMainSection/UserProfileMainSection";
function UserProfile() {
  return (
     <>
      <HomeNavBar />
      <div className="mt-12 flex  ">
        <div className="w-1/5">
          <SideBar />
        </div>
        <div className="mx-auto w-1/2">
          <UserProfileMainSection />
        </div>
      </div>
    </>
  )
}

export default UserProfile