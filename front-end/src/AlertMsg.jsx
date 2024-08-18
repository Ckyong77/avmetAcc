import Alert from '@mui/material/Alert';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AlertMsg({display, result}){
    const [show, setShow] = useState(display)
    const [message, setMessage] = useState(result)
    const navigate = useNavigate()

    useEffect(function(){
        console.log(show, message)
        const timeId = setTimeout(()=>{
            navigate('/', {repalce:true}) // to reset the state of useLocation
            setShow(false)
        }, 3000)

        return () => {
            clearTimeout(timeId)
        }
    },[]);

    if (!show){
        return null;
    }

    return (
        <div>
            {message === "cancelled" ?
            <Alert variant="filled" severity="error">
                Cancelled on Update
            </Alert> :
            <Alert variant="filled" severity="success">
                Updated Sucessfully!
            </Alert>}
        </div>
    )

}

export default AlertMsg