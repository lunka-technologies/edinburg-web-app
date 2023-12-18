import { forwardRef } from "react";
import { SnackbarProvider, closeSnackbar } from "notistack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

/**
 * Component that customizes notistack's default snackbar to match Material UI general styling.
 *
 * @memberof ToastProvider
 */
const Toast = forwardRef(({ message, variant, id }, ref) => (
  <Alert
    severity={variant}
    elevation={6}
    ref={ref}
    sx={{ maxWidth: 400 }}
    action={
      <IconButton size="small" aria-label="close" color="inherit" onClick={() => closeSnackbar(id)}>
        <CloseIcon fontSize="small" />
      </IconButton>
    }
  >
    {message}
  </Alert>
));

/**
 * Context provider that gives an ability to call toast messages to all the child components. <br>
 * To show toast message, call enqueueSnackbar function.
 *
 * @property {ReactNode} children Components that needs an access to the context
 *
 * @example
 * // app should be wrapped once at its highest level
 * // to make sure every component gains access to toast messages
 * <ToastProvider>
 *   <YourComponent/>
 * </ToastProvider>
 *
 * @example
 * // rendering the toast
 * // possible variants: error, info, success, warning
 * enqueueSnackbar({
 *   message: "Your message",
 *   variant: "info",
 * });
 *
 * @see [Notistack Snackbar]{@link https://notistack.com/getting-started}
 * @namespace ToastProvider
 */
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
