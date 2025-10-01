import React from "react";
import svglogo from "../../assets/logo.svg";
import { List } from "phosphor-react";
import { Stack } from "@mui/material";

const Logo = () => {
  return (
    // <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{width:'9%'}}>
    <div>
      {/* <img src={svglogo} /> */}
      <img
        alt="Loo logo"
        src="../../assets/Agent.png"
        className="h-auto w-44"
      />
    </div>
  );
};

export default Logo;
