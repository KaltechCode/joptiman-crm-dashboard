import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
} from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CustomizedSnackbars = React.forwardRef((props, ref) => {
  //   const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    open: false,
    severity: "error",
    summary: "",
    detail: "",
    icon: "i-notify",
    vertical: "top",
    horizontal: "center",
  });

  const handleClick = () => {
    // setOpen(true);
    setState({ ...state, open: true });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  React.useImperativeHandle(ref, () => ({
    showMessage(
      severity = "error",
      summary = "",
      detail = " ",
      icon = "i-notify"
    ) {
      // snackbar_Ref.current.show({severity: severity,summary: summary,detail: detail,icon: icon,life: 3000,});
      setState({
        ...state,
        open: true,
        severity: severity,
        summary: summary,
        detail: detail,
        icon: icon,
      });
    },
    showTemplateMessage(content) {
      // snackbar_Ref.current.show(content);
      setState({
        ...state,
        open: true,
        summary: content,
        severity: state.severity,
      });
    },
  }));

  return (
    <div>
      {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
      <Snackbar
        open={state.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        key={`top-center`}
      >
        <Alert
          onClose={handleClose}
          severity={state.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {state.summary}
        </Alert>
      </Snackbar>
    </div>
  );
});

export default CustomizedSnackbars;
