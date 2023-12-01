import { createContext, useContext, useEffect, useState } from "react";
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
  const toolsReady = marvin && rdkit;

  useEffect(() => {
    (async () => {
      try {
        const marvin = await MarvinJSUtil.getPackage("sketch");
        console.log("marvin init");
        setMarvin(marvin);

        const rdkit = await window.initRDKitModule();
        console.log("rdkit init");
        setRdkit(rdkit);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <InitToolsContext.Provider value={{ marvin, rdkit, toolsReady }}>
      <Backdrop open={!toolsReady} sx={{ zIndex: 999 }}>
        <CircularProgress size={100} thickness={4} />
      </Backdrop>

      {children}
    </InitToolsContext.Provider>
  );
};

export const useInitToolsContext = () => useContext(InitToolsContext);
