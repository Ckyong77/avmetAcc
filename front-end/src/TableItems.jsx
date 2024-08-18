import { TableRow } from "@mui/material"
import { useState } from "react";
import TableCell from '@mui/material/TableCell';


function TableItems({avmet,clickHandler}) {
    const [hover, setHover] = useState(false);
    return (
        <TableRow
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick = { () => clickHandler(avmet.mcl)}
            style={{ cursor: 'pointer', backgroundColor: hover ? "#b2b1b1" : null }}>
            <TableCell component="th" scope="row"> {avmet.mcl}</TableCell>
            <TableCell align="right">{avmet.tailNo}</TableCell>
            <TableCell align="right">{avmet.location}</TableCell>
            <TableCell align="right">{avmet.user}</TableCell>
            <TableCell align="right">{avmet.bookIO}</TableCell>
            <TableCell align="right">{avmet.status}</TableCell>
            <TableCell align="right">{avmet.sqn}</TableCell>
        </TableRow>
    )
}

export default TableItems