import { useState } from "react";
import { animateScroll } from "react-scroll";
import { enqueueSnackbar } from "notistack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

import Chart from "../Chart";
import Chart2 from "../Chart2";
import { usePredictionContext } from "../../contexts/PredictionContext";
import { useStyles } from "./styles";

const PredictionResult = () => {
  const [prediction, setPrediction] = useState(null);
  const [isPredictionShown, setIsPredictionShown] = useState(false);
  const [isPredictionFetching, setIsPredictionFetching] = useState(false);
  const { currentSmiles } = usePredictionContext();
  const styles = useStyles();

  const handlePredict = async () => {
    try {
      setIsPredictionShown(true);
      setIsPredictionFetching(true);
      setPrediction(null);

      await new Promise((res, rej) => setTimeout(res, 2000));

      setPrediction({ result: 0.65 });

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
        disabled={isPredictionFetching || !currentSmiles.trim()}
      >
        Calculate prediction
      </Button>

      {isPredictionShown && (
        <>
          {!isPredictionFetching ? (
            <Box className={styles.predictionContainer}>
              <Typography className={styles.text}>Prediction result:</Typography>

              <Typography className={styles.predictionResult}>{prediction?.result}</Typography>
            </Box>
          ) : (
            <Skeleton className={styles.predictionSkeleton} animation="wave" variant="rounded" />
          )}

          <Chart2 isShown={!isPredictionFetching} />
        </>
      )}
    </Box>
  );
};

export default PredictionResult;
