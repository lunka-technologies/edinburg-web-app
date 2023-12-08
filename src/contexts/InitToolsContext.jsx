import { createContext, useContext, useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const InitToolsContext = createContext({
  marvin: null,
  rdkit: null,
  toolsReady: false,
});

export const InitToolsContextProvider = ({ children }) => {
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

export const useInitToolsContext = () => useContext(InitToolsContext);
