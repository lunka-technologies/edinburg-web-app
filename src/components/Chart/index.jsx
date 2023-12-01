import Box from "@mui/material/Box";
import SquareIcon from "@mui/icons-material/Square";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  Hint,
  CustomSVGSeries,
} from "react-vis";
import "./styles.scss";
import { useStyles } from "./styles";

const negatives = new Array(500).fill(0).map(() => ({
  x: -20 + Math.random() * 40,
  y: -7 + Math.random() * 14,
  size: 10,
  //   color: "#0492C2",
  group: "negative",
  style: { fill: "#0492C2" },
}));

const positives = new Array(50).fill(0).map(() => ({
  x: -20 + Math.random() * 40,
  y: -7 + Math.random() * 14,
  size: 10,
  //   color: "magenta",
  style: { fill: "magenta" },
  group: "positive",
}));

const your = {
  x: -20 + Math.random() * 40,
  y: -7 + Math.random() * 14,
  //   color: "red",
  size: 15,
  style: { fill: "red" },
  group: "your molecule",
};

const data = [...negatives, ...positives, your];

const fillAxis = () => {
  const sortedByX = [...data].sort((a, b) => a.x - b.x);
  const sortedByY = [...data].sort((a, b) => a.y - b.y);

  return {
    xDomain: [Math.floor(sortedByX.at(0).x), Math.ceil(sortedByX.at(-1).x)],
    yDomain: [Math.floor(sortedByY.at(0).y), Math.ceil(sortedByY.at(-1).y)],
  };
};

const formatHint = (point) => {
  return [
    { title: "x", value: point.x.toFixed(3) },
    { title: "y", value: point.y.toFixed(3) },
    { title: "group", value: point.group },
  ];
};

const Chart = () => {
  //   return <Box sx={{ width: 700, height: 700, border: "1px solid black" }}>chart</Box>;

  const [highlightedValue, setHighlightedValue] = useState(null);
  const styles = useStyles();

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        padding: 2,
        flexDirection: "column",
        borderRadius: 5,
      }}
    >
      <Typography sx={{ fontSize: 18 }}>t-SNE of senolytics dataset with PCA</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <XYPlot onMouseLeave={() => setHighlightedValue(null)} width={700} height={700} {...fillAxis()}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <CustomSVGSeries
            customComponent="diamond"
            className={styles.chart}
            data={data}
            onNearestXY={setHighlightedValue}
            marginTop={5}
          />
          {highlightedValue && <Hint value={highlightedValue} format={formatHint} />}
        </XYPlot>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <SquareIcon
              sx={{ transform: "rotate(45deg)", width: 14, paddingBottom: "2px" }}
              htmlColor="#0492C2"
            />
            <Typography>Negative</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <SquareIcon
              sx={{ transform: "rotate(45deg)", width: 14, paddingBottom: "2px" }}
              htmlColor="magenta"
            />
            <Typography>Positive</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <SquareIcon
              sx={{ transform: "rotate(45deg)", width: 14, paddingBottom: "2px" }}
              htmlColor="red"
            />
            <Typography>Your</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default Chart;
