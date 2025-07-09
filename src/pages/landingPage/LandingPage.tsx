import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import StarsBackground from '../../components/Background/Background'

function LandingPage() {
    return (
        <>
            <div className="absolute inset-0 -z-10">
                <StarsBackground />
            </div>
            <div className="flex flex-col justify-between min-h-screen">
                
                <div className="">
                    <NavBar/>
                </div>

                <div className=" p-4 text-white ml-40 mb-20 ">
                    <h2 className="font-display text-5xl font-bold text-[#bfbaba]"> Manage Your Team.</h2>
                    <p className='font-display text-lg  text-[#e0dbdb] w-1/3 mt-5 mb-3'>AZ is the private and flexible team management app that adapt your team's work flow.</p>
                    <button className="font-display bg-[#475bf2] text-center font-semibold text-xl p-4 w-1/5 rounded-lg mt-1 ml-1 cursor-pointer hover:bg-[#3e4576] transition-all duration-200">Get Started</button>
                    <p className='font-display text-sm  text-[#e0dbdb] w-1/3 mt-5 mb-3'>Already have an account? <span className='underline cursor-pointer'>Sign in</span></p>
                </div>

                <div className="">
                    <Footer/>
                </div>
            </div>

        </>
    )
}

export default LandingPage