import homeImg from "../../assets/home.svg";

function HomeMainSection() {
  return (
    <div className="flex flex-col text-center ">
        <div className="">
            <img className="w-full m-5 ml-10 border-2 rounded-2xl shadow border-gray-400" src={homeImg}/>
        </div>
        <p className="ml-25 font-display text-xl font-semibold">Stay on track and up to date.</p>
        <p className="ml-25 font-display text-sm ">Invite people to units, tasks and notes, leave comments, add due dates, and we'll show the most important activity here.</p>

    </div>
  )
}

export default HomeMainSection