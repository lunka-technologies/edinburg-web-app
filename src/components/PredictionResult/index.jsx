import { useState } from "react";
import { animateScroll } from "react-scroll";
import { enqueueSnackbar } from "notistack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Chart from "../Chart";
import SmilesDisplay from "../SmilesDisplay";
import { usePredictionContext } from "../../contexts/PredictionContext";
import { useInitToolsContext } from "../../contexts/InitToolsContext";
import { useStyles } from "./styles";
import MolecularStructure from "../MolecularStructure";

const SMILES = [
  "O1C=C[C@H]([C@H]1O2)c3c2cc(OC)c4c3OC(=O)C5=C4CCC(=O)5",
  "OC[C@@H](O1)[C@@H](O)[C@H](O)[C@@H](O)[C@H](O)1",
  "OC[C@@H](O1)[C@@H](O)[C@H](O)[C@@H]2[C@@H]1c3c(O)c(OC)c(O)cc3C(=O)O2",
  "CC[C@H](O1)CC[C@@]12CCCO2",
  "OCCc1c(C)[n+](cs1)Cc2cnc(C)nc2N",
];

const getRandomSmiles = () => {
  return SMILES[Math.round((SMILES.length - 1) * Math.random())];
};

const generateRandomPoints = ({ amount, group }) => {
  return [...Array(amount)].map(() => ({
    x: -20 + Math.random() * 40,
    y: -7 + Math.random() * 14,
    smiles: getRandomSmiles(),
    groupId: group,
  }));
};

const generateRandomResult = () => ({
  prediction: Math.random().toFixed(3),
  points: [
    ...generateRandomPoints({ amount: 1500, group: 0 }),
    ...generateRandomPoints({ amount: 50, group: 1 }),
    ...generateRandomPoints({ amount: 1, group: 2 }),
  ],
});

/**
 * @typedef {} Point
 * @property {number} x Position of point on X axis, 3 digits after decimal
 * @property {number} y Position of point on Y axis, 3 digits after decimal
 * @property {string} smiles Molecule in SMILES format
 * @property {number} groupId Identifier of molecule's group: 0 - negative, 1 - positive, 2 - your entered molecule
 *
 * @memberof PredictionResult
 */

/**
 * @typedef {} Result
 * @property {number} prediction Calculated probability between 0 and 1, 3 digits after decimal
 * @property {Point[]} points Array of points for senolytics chart
 *
 * @memberof PredictionResult
 */

/**
 * Component for calculating and showing the prediction result. <br>
 * Predict button is active when there is valid SMILES present in current tab and blocked when request is fetching. <br>
 * Prediction result is divided in two sections: <br><br>
 * 1) First block contains inputted molecule and probability result. <br>
 * 2) Second block is a {@link Chart} component representing senolytics dataset from ML model.
 *
 * @see Chart
 * @namespace PredictionResult
 */
const PredictionResult = () => {
  const [result, setResult] = useState(null);
  const [isPredictionShown, setIsPredictionShown] = useState(false);
  const [isPredictionFetching, setIsPredictionFetching] = useState(false);
  const [submittedSmiles, setSubmittedSmiles] = useState("");
  const { currentSmiles } = usePredictionContext();
  const { toolsReady } = useInitToolsContext();
  const styles = useStyles();

  /**
   * Handler applied to button's onClick event. <br>
   * Runs the request that gets prediction for inputted molecule. <br>
   * When request is fetching, result sections are shown as animated skeletons. <br>
   * On successful request, result is rendered and page is automatically scrolled to view it. <br>
   * On failed request, result is hidden and error toast message is called. <br>
   * Response matches the type of <em>Result</em>.
   */
  const handlePredict = async () => {
    try {
      setSubmittedSmiles(currentSmiles);
      setIsPredictionShown(true);
      setIsPredictionFetching(true);
      setResult(null);

      // const response = await fetch(`https://c8c1-185-181-16-238.ngrok-free.app/predict`, {
      //   method: "POST",
      //   body: JSON.stringify({ smiles: currentSmiles }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // const prediction = await response.json();

      // if (prediction?.detail) {
      //   throw new Error(prediction.detail);
      // }

      // setResult(prediction);

      // setResult({ ...prediction, ...generateRandomResult() });

      await new Promise((res, rej) => setTimeout(res, 2000));
      setResult(generateRandomResult());

      animateScroll.scrollToBottom({
        duration: 1200,
        smooth: true,
      });
    } catch (error) {
      setIsPredictionShown(false);
      enqueueSnackbar({
        message: error?.message || "Prediction error",
        variant: "error",
      });
    } finally {
      setIsPredictionFetching(false);
    }
  };

  return (
    <Box className={styles.container}>
      <Button
        variant="contained"
        className={styles.button}
        onClick={handlePredict}
        disabled={!toolsReady || isPredictionFetching || !currentSmiles.trim()}
      >
        Calculate prediction
      </Button>

      {isPredictionShown && (
        <>
          {!isPredictionFetching ? (
            <Paper className={styles.predictionContainer} elevation={3}>
              <Box className={`${styles.predictionContent} ${styles.accordionBorder}`}>
                <Accordion className={styles.accordion} disableGutters>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="entered-molecule">
                    <Typography className={`${styles.accordionHeading} ${styles.text}`}>Input</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={styles.predictionContent}>
                    <SmilesDisplay smiles={submittedSmiles} />
                    <MolecularStructure smiles={submittedSmiles} height={350} width={700} />
                  </AccordionDetails>
                </Accordion>
              </Box>

              <Box className={styles.predictionContent}>
                <Typography className={styles.text}>Prediction result:</Typography>
                <Typography className={styles.predictionResult}>{result?.prediction}</Typography>
              </Box>
            </Paper>
          ) : (
            <Skeleton className={styles.predictionSkeleton} animation="wave" variant="rounded" />
          )}

          <Chart isShown={!isPredictionFetching} points={result?.points} submittedSmiles={submittedSmiles} />
        </>
      )}
    </Box>
  );
};

export default PredictionResult;
