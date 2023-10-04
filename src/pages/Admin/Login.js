import React, {useEffect, useState} from 'react';
// import Helmet from 'react-helmet';
import Logo from '../../Assets/img/logo.svg';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import "../../firebase";
import LoadingButton from "../../components/Shared/LoadingButton";
import TextInput from "../../components/Shared/TextInput";
import {useNavigate} from "react-router";
import {Navigate} from "react-router-dom";


const Login = () => {
    const [password, setPassword] = useState('');
    const [processing, setProcessing] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState({
        error: false, msg: {
            email: "",
            password: ""
        }
    })
    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth_Token')
        if (authToken) {
            // navigate('/admin/dashboard')
            return <Navigate to="/users" replace={true}/>
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        if(email==="" || password===""){
            setMessage({error: true,msg:{
                    email:(email==="")?"email required":'',
                    password:(password==="")?"password required":'',
                }})
            setProcessing(false);
            return;
        }

        const authentication = getAuth();
        signInWithEmailAndPassword(authentication, email, password)
            .then((response) => {
                navigate('/admin/dashboard')
                sessionStorage.setItem('Auth_Token', response._tokenResponse.refreshToken)
            })
            .catch((error) => {
                console.log(error.code)
                if (error.code === 'auth/wrong-password') {
                    // toast.error('Please check the Password');
                }
                if (error.code === 'auth/user-not-found') {
                    // toast.error('Please check the Email');
                }
            })

        setProcessing(false);
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen p-6 bg-indigo-900">
                {/*<Helmet title="Login"/>*/}
                <div className="w-full max-w-md">
                    <img
                        alt={"logo"}
                        src={Logo}
                        className="block w-full w-48 max-w-xs mx-auto text-white fill-current"
                    />
                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 overflow-hidden bg-white rounded-lg shadow-xl"
                    >
                        <div className="px-10 pt-12">
                            <h1 className="text-4xl font-semibold text-center">Login</h1>
                            <div className="w-24 mx-auto mt-6 border-b-2"/>
                            <TextInput
                                className="mt-10"
                                label="Email"
                                name="email"
                                type="email"
                                errors={message.msg.email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <TextInput
                                className="mt-6"
                                label="Password"
                                name="password"
                                type="password"
                                errors={message.msg.password}
                                onChange={e => setPassword(e.target.value)}
                            />

                        </div>
                        <div
                            className="flex items-center justify-between px-10 py-4 bg-gray-100 border-t border-gray-200">
                            <LoadingButton
                                type="submit"
                                loading={processing}
                                className="px-6 py-3 rounded bg-indigo-700 text-white text-sm font-bold whitespace-nowrap hover:bg-orange-500 focus:bg-orange-500"
                            >
                                Login
                            </LoadingButton>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};


export default Login;