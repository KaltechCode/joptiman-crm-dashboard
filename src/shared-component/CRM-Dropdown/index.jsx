import React, { useEffect, useState } from "react";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { Button, MenuItem, Popover, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./style.scss";

const CRMDropdown = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleClick = () => {
    setAnchorEl(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionChange = (selectedOption) => {
    setAnchorEl(null);
    if (props.onOptionChange) {
      props.onOptionChange(selectedOption);
    }
  };

  useEffect(() => {
    console.log("props", props);
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <Button
        aria-controls="dropdown-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        sx={{
          backgroundColor:
            props.dropdownNo === "2"
              ? "white"
              : props.dropdownNo === "5"
              ? "#F08613"
              : props.title === "Previous Years"
              ? "white"
              : "#ED7D31",
          color:
            props.dropdownNo === "2"
              ? "black"
              : props.title === "Previous Years"
              ? "black"
              : "white",
          height: "39px",
          width: "100%",
          fontSize: "12px",
          padding: "3px",
          borderTopLeftRadius: "0",
          borderBottomLeftRadius: "0",
          border: props.title === "Previous Years" ? "2px solid #EDEDED" : "",
          "@media screen and (max-width:1366px)": {
            width: "99%",
            height: "27px",
            fontSize: "10px",
            // border: "2px solid red",
          },
          "@media screen and (max-width:899px)": {
            width: "168px",
            // border: "2px solid red",
          },
          "&:hover": {
            backgroundColor:
              props.dropdownNo === "2"
                ? "white"
                : props.dropdownNo === "5"
                ? "#F08613"
                : props.title === "Previous Years"
                ? "white"
                : "#F08613",
            color:
              props.dropdownNo === "2"
                ? "#F08613"
                : props.dropdownNo === "5"
                ? "#fff"
                : props.title === "Previous Years"
                ? "#F08613"
                : "#fff",
          },
        }}
      >
        {props.title}
      </Button>
      <Popover
        id={`dropdown-menu-${
          props.type === "YearlyPolicyType"
            ? "yearly-policy-menu"
            : props.dropdownNo === "2"
            ? "previous-months"
            : props.title === "Previous Years"
            ? "previous-year"
            : props.dropdownNo === "5"
            ? "previous-months2"
            : ""
        }`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        // sx={{width:'375px'}}
      >
        {props.options.map((items) => {
          return (
            <MenuItem
              className="menu-item"
              key={items}
              onClick={() => handleOptionChange(items)}
            >
              <Typography
                className={`menu-item-text-${
                  props.title === "Previous Months"
                    ? "previous-months"
                    : props.title === "Previuos Year"
                    ? "previuos-year"
                    : ""
                }`}
                sx={{ fontSize: "14px" }}
              >
                {items}
              </Typography>
            </MenuItem>
          );
        })}
      </Popover>
    </div>
  );
};

export default CRMDropdown;
