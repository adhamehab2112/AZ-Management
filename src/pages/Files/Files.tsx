import HomeNavBar from "../../components/HomeNavBar/HomeNavBar";
import { Outlet } from "react-router-dom";
function Files() {
  return (
    <>
      <HomeNavBar />
      <div className="mt-12 flex w-full ">
        <Outlet/>
      </div>
    </>
  )
}

export default Files