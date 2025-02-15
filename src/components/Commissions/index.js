import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Layout/Header'
import SideBar from '../../Layout/Sidebar'
import { Box, Button, Grid, Hidden, InputAdornment, Stack, Tab, Tabs, TextField } from '@mui/material'
import CRMGrid from '../../shared-component/CRM-Grid.jsx'
// import CRMGrid from '../../shared-component/CRM-Grid.jsx'
import httpClient from '../../_util/api'
import CustomizedSnackbars from '../../shared-component/Snackbar/SnackBar.jsx'
import { useDispatch } from 'react-redux'
import { hideLoader, showLoader } from '../../Store/mainSlice.js'
import { MagnifyingGlass, Minus } from 'phosphor-react'


const Commissions = () => {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"))
  const isFinanceUser = JSON.parse(localStorage.getItem("isFinanceUser"))
  const agentCode = localStorage.getItem("agentCode")
  const snackbar_Ref = useRef(null);
  const dispatch = useDispatch()
  const [transactionClicked, setTransactionClicked] = useState(false)
  const [selectedTransactionClicked, setSelectedTransactionClicked] = useState(false)
  const [transactionDetailsClicked, setTransactionDetailsClicked] = useState(false)
  const [gridData, setGridData] = useState([])
  const [searchString, setSearchString] = useState("")
  const [selectedCommissionId, setSelectedCommissionId] = useState([])

  const gridHeader = [
    {
      field: '_id',
      isCheckbox: true,
      headerName: (
        <input
          type="checkbox"
          onChange={(e) => {
            // Handle checkbox click for all rows
            if (e.target.checked) {
              const allCommissionId = gridData.map((commission) => commission.id);
              console.log("allCommissionId", allCommissionId);
              setSelectedCommissionId(allCommissionId);
            } else {
              setSelectedCommissionId([]);
            }
          }}
        />
      ),
    },
    {
      field: 'policyApprovalDate',
      headerName: "Policy Approval Date:",
      isLink: true,

    },
    {
      field: 'policyCarrier',
      headerName: "Policy Carrier:",
      isLink: true,
    },
    {
      field: 'policyNumber',
      headerName: "Policy Number:",
      isLink: true,
    },
    {
      field: 'agentCarrierNumber',
      headerName: "Agent Carrier Number",
      isLink: true,
    },
    {
      field: 'agentCode',
      headerName: "Agent Code:",
      isLink: true,
    },
    {
      field: 'policyValue',
      headerName: "Premium:",
      isLink: true,
    },
    {
      field: 'splitPercentage',
      headerName: "Split%:",
      isLink: true

    },
    {
      field: 'agencyCommissionPercentage',
      headerName: 'Agency Commission %',
      isLink: true,
    },
    {
      field: 'agencyCommission',
      headerName: 'Agency Commission',
      isLink: true,
    },
    {
      field: 'commissionableAmountPercentage',
      headerName: 'Commissionable Amount',
      isLink: true,
    },
    // (isAdmin
    //   ? [
    {
      field: 'paidAgencyCommission',
      headerName: 'Paid Agency Commission',
      isProgressBar: true,
    },
    // ]
    // : []),
    {
      field: 'advPaymentPercentage',
      headerName: "Earned Adv %:",
      isLink: true,
    },
    {
      field: 'advPayment',
      headerName: "Earned Adv Amount:",
      isLink: true,
    },
    {
      field: 'contractLevel',
      headerName: "Writting Agent Contract Level:",
      isLink: true,
    },
    {
      field: 'agentCommission',
      headerName: 'Writting Agent Commission',
      isLink: true,
    },
    {
      field: 'overwrittingAgentContractLevel1',
      headerName: "OW Agent1 Contract Level:",
      isLink: true,
    },
    {
      field: 'overwrittingAgentCommission1',
      headerName: "OW1 Agent Commission:",
      isLink: true,
    },
    {
      field: 'overwrittingAgentContractLevel2',
      headerName: "OW Agent2 Contract Level::",
      isLink: true,
    },
    {
      field: 'overwrittingAgentCommission2',
      headerName: "OW2 Agent Commission:",
      isLink: true,
    },
    {
      field: 'split1_splitRatio',
      headerName: "Split1 %",
      isLink: true,
    },
    {
      field: 'split1_agentCommission',
      headerName: "Split1 Agent Commission",
      isLink: true,
    },
    {
      field: 'split_1_OWAgent1_Commission',
      headerName: 'Split1 OW1 commission',
      isLink: true,
    },
    {
      field: 'split_1_OWAgent2_Commission',
      headerName: 'Split1 OW2 commission',
      isLink: true,
    },
    {
      field: 'split2_splitRatio',
      headerName: "Split2 %",
      isLink: true,
    },
    {
      field: 'split2_agentCommission',
      headerName: "Split2 Agent Commission",
      isLink: true,
    },
    {
      field: 'split_2_OWAgent1_Commission',
      headerName: 'Split2 OW1 commission',
      isLink: true,
    },
    {
      field: 'split_2_OWAgent2_Commission',
      headerName: 'Split2 OW2 commission',
      isLink: true,
    }
  ]

 

  const gridHeaderAgent =[
    {
      field: 'policyApprovalDate',
      headerName: "Policy Approval Date:",
      isLink: true,

    },
    {
      field: 'policyCarrier',
      headerName: "Policy Carrier:",
      isLink: true,
    },
    {
      field: 'policyNumber',
      headerName: "Policy Number:",
      isLink: true,
    },
    {
      field: 'agentCarrierNumber',
      headerName: "Agent Carrier Number",
      isLink: true,
    },
    {
      field: 'agentCode',
      headerName: "Agent Code:",
      isLink: true,
    },
    {
      field: 'policyValue',
      headerName: "Premium:",
      isLink: true,
    },
    {
      field: 'splitPercentage',
      headerName: "Split%:",

    },
    {
      field: 'commissionableAmountPercentage',
      headerName: 'Commissionable Amount',
      isLink: true,
    },
    {
      field: 'contractLevel',
      headerName: "Writting Agent Contract Level:",
      isLink: true,
    },

    {
      field: 'agentCommission',
      headerName: 'Writting Agent Commission',
      isLink: true,
    },

  ]

  const handleCheckboxChange = (commissionId) => {
    // Handle checkbox change and update selectedCommissionId
    console.log("commissionId", commissionId)
    setSelectedCommissionId((prevIds) =>
      prevIds.includes(commissionId)
        ? prevIds.filter((id) => id !== commissionId)
        : [...prevIds, commissionId]
    );
  }

  const removeCommissionHandler = async () => {
    dispatch(showLoader())
    if (selectedCommissionId.length > 0) {
      const commissionIdsString = selectedCommissionId.join(',');
      const res = await httpClient.delete(`/policies/deleteCommission/${commissionIdsString}`).catch((error) => {
        dispatch(hideLoader())
        console.log("error: ", error)
        snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle")
      })

      if (res?.status === 200) {
        dispatch(hideLoader())
        LoadGridData()
        snackbar_Ref.current.showMessage("success", res?.data.message, "", "i-chk-circle")
        setSelectedCommissionId([])
      }

    }
  }



  const handleInputChange = (data) => {
    setSearchString(data);
  };

  const LoadGridData = async () => {
    dispatch(showLoader())
    const res = await httpClient.get(isAdmin ? `policies/getAllCommissions/?search=${searchString}` : isFinanceUser ? `policies/getAllCommissions/?search=${searchString}` : `policies/getAllCommissions_AgentView/${agentCode}/?search=${searchString}`)
      .catch((error) => {
        dispatch(hideLoader())
        snackbar_Ref.current.showMessage("error", error?.response.data.message, "", "i-chk-circle");
      })

    if (res?.status === 200) {
      dispatch(hideLoader())
      setGridData(res.data)

    }

  }

  useEffect(() => {
    LoadGridData()
  }, [searchString])

  return (
    <div>
      <Header />
      <div style={{ marginTop: '59px' }}>
        <div style={{
          display: 'flex',
          height: '91.6vh',
          overflowY: 'hidden'
        }}>
          <SideBar/>
          <CustomizedSnackbars ref={snackbar_Ref} />
          <Stack sx={{ width: '80.8%', marginLeft: '18%' }}>
            <Stack alignItems={'flex-end'}  >
              <Stack flexDirection={'row'}  justifyContent={'space-between'} sx={{ width: '58%'}}>
                <h2 style={{ color: 'black', textAlign: 'center' }}>Commission</h2>

                <Box sx={{ height: '12vh', marginTop: '20px', display: 'flex', alignItems: 'flex-end', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <TextField id="outlined-basic" placeholder="Search" variant="outlined" sx={{ width: '245px', height: '5vh' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MagnifyingGlass size={16} weight="light" />

                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => { handleInputChange(e.target.value) }}
                  />
                  <Button
                    variant="contained"
                    disabled={selectedCommissionId.length < 1 ? true : false}
                    sx={{
                      display: isAdmin ? 'flex' : 'none',
                      backgroundColor: "#003478",
                      color: 'white',
                      width: '245px',
                      height: "5vh",
                      fontSize: '12px',
                      "&:hover": {
                        backgroundColor: '#003478',
                      },
                    }}
                    onClick={removeCommissionHandler}
                  >
                    <Grid container
                      alignItems={'center'}
                      sx={{ width: '100%' }}
                    >
                      <Grid item md="9">Remove Commission</Grid>
                      <Grid item md="3"><Minus size={20} weight="light" /></Grid>
                    </Grid>
                  </Button>


                </Box>
              </Stack>

            </Stack>
            <Stack
              sx={{
                height: '203vh',
                overflow: "hidden",
              }}
            >
              <CRMGrid
                gridName='comissionGrid'
                gridHeader={isAdmin ? gridHeader : gridHeaderAgent}
                gridData={gridData}
                selectedIds={selectedCommissionId}
                handleCheckboxChange={handleCheckboxChange}
                sx={{ borderTopLeftRadius: '64px', borderTopRightRadius: '64px' }}
                baseURL={'/commissionDetail/'}
              />
              {/* </Stack> */}
            </Stack>
          </Stack>
        </div>
      </div>
    </div>
  )
}

export default Commissions