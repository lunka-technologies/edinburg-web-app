import { createContext, useContext, useState } from "react";

const PredictionContext = createContext({
  currentSmiles: "",
  setCurrentSmiles: () => {},
});

export const PredictionContextProvider = ({ children }) => {
  const [currentSmiles, setCurrentSmiles] = useState("");

  return (
    <PredictionContext.Provider value={{ currentSmiles, setCurrentSmiles }}>
      {children}
    </PredictionContext.Provider>
  );
};

export const usePredictionContext = () => useContext(PredictionContext);
