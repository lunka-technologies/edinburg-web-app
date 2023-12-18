import MoleculePicker from "./components/MoleculePicker";
import PredictionResult from "./components/PredictionResult";
import ToastProvider from "./providers/ToastProvider";
import MaterialThemeProvider from "./providers/MaterialThemeProvider";
import { PredictionContextProvider } from "./contexts/PredictionContext";
import { InitToolsContextProvider } from "./contexts/InitToolsContext";

/**
 * Main component that renders all the content of application.
 * Wraps {@link MoleculePicker} and {@link PredictionResult} core components with context providers.
 *
 * @see MoleculePicker
 * @see PredictionResult
 * @see MaterialThemeProvider
 * @see ToastProvider
 * @see InitToolsContextProvider
 * @see PredictionContextProvider
 *
 * @namespace App
 */
const App = () => (
  <MaterialThemeProvider>
    <ToastProvider>
      <InitToolsContextProvider>
        <PredictionContextProvider>
          <MoleculePicker />
          <PredictionResult />
        </PredictionContextProvider>
      </InitToolsContextProvider>
    </ToastProvider>
  </MaterialThemeProvider>
);

export default App;
