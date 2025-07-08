import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

function Footer() {
    return (
        <footer className='flex justify-between items-center bg-[#26263c]'>
            <div className="text-white ml-40">
                <h2 className='font-bold'>Follow Us</h2>
                <div className="flex ">
                    <p className='m-1 text-[#e0dbdb]'>Anazz <span className=" ml-1 text-sm cursor-pointer">GitHub LinkedIn Facebook</span></p>
                    <p className='m-1 ml-4 text-[#e0dbdb]'>Zyad <span className=" ml-1 text-sm cursor-pointer">GitHub LinkedIn Facebook</span></p>
                    <p className='m-1 ml-4  text-[#e0dbdb]'>Adham <span className=" ml-1 text-sm cursor-pointer">GitHub LinkedIn Facebook</span></p>
                </div>
            </div>
            <div className="text-gray-500 text-lg mr-40 flex items-center">
                <FontAwesomeIcon icon={faCopyright} className="mr-3 " />
                <p>2025 AZ</p>
            </div>

        </footer>
    )
}

export default Footer