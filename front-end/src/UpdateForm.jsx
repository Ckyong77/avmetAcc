import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios"
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function UpdateForm() {
    const { id } = useParams()
    const [avmet, setAvmet] = useState({})
    const navigate = useNavigate()
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    useEffect(
        function () {
            const retrieveAvmet = async () => {
                let res = await axios.get(`${BACKEND_URL}${id}`)
                let data = res.data
                console.log(data)
                setAvmet(data)
            }
            retrieveAvmet()
        }, []
    )

    const submitHandler = async (event) => {
        event.preventDefault()
        console.log("submitted")
        navigate('/',{state:"success"})
        await axios.put(`${BACKEND_URL}${id}`, { avmet })
    }

    const updateHandle = (event) => {
        setAvmet((currValue) => {
            return { ...currValue, [event.target.name]: event.target.value }
        })
    }

    const cancelHandler = (event)=>{
        navigate('/', {state:"cancelled"})
    }
    
    return (
        <form onSubmit={submitHandler}>
            <Box
                component="div"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={submitHandler}
            >
                <p>{avmet.mcl}</p>
                <p>{avmet.tailNo}</p>
                <div>
                    <TextField
                        id="outlined-basic"
                        name="location"
                        label="Location"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                            style: { color: "white" }
                        }}
                        sx={{ input: { color: "white" } }}
                        value={avmet.location ? avmet.location : ""}
                        onChange={updateHandle}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        name="user"
                        label="User"
                        variant="outlined"
                        onChange={updateHandle}
                        InputLabelProps={{
                            shrink: true,
                            style: { color: "white" }
                        }}
                        sx={{ input: { color: "white" } }}
                    />
                </div>
                <div>
                    <label htmlFor="bookIO">Book In/Out</label>
                    <Select
                        value={avmet.bookIO ? avmet.bookIO : ""}
                        onChange={updateHandle}
                        displayEmpty
                        id="bookIO"
                        name="bookIO"
                        style={{ color: "white" }}
                    >
                        <MenuItem value="In">Book In</MenuItem>
                        <MenuItem value="Out">Book Out</MenuItem>
                        <MenuItem value="HOTO">HOTO</MenuItem>
                    </Select>
                </div>
                <div>
                    <label htmlFor="status">Status</label>
                    <Select
                        value={avmet.status ? avmet.status : ""}
                        onChange={updateHandle}
                        displayEmpty
                        id="status"
                        name="status"
                        style={{ color: "white" }}

                    >
                        <MenuItem value="Det">Det</MenuItem>
                        <MenuItem value="Live">Live</MenuItem>
                    </Select>
                </div>
                <Button variant="outlined" color="error" onClick={cancelHandler}>
                    Cancel
                </Button>
                <Button variant="contained" color="success" type="submit">
                    Submit
                </Button>
            </Box>
        </form>
    )

}

export default UpdateForm