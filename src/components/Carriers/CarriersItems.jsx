import React from "react";
import CRMDropdown from "../../shared-component/CRM-Dropdown/index";
import { Button, Stack } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const CarriersItems = (props) => {
  return (
    <Stack className="carrier-items">
      <img src={props.carrierPic} />
      <div
        className={`${props.url2 ? "CarrierItemDropdown btn-flex" : "CarrierItemDropdown"}`}
      >
        <Button
          aria-controls="dropdown-menu"
          aria-haspopup="true"
          className="carrier-button"
          sx={{
            display: props.url ? "flex" : "none",
            backgroundColor: "#003478",
            color: "white",
            width: "100%",

            "&:hover": {
              backgroundColor: "#003478",
            },
          }}
        >
          <a href={props.url} target="_blank" className="carrier-link">
            Portal Access
          </a>
        </Button>
        {props.url2 && (
          <Button
            aria-controls="dropdown-menu"
            aria-haspopup="true"
            className="carrier-button"
            sx={{
              display: props.url ? "flex" : "none",
              backgroundColor: "#003478",
              color: "white",
              width: "100%",

              "&:hover": {
                backgroundColor: "#003478",
              },
            }}
          >
            <a href={props.url2} target="_blank" className="carrier-link">
              Agent registration
            </a>
          </Button>
        )}
      </div>
    </Stack>
  );
};
export default CarriersItems;
