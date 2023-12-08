import MoleculePicker from "./components/MoleculePicker";
import PredictionResult from "./components/PredictionResult";
import ToastProvider from "./providers/ToastProvider";
import MaterialThemeProvider from "./providers/MaterialThemeProvider";

import { PredictionContextProvider } from "./contexts/PredictionContext";
import { InitToolsContextProvider } from "./contexts/InitToolsContext";

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
