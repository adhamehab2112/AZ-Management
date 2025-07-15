import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
interface ModalProps {
    onClose: () => void
}


interface FormValues {
    name: string,
    description: string,
    type: string,
    coverUrl: string
}



function NewUnitModal({ onClose }: ModalProps) {
    let [imgContent, setImgContent] = useState<string | null>(null);
    let [spinner, setSpinner] = useState(false);
    const userObjectString = localStorage.getItem("userDetails");
    const userObject = userObjectString ? JSON.parse(userObjectString) : null;
    let navigate = useNavigate();
    async function handleSubmit(formValues: FormValues) {
        console.log(formValues);
        let token = userObject?.token;
        try {
            let response = await axios.post(`http://147.93.127.229:3008/units`, {
                name: formValues.name,
                description: formValues.description,
                type: formValues.type,
                coverUrl: formValues.coverUrl
            },
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`,
                    }
                });
            console.log(response);
            navigate(0);
            
        }
        catch (e: any) {
            console.log(e);
        }

    }

    let formik = useFormik<FormValues>({
        initialValues: {
            name: "",
            description: "",
            type: "Project",
            coverUrl: "",
        },
        onSubmit: handleSubmit

    });

    async function getImgUrl(file: File) {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(`http://147.93.127.229:3008/upload/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            formik.setFieldValue('coverUrl', response.data.message);
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
                    <form className="mx-auto" onSubmit={formik.handleSubmit}>
                        <div className="mt-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                            <input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                type="text" id="name" className=" w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " required />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                            <textarea
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                                id="description" className=" w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " required />
                        </div>
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
                        <button type="submit" className="font-display text-white bg-[#29015f] mt-3 w-full rounded-xs py-1 text-lg  cursor-pointer hover:bg-[#c17dd4] transition-all duration-200">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewUnitModal