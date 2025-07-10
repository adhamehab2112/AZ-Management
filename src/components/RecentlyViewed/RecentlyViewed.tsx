import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock as faClockSolid, faPuzzlePiece, faNoteSticky, faUsers } from '@fortawesome/free-solid-svg-icons';
function RecentlyViewed() {
    return (
        <div className="min-h-161  border-2 border-gray-300 p-5">
            <div className="flex items-center mt-2">
                <FontAwesomeIcon icon={faClockSolid} className="text-gray-600 text-lg mt-1" />
                <p className='ml-2 mt-1 text-sm text-gray-600 font-display'>Recently Viewed</p>
            </div>
            <hr className='mt-7 mx-5 text-2xl text-gray-400' />
            <div className="flex items-center mt-2">
                <FontAwesomeIcon icon={faPuzzlePiece} className="text-gray-600 text-lg mt-1" />
                <p className='ml-2 mt-1 text-sm text-gray-600 font-display'>Units</p>
            </div>
            <hr className='mt-7 mx-5 text-2xl text-gray-400' />
            <div className="flex items-center mt-2">
                <FontAwesomeIcon icon={faNoteSticky} className="text-gray-600 text-lg mt-1" />
                <p className='ml-2 mt-1 text-sm text-gray-600 font-display'>Notes</p>
            </div>
            <hr className='mt-7 mx-5 text-2xl text-gray-400' />
            <div className="flex items-center mt-2">
                <FontAwesomeIcon icon={faUsers} className="text-gray-600 text-lg mt-1" />
                <p className='ml-2 mt-1 text-sm text-gray-600 font-display'>Users</p>
            </div>
            <hr className='mt-7 mx-5 text-2xl text-gray-400' />
        </div>
    )
}

export default RecentlyViewed