import { createContext, useContext, useState } from "react";

const PredictionContext = createContext({
  currentSmiles: "",
  setCurrentSmiles: () => {},
});

/**
 * Context provider that acts as a global state manager for holding current entered molecule in SMILES format.<br>
 *
 * @property {ReactNode} children Components that needs an access to the context
 *
 * @example
 * // app should be wrapped once at its highest level so you could read and write SMILES from any place of the app
 * <PredictionContextProvider>
 *   <YourComponent/>
 * </PredictionContextProvider>

 * @namespace PredictionContextProvider
 */
const PredictionContextProvider = ({ children }) => {
  const [currentSmiles, setCurrentSmiles] = useState("");

  return (
    <PredictionContext.Provider value={{ currentSmiles, setCurrentSmiles }}>
      {children}
    </PredictionContext.Provider>
  );
};

/**
 * @typedef {} PredictionContextReturnValue
 * @property {string} currentSmiles Getter of SMILES
 * @property {function} setCurrentSmiles Setter of SMILES
 *
 * @memberof PredictionContextProvider
 */

/**
 * React hook that enables context children to get and set current SMILES. <br>
 * Returns value of <em>PredictionContextReturnValue</em> type.
 *
 * @example
 * // Call inside of component:
 * const { currentSmiles, setCurrentSmiles } = usePredictionContext();
 *
 * @memberof PredictionContextProvider
 */
const usePredictionContext = () => useContext(PredictionContext);

export { PredictionContextProvider, usePredictionContext };
