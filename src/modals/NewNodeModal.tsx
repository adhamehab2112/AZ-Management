import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ModalProps {
    onClose: () => void,
    unitId: string | undefined
}
interface FormValues {
    name: string,
    color: string
}

function NewNodeModal({ onClose, unitId }: ModalProps) {
    const colors = [
        { name: 'yellow', class: 'bg-yellow-300' },
        { name: 'green', class: 'bg-green-300' },
        { name: 'pink', class: 'bg-pink-300' },
        { name: 'purple', class: 'bg-purple-300' },
        { name: 'blue', class: 'bg-blue-300' },
        { name: 'gray', class: 'bg-gray-200' },
        { name: 'dark', class: 'bg-gray-600' },
    ];

    let navigate = useNavigate();
    const [selectedColor, setSelectedColor] = useState<string>('yellow');
    const userObjectString = localStorage.getItem("userDetails");
    const userObject = userObjectString ? JSON.parse(userObjectString) : null;

    async function handleSubmit(formData: FormValues) {
        let token = userObject?.token;
        try {
            let response = await axios.post(`http://147.93.127.229:3008/nodes/${unitId}`, {
                name: formData.name,
                description: "Node description",
                type: "folder",
                color: formData.color
            },
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`,
                    }
                });
                
            navigate(0);
        }
        catch(e:any)
        {
            console.log(e);
        }

    }
    function handleColorSelection(color: string) {
        setSelectedColor(color);
        formik.setFieldValue('color', color);
    }
    let formik = useFormik<FormValues>({
        initialValues: {
            name: "",
            color: ""
        },
        onSubmit: handleSubmit
    })
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/75 bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-lg w-96 relative shadow-lg">
                <button className="absolute top-2 right-3 text-gray-500 text-xl cursor-pointer" onClick={onClose}>
                    ×
                </button>
                <h2 className="text-xl font-bold mb-4">Add a New Node</h2>
                <div className="">
                    <form className="mx-auto" onSubmit={formik.handleSubmit}>
                        <div className="mt-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                            <input
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text" id="name" className=" w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " required />
                        </div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700 mt-2">Color</label>
                        <div className="flex items-center space-x-2 mb-6">
                            {colors.map((color) => (
                                <div
                                    key={color.name}
                                    className={`w-8 h-8 rounded cursor-pointer border-2${selectedColor === color.name ? 'border-black scale-110' : 'border-transparent'
                                        } ${color.class} transition-transform`}
                                    onClick={() => handleColorSelection(color.name)}
                                ></div>
                            ))}
                        </div>
                        <button type="submit" className="font-display text-white bg-[#29015f] mt-3 w-full rounded-xs py-1 text-lg  cursor-pointer hover:bg-[#c17dd4] transition-all duration-200">Create</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default NewNodeModal