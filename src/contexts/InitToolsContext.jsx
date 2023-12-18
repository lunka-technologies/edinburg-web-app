import { createContext, useContext, useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const InitToolsContext = createContext({
  marvin: null,
  rdkit: null,
  toolsReady: false,
});

/**
 * Context provider that initializes MarvinJS and RDKit. <br>
 * Until tools are in loading state, shows spinner that prevents any user interaction. <br>
 * If tools failed to load for some reason, shows an error toast message by calling enqueueSnackbar from {@link ToastProvider}.
 *
 * @property {ReactNode} children Components that needs an access to the context
 *
 * @example
 * // app should be wrapped once at its highest level
 * // to make sure every component gains access to MarvinJS and RDKit tools
 * <InitToolsContextProvider>
 *   <YourComponent/>
 * </InitToolsContextProvider>

 * @namespace InitToolsContextProvider
 */
const InitToolsContextProvider = ({ children }) => {
  const [marvin, setMarvin] = useState(null);
  const [rdkit, setRdkit] = useState(null);
  const [initError, setInitError] = useState(false);
  const toolsReady = Boolean(rdkit && marvin);

  useEffect(() => {
    (async () => {
      try {
        const marvin = await MarvinJSUtil.getPackage("sketch");
        if (!marvin.sketcherInstance) throw new Error();
        setMarvin(marvin);

        const rdkit = await window.initRDKitModule();
        setRdkit(rdkit);
      } catch (error) {
        setInitError(true);
        enqueueSnackbar({
          message: "Tools failed to initialize. Please check your internet connection and refresh the page.",
          variant: "error",
          autoHideDuration: null,
        });
      }
    })();
  }, []);

  return (
    <InitToolsContext.Provider value={{ marvin, rdkit, toolsReady }}>
      <Backdrop open={!toolsReady && !initError} sx={{ zIndex: 999 }}>
        <CircularProgress size={100} thickness={4} />
      </Backdrop>

      {children}
    </InitToolsContext.Provider>
  );
};

/**
 * @typedef {} InitToolsReturnValue
 * @property {Object} marvin Instance of MarvinJS editor
 * @property {Object} rdkit Instance of RDKit toolkit
 * @property {Boolean} toolsReady Identifies whether tools have finished loading or not
 *
 * @memberof InitToolsContextProvider
 */

/**
 * React hook that provides access to MarvinJS and RDKit tools. <br>
 * Returns value of <em>InitToolsReturnValue</em> type.
 *
 * @example
 * // Call inside of component:
 * const { marvin, rdkit, toolsReady } = useInitToolsContext();
 *
 * @memberof InitToolsContextProvider
 */
const useInitToolsContext = () => useContext(InitToolsContext);

export { InitToolsContextProvider, useInitToolsContext };
