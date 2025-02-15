import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import httpClient from '../../_util/api';
import { Button } from '@mui/material';
import './style.scss';

const DownloadExcel = (props) => {
    const [downloadExcelClicked,setDownloadexcelClicked] = useState(false)

    const handleDownload = async () => {
        try {
            console.log('clicked')
            setDownloadexcelClicked(true)
            const response = await httpClient.post(props.isAdmin ? `/policies/statement/?search=${props.searchString}` : props.isFinanceUser ? `/policies/statement/?search=${props.searchString}` : `/policies/statementAgentView/${props.agentCode}/?search=${props.searchString}`,props.dates);

            if (response?.status === 200 ) {
                setDownloadexcelClicked(false)
                const data = response?.data.statements;

                // Convert the JSON data to a worksheet
                const worksheet = XLSX.utils.json_to_sheet(data);
                console.log("worksheet",worksheet)

                // Create a new workbook and append the worksheet
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

                // Generate a buffer from the workbook
                const excelBuffer = XLSX.write(workbook, {
                    bookType: 'xlsx',
                    type: 'array',
                });

                // Create a Blob from the buffer and trigger a download
                const blob = new Blob([excelBuffer], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
                });
                saveAs(blob, 'Sales Data.xlsx');
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Failed to download the Excel file:', error);
        }
    };

    return (
        <div>
            <Button
            variant="contained"
            className='button'
            sx={{
              display: props.isAdmin ? "flex" : props.isFinanceUser ? 'flex' : "none",
              backgroundColor: downloadExcelClicked ? '#F08613' : "#003478",
            //   backgroundColor: downloadExcelClicked ? '#F08613' : "#003478",
            //   color: 'white',
            //   width: '245px',
            //   height: "5vh";
            //   fontSize: '12px',
            //   "&:hover": {
            //     backgroundColor: '#F08613',
            //   },
            }}
            onClick={handleDownload}>Download Excel</Button>
        </div>
    );
};

export default DownloadExcel;
