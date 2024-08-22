import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [loginDetails, setLoginDetails] = useState({ username: '', password: '' });
    const [loginResult, setLoginResult] = useState(true);
    const [failMessage, setFailMessage] = useState('');
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onChange" })
    const navigate = useNavigate()

    async function verifyLogin() {
        try {
            //spreading the details because passing into node will be {loginDetails : {username:username, password:password}}
            let res = await axios.post(`${BACKEND_URL}login`, { ...loginDetails })
            let data = res.data;
            console.log(data)
            if (data) {
                navigate('/')
            }
        }
        catch (e) {
            if(e.response.status === 400){
                setFailMessage('Please Log In to Access')
            }else if(e.response.status === 401){
                setFailMessage('Log In Credentials Wrong')
            } else{
                setFailMessage('Something Went Wrong')
            }
            setLoginResult(false)
        }
    }

    useEffect(function () {
        verifyLogin()
    }, [loginDetails])

    function loginHandler(formData) {
        setLoginDetails({ username: formData.username, password: formData.password });
        reset();
    }

    const loginOption = {
        username: { required: "username cannot be blank" },
        password: { required: "password cannot be blank" }
    }

    return (
        <form onSubmit={handleSubmit(loginHandler)} >
            <h1>Login</h1>
            {loginResult === false && <p style={{ color: "red" }}>{failMessage}</p>}
            <div>
                <InputLabel htmlFor="username" style={{ color: 'white' }}>
                    Username
                </InputLabel>
                <Input
                    style={{ backgroundColor: 'white' }}
                    id="username"
                    name='username'
                    {...register('username', loginOption.username)}
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircle style={{ backgroundColor: 'white' }} />
                        </InputAdornment>
                    }
                />
            </div>
            <div>
                <InputLabel htmlFor="password"
                    style={{ color: 'white' }}>
                    Password
                </InputLabel>
                <Input
                    type='password'
                    style={{ backgroundColor: 'white' }}
                    id='password'
                    name='password'
                    {...register('password', loginOption.password)}
                />
            </div>
            <Button
                variant="contained"
                color="success"
                type='submit' >
                Login
            </Button>
        </form>
    )
}

export default LoginPage