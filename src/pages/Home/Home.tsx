import HomeMainSection from "../../components/HomeMainSection/HomeMainSection";
import HomeNavBar from "../../components/HomeNavBar/HomeNavBar";
import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed";
import SideBar from "../../components/SideBar/SideBar";

function Home() {
  return (
    <>
    <HomeNavBar/>
    <div className="mt-12 flex  ">
      <div className="w-1/5">
        {/* Side Bar */}
        <SideBar/>
      </div>
      <div className="w-1/2">
        {/* main */}
        <HomeMainSection/>
      </div>
      <div className="w-1/3 ml-20">
        {/* recently viewed */}
        <RecentlyViewed/>
      </div>
      
    </div>
    </>
  )
}

export default Home