
interface ModalProps{
    onClose : ()=>void , 
    resource : any
}
function ViewResourceModal({onClose , resource}:ModalProps) 
{
    console.log(resource);
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-white/75 bg-opacity-40 z-50">
                <div className="bg-white p-6 rounded-lg w-1/3 relative shadow-lg ">
                    <button className="absolute top-2 right-3 text-gray-500 text-xl cursor-pointer" onClick={onClose}>
                        ×
                    </button>
                    <h2 className="text-xl font-bold mb-4">Resource</h2>

                    <div className="border rounded-xl p-3 border-gray-400">
                        <p className="text-md font-medium font-display mb-2">Name : <span className="italic">{resource.name}</span></p>
                        <p className="text-md font-medium font-display mb-4">Description : <span className="italic">{resource.description}</span></p>
                         <h2>Content:</h2>
                        <div className="border p-3 mt-2">
                           {resource.type === 'image'?(<img className="" src={resource.data.imageUrl} />):(
                            resource.type === 'link'?(<p>{resource.data.link}</p>):(<p>{resource.data.text}</p>)
                           )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ViewResourceModal