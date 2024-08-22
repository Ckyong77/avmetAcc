import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TableItems from './TableItems';
import axios from 'axios';
import BACKEND_URL from '../constant';
import AlertMsg from './AlertMsg';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



function AvmetTable() {
    const [avmetList, setavmetList] = useState([{}]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const uselocation = useLocation();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    useEffect(function () {
        initialiseAvmetList()
    }, []
    )

    const initialiseAvmetList = async () => {
        try {
            let res = await axios.get(`${BACKEND_URL}`)
            let data = res.data
            console.log(data)
            setavmetList(data)
        } catch (e) {
            navigate('/login')
        }
    }

    const clickHandler = (mcl) => {
        navigate(`/${mcl}`)
    }

    const searchHandler = (event) => {
        event.preventDefault();
        if (search) {
            setavmetList((currData) => {
                return currData.filter((e) => e.tailNo === search)
            })
        } else {
            initialiseAvmetList()
        }

    }

    const updateHandler = (event) => {
        console.log(event.target.value)
        if (event.target.value === "") {
            setSearch("")
            initialiseAvmetList()
        } else {
            setSearch(event.target.value)
        }
    }

    const resetHandler = (event) => {
        event.preventDefault()
        setSearch('')
        initialiseAvmetList()
    }

    const logoutHandler = async () => {
        let logout = await axios.get(`${BACKEND_URL}logout`)
        console.log(logout)
        navigate('/login')
    }

    return (
        <div>
            <button onClick={logoutHandler}>Logout</button>
            {uselocation.state !== null &&
                <AlertMsg
                    display={true}
                    result={uselocation.state}
                />}

            <form onSubmit={searchHandler}>
                <InputLabel
                    htmlFor="search"
                    style={{ color: "white" }}
                >Search</InputLabel>
                <Input
                    id="search"
                    type='text'
                    onChange={updateHandler}
                    value={search}
                    style={{ color: "black", backgroundColor: 'white' }}
                    endAdornment={
                        <InputAdornment position="end">
                            {search &&
                                <IconButton>
                                    <CloseIcon type="reset" onClick={resetHandler} />
                                </IconButton>

                            }
                        </InputAdornment>
                    }
                />
                <IconButton
                    style={{ backgroundColor: "#6a6a6a" }}
                    type="submit"
                >
                    <SearchIcon />
                </IconButton>

            </form>

            < TableContainer component={Paper} >
                <Table sx={{ minWidth: 650, width: "auto" }} aria-label="simple table">
                    <TableHead style={{ backgroundColor: "#95908e" }}>
                        <TableRow  >
                            <TableCell>MCL</TableCell>
                            <TableCell align="right" >Tail No</TableCell>
                            <TableCell align="right">Location</TableCell>
                            <TableCell align="right">User</TableCell>
                            <TableCell align="right" style={{ textWrap: "pretty" }}>Movement</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">SQN</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {avmetList.map((avmet) => (
                            <TableItems
                                // onClick={() => clickHandler(avmet.mcl)}
                                key={avmet.mcl}
                                avmet={avmet}
                                clickHandler={clickHandler}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            </TableItems>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </div>
    )
}


export default AvmetTable