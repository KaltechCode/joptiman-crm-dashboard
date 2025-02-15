import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, LinearProgress, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import LinearProgressWithLabel from '../ProgressBar';

const CRMGrid = (props) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  const linkTemplate = (data, col) => {
    if (col.to) {
      return (
        <Link to={col?.appendID ? col.to + data["_id"] : col.to}>
          {data[col.field]}
        </Link>
      );
    }
    return (
      <Link to={props.baseURL + data["_id"]} style={{ textDecoration: 'none', color: 'inherit' }}>
        {data[col.field]}
      </Link>
    );
  };

  // const progressBarTempelate =(value)=>{
  //   <LinearProgress color="secondary" variant="indeterminate" />
  // }
  return (
    <TableContainer
      component={Paper}
      style={{
        borderTopLeftRadius: '64px',
        borderTopRightRadius: '64px',
        marginTop: '15px',
        marginLeft: '10px',
        marginRight: '10px',
        marginBottom: '20px',
        boxShadow: 'none'
      }}
    >
      <Table stickyHeader aria-label="sticky table" sx={{}}>
        <TableHead style={{ height: '10vh' }}>
          <TableRow>
            {props.gridHeader.length > 0 &&
              props.gridHeader.map((headerObj) => (
                <TableCell key={headerObj.field} style={{ backgroundColor: '#DADADA' }}>{headerObj.headerName}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.gridData ? (
              props.gridData.map((row, index) => (
                <TableRow
                  key={index}
                  onMouseEnter={() => setHoveredRowIndex(index)}
                  onMouseLeave={() => setHoveredRowIndex(null)}
                  style={{ backgroundColor: index === hoveredRowIndex ? '#F08613' : 'white', height: '5vh' }}
                >
                  {props.gridHeader.map((headerObj) => (
                    <TableCell
                      key={headerObj.field}
                      style={{
                        paddingTop: '8px',
                        paddingBottom: '8px',
                        borderBottom: '6px solid rgba(224, 224, 224, 1)',
                        color: row.isApproved
                          ? (row.isChargedBack
                            ? "red"
                            : "#008000"
                          )
                          : 'black'
                      }}
                    >
                      {
                        headerObj.isCheckbox ? (
                          <input
                            type="checkbox"
                            checked={props.selectedIds.includes(row._id)}
                            onChange={() => props.handleCheckboxChange(row._id)}
                          />
                        ) : headerObj.field === 'img' ? (
                          <Avatar src={row[headerObj.field]} shape="circle" size="large" />
                        ) : headerObj.isLink ? (
                          linkTemplate(row, headerObj)
                        )
                          : headerObj.isProgressBar ? (
                            <LinearProgressWithLabel value={row[headerObj.field]} />
                          )
                            : (
                              row[headerObj.field]
                            )
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )
              :
              (
                <TableRow>
                  <Typography sx={{ width: '743%', textAlign: 'center' }}>No Records Found</Typography>
                </TableRow>
              )
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CRMGrid;