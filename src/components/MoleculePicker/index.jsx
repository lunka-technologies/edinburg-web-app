import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DrawIcon from "@mui/icons-material/Draw";
import InputIcon from "@mui/icons-material/Input";

import EditorFlow from "../EditorFlow";
import InputFlow from "../InputFlow";
import { useStyles } from "./styles";

/**
 * Container component responsible for choosing molecular input flow. <br>
 * Holds {@link EditorFlow} and {@link InputFlow} as swipable slides. <br>
 * Changing the tab sets current SMILES to [Prediction Context]{@link PredictionContextProvider}.
 *
 * @see EditorFlow
 * @see InputFlow
 * @see PredictionContextProvider
 * @see [react-swipeable-views]{@link https://react-swipeable-views.com/api/api/}
 *
 * @namespace MoleculePicker
 */
const MoleculePicker = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const styles = useStyles();

  return (
    <Box className={styles.container}>
      <Paper className={styles.innerContainer} elevation={3}>
        <AppBar position="static">
          <Tabs
            value={currentTab}
            onChange={(_, index) => setCurrentTab(index)}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            className={styles.tabs}
          >
            <Tab iconPosition="start" icon={<DrawIcon />} label="Draw molecule" />
            <Tab iconPosition="start" icon={<InputIcon />} label="Enter SMILES" />
          </Tabs>
        </AppBar>

        <SwipeableViews
          index={currentTab}
          onChangeIndex={setCurrentTab}
          containerStyle={{ transition: "transform 0.35s" }}
          slideClassName={styles.slide}
        >
          <EditorFlow isActive={currentTab === 0} />
          <InputFlow isActive={currentTab === 1} />
        </SwipeableViews>
      </Paper>
    </Box>
  );
};

export default MoleculePicker;
