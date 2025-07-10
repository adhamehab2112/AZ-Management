import AZ_Logo from "../../assets/logo2.png"
import { useFormik } from "formik";
import axios from "axios";
import { Link,  useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
interface LoginFormValues {
    email: string,
    password: string,

}

function Login() {
    let navigate = useNavigate();
    let [spinner , setSpinner] = useState(false);
    let [errorMessage,setErrorMessage] = useState("");
    async function handleLoginSubmit(formValues: LoginFormValues) {
        setSpinner(true);
        try {
            let response = await axios.post(`http://147.93.127.229:3008/account/login`, {
                email: formValues.email,
                password: formValues.password,
            });
            console.log(response)
            if(response.statusText === 'OK')
            {
                localStorage.setItem('userDetails',JSON.stringify(response.data));
                navigate("/home");
                
            }
        }
        catch (e: any) {
            setSpinner(false);
            setErrorMessage(e.response.data.error);
        }
    }

    let formik = useFormik<LoginFormValues>({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: handleLoginSubmit
    });

    return (
        <div className=" bg-gradient-to-b from-[#9c09c5] via-[#5d0b8c] to-[#520ebe] min-h-screen">
            <div className="pt-10 text-center">
                <img className="w-20 mx-auto" src={AZ_Logo} />
                <p className="mt-3 text-white  font-display text-lg">Login to AZ</p>
            </div>
            <div className="bg-white w-1/4 border rounded-xl shadow-2xl p-5 mx-auto mt-2">
                <form className="mx-auto" onSubmit={formik.handleSubmit}>
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
                    {errorMessage&&<p className="text-xs mt-2 font-display text-red-600">This Email Or Password may be wrong</p>}
                    <button type="submit" className="font-display text-white bg-[#9c09c5] mt-3 w-full rounded-xs py-1 text-lg  cursor-pointer hover:bg-[#c17dd4] transition-all duration-200">Login {spinner&&<FontAwesomeIcon icon={faSpinner} spin className="text-white text-md" />} </button>
                </form>

            </div>
            <div className="mx-auto w-1/4 text-center mt-4 p-5 border border-white bg-white/20 backdrop-blur-md">
                <p className="text-white font-display">Don't Have an Account? <Link to="/sign_up" className="underline cursor-pointer">Sign Up</Link></p>
            </div>
        </div>
    );
}

export default Login