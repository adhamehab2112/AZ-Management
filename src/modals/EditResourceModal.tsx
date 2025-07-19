import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

interface ModalProps {
    onClose: () => void,
    nodeId: string | undefined;
    resource : any ;
}

interface FormValues {
    name: string,
    description: string,
    type: string,
    link?: string,
    text?: string,
    imageUrl?: string
}


function EditResourceModal({ onClose, nodeId , resource }: ModalProps) {
    let navigate = useNavigate();
    let [selectedType, setSelectedType] = useState(resource.type);
    let [imgContent, setImgContent] = useState<string | null>(null);
    let [spinner, setSpinner] = useState(false);
    const userObjectString = localStorage.getItem("userDetails");
    const userObject = userObjectString ? JSON.parse(userObjectString) : null;
    async function handleSubmit(formData: FormValues) {
        let token = userObject?.token;
        let payload: any = {
            name: formData.name,
            description: formData.description,
            type: selectedType,
            data: {}
        }
        if (selectedType === 'text') {
            payload.data.text = formData.text;
        }
        else if (selectedType === 'link') {
            payload.data.link = formData.link;
        }
        else if (selectedType === 'image') {
            payload.data.imageUrl = formData.imageUrl;
        }
        console.log(payload);
        await axios.post(`http://147.93.127.229:3008/resource/${nodeId}`, payload, {
            headers:
            {
                Authorization: `Bearer ${token}`,
            }
        });
        navigate(0);
    }
    let formik = useFormik<FormValues>({
        initialValues: {
            name: resource.name,
            description: resource.description,
            type: resource.type,
            link: resource.data.link??"",
            text:resource.data.text??"",
            imageUrl: resource.data.imageUrl??""

        },
        onSubmit: handleSubmit

    })
    async function getImgUrl(file: File) {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(`http://147.93.127.229:3008/upload/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            formik.setFieldValue('imageUrl', response.data.message);
        } catch (e: any) {
            console.error("Upload failed:", e.response?.data || e.message);
        }
    }
    async function handleFileChange(event: any) {
        setSpinner(true);
        const file = event.currentTarget.files[0];
        await getImgUrl(file);
        setSpinner(false);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImgContent(reader.result as string);
            reader.readAsDataURL(file);
        }
    }
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-white/75 bg-opacity-40 z-50">

                <div className="bg-white p-6 rounded-lg w-96 relative shadow-lg">
                    <button className="absolute top-2 right-3 text-gray-500 text-xl cursor-pointer" onClick={onClose}>
                        ×
                    </button>
                    <h2 className="text-xl font-bold mb-4">Add a New Resource</h2>


                    <form className="mx-auto" onSubmit={formik.handleSubmit} autoComplete="off">
                        <div className="mt-2">
                            <label htmlFor="name" className="block mb-2 font-display text-sm font-medium text-gray-900 ">Name</label>
                            <input
                                autoComplete="off"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text" id="name" className=" w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " required />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="description" className="block mb-2  font-display text-sm font-medium text-gray-900 ">Description</label>
                            <textarea
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                id="description" className=" w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " required />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="resource-type" className="block mb-2 text-sm font-medium font-display text-gray-900 ">Resource Type</label>

                            <div className="flex justify-between items-center">
                                <div className={`${selectedType === 'text' ? "bg-[#29015f] w-1/4 text-center rounded-sm cursor-pointer transition-all duration-300 transform hover:scale-105" : "bg-gray-200 w-1/4 text-center rounded-sm cursor-pointer transition-all duration-300 transform hover:scale-105"}`} onClick={() => { setSelectedType('text') }}>
                                    <p className={`${selectedType === 'text' ? "font-display font-medium text-white" : "font-display font-medium"}`}>Text</p>
                                </div>
                                <div className={`${selectedType === 'image' ? "bg-[#29015f] w-1/4 text-center rounded-sm cursor-pointer transition-all duration-300 transform hover:scale-105" : "bg-gray-200 w-1/4 text-center rounded-sm cursor-pointer transition-all duration-300 transform hover:scale-105"}`} onClick={() => { setSelectedType('image') }}>
                                    <p className={`${selectedType === 'image' ? "font-display font-medium text-white" : "font-display font-medium"}`}>Image</p>
                                </div>
                                <div className={`${selectedType === 'link' ? "bg-[#29015f] w-1/4 text-center rounded-sm cursor-pointer transition-all duration-300 transform hover:scale-105" : "bg-gray-200 w-1/4 text-center rounded-sm cursor-pointer transition-all duration-300 transform hover:scale-105"}`} onClick={() => { setSelectedType('link') }}>
                                    <p className={`${selectedType === 'link' ? "font-display font-medium text-white" : "font-display font-medium"}`}>Link</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            {selectedType === 'text' ? (<><label htmlFor="text" className="block mb-2  font-display text-sm font-medium text-gray-900 ">Text</label>
                                <textarea
                                    value={formik.values.text}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="text" className=" w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " required />
                            </>) : (selectedType === 'link' ? (<><label htmlFor="link" className="block mb-2 font-display text-sm font-medium text-gray-900 ">Link</label>
                                <input
                                    value={formik.values.link}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete="off"
                                    type="text" id="link" className=" w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " required />
                            </>) : (<>

                                <div className="mt-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Cover Image</label>
                                    <input onChange={handleFileChange} type="file" id="image" accept="image/*" className=" cursor-pointer w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " />
                                </div>
                                <div className="mt-2 w-full border  text-sm rounded-lg text-center block  p-2.5 ">
                                    {
                                        spinner ? (
                                            <FontAwesomeIcon icon={faSpinner} spin className="text-gray-900 text-md " />
                                        ) : imgContent ? (
                                            <img className="max-w-50 max-h-50 mx-auto" src={imgContent} />
                                        ) : null
                                    }
                                </div>


                            </>))}
                        </div>
                        <button type="submit" className="font-display text-white bg-[#29015f] mt-3 w-full rounded-xs py-1 text-lg  cursor-pointer hover:bg-[#c17dd4] transition-all duration-200">Create</button>
                    </form>
                </div>


            </div>


        </>
    )
}

export default EditResourceModal