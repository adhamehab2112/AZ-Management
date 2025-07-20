import AZ_Logo from "../../assets/logo2.png"
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
interface SignUpFormValues {
    name: string,
    email: string,
    password: string,
    username: string,
}

function SignUp() {
    let navigate = useNavigate();
    const [error , setError] = useState("");
   async function handleSignUpSubmit(formValues: SignUpFormValues) {
        try {
             await axios.post(`http://147.93.127.229:3008/account/signup`, {
                name:formValues.name ,
                email:formValues.email,
                password:formValues.password,
                username:formValues.username
            });
            navigate("/login");
            
        }
        catch (e: any) {
            console.log(e);
            setError(e.response.data.error);

        }
    }

    let formik = useFormik<SignUpFormValues>({
        initialValues: {
            name: '',
            email: '',
            password: '',
            username: ''
        },
        onSubmit: handleSignUpSubmit
    });

    return (
        <div className=" bg-gradient-to-b from-[#9c09c5] via-[#5d0b8c] to-[#520ebe] min-h-screen">
            <div className="pt-10 text-center">
                <img className="w-20 mx-auto" src={AZ_Logo} />
                <p className="mt-3 text-white  font-display text-lg">Sign Up to AZ</p>
            </div>
            <div className="bg-white w-1/4 border rounded-xl shadow-2xl p-5 mx-auto mt-2">
                <form className="mx-auto" onSubmit={formik.handleSubmit}>
                    <div className="">
                        <label htmlFor="name" className=" font-display block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            type="text" id="name" className=" w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " required />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            type="text" id="username" className=" w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " required />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            type="email" id="email" className=" w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " required />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            type="password" id="password" className=" w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " required />
                    </div>
                    <button type="submit" className="font-display text-white bg-[#9c09c5] mt-3 w-full rounded-xs py-1 text-lg  cursor-pointer hover:bg-[#c17dd4] transition-all duration-200">Sign Up</button>
                </form>
                {error?(<p className="font-display text-red-600 mt-2">{error}</p>):("")}
            </div>
            <div className="mx-auto w-1/4 text-center mt-4 p-5 border border-white bg-white/20 backdrop-blur-md">
                <p className="text-white font-display">Already Have an Account? <Link to="/login" className="underline cursor-pointer">Login</Link></p>
            </div>
        </div>


    );
}

export default SignUp 