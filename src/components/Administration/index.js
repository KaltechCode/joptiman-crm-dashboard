import React, { useEffect, useRef, useState } from "react";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/Sidebar";
import { Box, Stack } from "@mui/system";
import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import AllAgentsIcon from "../../assets/AllAgentsIcon.png";
import { Button } from "@mui/material";
import { MagnifyingGlass, Minus, Plus } from "phosphor-react";
import CRMGrid from "../../shared-component/CRM-Grid.jsx";
import "./style.scss";
import profilePhoto from "../../assets/profilePhotoCRM.png";
import { useNavigate } from "react-router-dom";
import httpClient from "../../_util/api.jsx";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../Store/mainSlice.js";
import PageLoader from "../../Layout/FullPageLoader/FullPageLoader.jsx";
import CustomSnackbar from "../../shared-component/Snackbar/SnackBar.jsx";
import Dropdown from "../../shared-component/AdministrationDropdown/Dropdown.jsx";
import JOptimanLogo from "../../assets/JOptimanLogo-Large.png";

const Administration = () => {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showGrid, setShowGrid] = useState(false);

  const homeOfficeData = [
    {
      deptName: "Licensing and Contracting Department",
      email: "info@joptimanconsultancy.com",
      phoneNumber: "(469)382-7970",
    },
    {
      deptName: "New and in force policy Department",
      email: "info@joptimanconsultancy.com",
      phoneNumber: "(469)382-7970",
    },
    {
      deptName: "Annuities",
      email: "info@joptimanconsultancy.com",
      phoneNumber: "(469)382-7970",
    },
    {
      deptName: "Tech Support",
      email: "info@joptimanconsultancy.com",
      phoneNumber: "(469)382-7970",
    },
  ];
  const AdministrationMenu = [
    {
      title: "Home Office",
      ...(isAdmin
        ? {
            isLink: true,
            url: "https://drive.google.com/file/d/1tEOfJATDMpMVZZtmt_JQAvSYru14R8qT/view?usp=drive_link",
          }
        : {
            isGrid: true,
          }),
    },
    {
      title: "Onboarding & Contracting",
      options: [
        {
          name: "Our System Flow Chart",
          url: "https://drive.google.com/file/d/1jloXU97IUywnT5kkkaK5lYalIFVmfi1m/view?usp=drive_link",
        },
        {
          name: "SureLC Joptiman",
          url: "https://accounts.surancebay.com/oauth/authorize?redirect_uri=https:%2F%2Fsurelc.surancebay.com%2Fproducer%2Foauth%3FreturnUrl%3D%252Fprofile%252Fcontact-info%253FgaId%253D1034%2526gaId%253D1034%2526branch%253DJOptiman%252520LOA%2526branchVisible%253Dtrue%2526branchEditable%253Dfalse%2526branchRequired%253Dtrue%2526dba%253DS%2526autoAdd%253Dfalse%2526requestMethod%253DGET&gaId=1034&client_id=surecrmweb&response_type=code",
        },
        {
          name: "3Mark Appointment",
          url: "https://surelc.surancebay.com/sbweb/login.jsp?bcc=alexandra.galla%403mark.com&branch=JOptiman%20Consultancy%2CLLC&branchEditable=off&branchRequired=on&branchVisible=on&cc=admin%40joptimanconsultancy.com&gaId=41&gaName=3%20Mark%20Financial%2C%20Inc.",
        },
      ],
    },
    {
      title: "Communication",
      options: [
        {
          name: "Emails",
        },
      ],
      isEmail: true,
    },
    {
      title: "Guidlines and Policies",
      options: [
        {
          name: "NAIC. State Licensing Handbook",
          url: "https://content.naic.org/sites/default/files/inline-files/State%20Licensing%20Handbook%20-%20Complete%20and%20Final.pdf",
        },
        {
          name: "Doing Bussiness With Athene Guidelines",
          url: "https://p.widencdn.net/8cqsjm/19608",
        },
      ],
    },
    {
      title: "Producing Agent Standards Operating",
      options: [
        {
          name: "Producing Agent Trainee",
          url: "https://docs.google.com/presentation/d/1J1pIHWkPCmyn-5PVXxACHsz5Zvgh3Na4/edit?usp=drive_link&ouid=109044533597939584194&rtpof=true&sd=true",
        },
        {
          name: "Joptiman Process",
          url: "https://drive.google.com/file/d/1n_32WlHcIr7QDqPOD5JRUt4Yexj0GzG3/view?usp=drive_link",
        },
      ],
    },
    {
      title: "Compliance",
      options: [
        {
          name: "Free Anti Money Laundy Training",
          url: "https://aml.surancebay.com/",
        },
        {
          name: "Errors and Omission Compliance",
          url: "https://www.joptiman.com/error_and_omission",
        },
      ],
    },
    {
      title: "Forms",
      options: [
        {
          name: "TransAmerica Forms Search",
          url: "https://formspipe.ipipeline.com/?ProfileId=3020",
        },
        {
          name: "Athene Forms and Materials",
          url: "https://www.athene.com/producer/connect/tools/forms-materials",
        },
        {
          name: "JOptiman Status Change Form",
          url: "https://us.services.docusign.net/webforms-ux/v1.0/forms/c3b64a9e61e4256215319b9425a220a8",
        },
        {
          name: "Direct Deposit Authorization Form",
          url: "https://us.services.docusign.net/webforms-ux/v1.0/forms/27eb3c85edf0e2d7bb742efb5419535a",
        },
        {
          name: "Independent Agent Contract",
          url: "https://us.services.docusign.net/webforms-ux/v1.0/forms/a634749e616b0e1327dedfbd33b1a277",
        },
      ],
    },
    {
      title: "Promotions",
      options: [
        {
          name: "Advancement Guidlines",
          url: "https://drive.google.com/file/d/19A9t8R90d9Otud4Xwd6k1kHK7pEydjON/view?usp=drive_link",
        },
        {
          name: "Commission Grid",
          url: "https://drive.google.com/file/d/11bFvkJWG6mzC_hUIRuDXIEGdT3-9P96K/view?usp=drive_link",
        },
      ],
    },
    {
      title: "Direct Deposit",
      isLink: true,
      url: "https://portal.asurehcm.com ",
    },
  ];

  function openPDFInNewTab(pdfUrl) {
    // Create a new <a> element
    const link = document.createElement("a");
    // Set the href attribute to the PDF file URL
    link.href = pdfUrl;
    // Set the target attribute to '_blank' to open in a new tab
    link.target = "_blank";
    // Trigger a click event on the link
    link.click();
  }

  const handleShowOfficeGrid = () => {
    setShowGrid(!showGrid);
  };

  return (
    <>
      <PageLoader />
      <Header />
      <div style={{ marginTop: "56px" }}>
        <div
          style={{
            display: "flex",
            height: "92vh",
            // overflowY: 'hidden'
          }}
        >
          <SideBar />

          <Stack className="administration-container">
            <h2 style={{ color: "black", textAlign: "center" }}>
              Administration
            </h2>
            <Stack flexDirection={"row"}>
              <Stack className="administration-inner-container">
                <Stack
                  justifyContent={"space-between"}
                  sx={{
                    width: "85%",
                  }}
                >
                  {AdministrationMenu.map((menu) => {
                    return menu.isLink ? (
                      <Button
                        aria-controls="dropdown-menu"
                        aria-haspopup="true"
                        onClick={(e) => {
                          openPDFInNewTab(menu.url);
                          e.stopPropagation();
                        }}
                        sx={{
                          backgroundColor: "#003478",
                          color: "white",
                          height: "36px",
                          width: "267px",
                          fontSize: "12px",
                          padding: "3px",
                          marginTop: "4px",
                          borderTopLeftRadius: "0",
                          borderBottomLeftRadius: "0",
                          "&:hover": {
                            backgroundColor: "#003478",
                          },
                        }}
                      >
                        {menu.title}
                      </Button>
                    ) : menu.isGrid ? (
                      <>
                        <Button
                          aria-controls="dropdown-menu"
                          aria-haspopup="true"
                          onClick={handleShowOfficeGrid}
                          sx={{
                            backgroundColor: "#003478",
                            color: "white",
                            height: "36px",
                            width: "267px",
                            fontSize: "12px",
                            padding: "3px",
                            marginTop: "4px",
                            borderTopLeftRadius: "0",
                            borderBottomLeftRadius: "0",
                            "&:hover": {
                              backgroundColor: "#003478",
                            },
                          }}
                        >
                          {menu.title}
                        </Button>

                        {showGrid &&
                          homeOfficeData.map((data) => {
                            return (
                              <table border="1">
                                <tr>
                                  <td
                                    width="500px"
                                    style={{ border: "1px solid black" }}
                                  >
                                    {data.deptName}
                                  </td>
                                  <td style={{ border: "1px solid black" }}>
                                    {data.email}
                                  </td>
                                  <td
                                    width="140px"
                                    style={{ border: "1px solid black" }}
                                  >
                                    {data.phoneNumber}
                                  </td>
                                </tr>
                              </table>
                            );
                          })}
                      </>
                    ) : (
                      <Dropdown
                        title={menu.title}
                        options={menu.options}
                        isEmail={menu.isEmail}
                      />
                    );
                  })}
                </Stack>
              </Stack>

              <Stack className="image-inner-container">
                <img src={JOptimanLogo} width={"100%"} height={"85%"} />
              </Stack>
            </Stack>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default Administration;
