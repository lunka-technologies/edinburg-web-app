import { forwardRef } from "react";
import { SnackbarProvider, closeSnackbar } from "notistack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

const Toast = forwardRef(({ message, variant, id }, ref) => (
  <Alert
    severity={variant}
    elevation={6}
    ref={ref}
    action={
      <IconButton size="small" aria-label="close" color="inherit" onClick={() => closeSnackbar(id)}>
        <CloseIcon fontSize="small" />
      </IconButton>
    }
  >
    {message}
  </Alert>
));

const ToastProvider = ({ children }) => {
  const toastComponents = {
    error: Toast,
    info: Toast,
    success: Toast,
    warning: Toast,
  };

  return <SnackbarProvider Components={toastComponents}>{children}</SnackbarProvider>;
};

export default ToastProvider;
