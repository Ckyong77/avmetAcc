import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import './Register.css'

function RegisterPage() {
    const [user, setUser] = useState({ username: '', password: '', email: '' , admin:false})
    const [registerResult, setRegisterResult] = useState('')
    const [logged, setLogged] = useState(false)
    const navigate = useNavigate()
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    useEffect(
        function () {
            async function isLoggedIn() {
                try {
                    let res = await axios.get(`${BACKEND_URL}register`,{withCredentials:true})
                    let data = res.data
                    console.log(data)
                } catch (e) {
                    navigate(`${e.response.data}`)
                }
            } isLoggedIn()
        },[]
    )

    const registerUser = async () => {
        console.log(user)
        let res = await axios.post(`${BACKEND_URL}register`, { user },{withCredentials:true})
        let data = res.data
        setRegisterResult(data.message);
        reset();
    }

    useEffect(function () {
        registerUser()
    }
        , [user])

    const registerHandler = (formData) => {
        setUser({ ...user,username: formData.username, password: formData.password, email: formData.email });
    }

    const registerOptions = {
        username: { required: "username is required" },
        password: { required: "password is required" },
        email: { required: 'email is required' }
    }

    return (
        <form onSubmit={handleSubmit(registerHandler)} className='register'>
            <h1>Registration</h1>
            {registerResult && <p style={{ color: "red" }}>{registerResult}</p>}
            <div>
                <TextField
                    sx={{ input: { color: 'white' }, margin: 2 }}
                    label="Username"
                    variant="outlined"
                    InputLabelProps={{
                        style: { color: "white" }
                    }}
                    {...register("username", registerOptions.username)}
                />
                <br />
                <small style={{ color: "red" }}>{errors.username && errors.username.message}</small>
            </div>
            <div>
                <TextField
                    sx={{ input: { color: 'white' } }}
                    label="Password"
                    variant='outlined'
                    type='password'
                    InputLabelProps={{
                        style: { color: "white" }
                    }}
                    {...register("password", registerOptions.password)}
                />
                <br />
                <small style={{ color: "red" }}>{errors.password && errors.password.message}</small>
            </div>
            <div>
                <TextField
                    sx={{ input: { color: 'white' }, margin: 2 }}
                    label="Email"
                    variant='outlined'
                    type='email'
                    InputLabelProps={{
                        style: { color: "white" }
                    }}
                    {...register("email", registerOptions.password)}
                />
                <br />
                <small style={{ color: "red" }}>{errors.email && errors.email.message}</small>
            </div>
            <Button
                variant="contained"
                color="success"
                sx={{ marign: 2 }}
                type='submit'>
                Register
            </Button>
        </form>
    )
}

export default RegisterPage