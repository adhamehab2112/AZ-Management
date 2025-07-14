interface ModalProps {
    onClose: () => void
}
function NewUnitModal({ onClose }: ModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/75 bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-lg w-96 relative shadow-lg">
                <button
                    className="absolute top-2 right-3 text-gray-500 text-xl cursor-pointer"
                    onClick={onClose}
                >
                    ×
                </button>
                <h2 className="text-xl font-bold mb-4">Add a New Unit</h2>
                <div className="">
                    <form className="mx-auto">
                        <div className="mt-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                            <input

                                type="text" id="name" className=" w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " required />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                            <textarea id="description" className=" w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " required />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewUnitModal