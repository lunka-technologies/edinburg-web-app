import { useRef } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SquareIcon from "@mui/icons-material/Square";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/SaveAlt";
import { useTheme } from "@mui/styles";

import MolecularStructure from "../MolecularStructure";
import { POINT, formatPoints, drawDiamond } from "./utils";
import { useStyles } from "./styles";

/**
 * Component to visualise senolytics dataset as point on the chart. <br>
 * Uses [@nivo/scatterplot]{@link https://nivo.rocks/scatterplot/}.
 *
 * @property {boolean} isShown Decides whether to show the chart itself or the loading skeleton
 * @property {Points[]} points Raw data for the chart
 * @property {string} submittedSmiles Submitted molecule in SMILES format
 *
 * @namespace Chart
 */
const Chart = ({ isShown, points, submittedSmiles }) => {
  const theme = useTheme();
  const containerRef = useRef();
  const styles = useStyles();

  const formattedPoints = formatPoints(points);

  /**
   * Function that checks the group of every point and sets the color picked from theme. <br>
   * Colors are assigned in {@link MaterialThemeProvider}.
   *
   * @property {string} serieId Group name
   * @returns {string} Color in hex format
   *
   * @see MaterialThemeProvider
   */
  const getDiamondColor = ({ serieId }) => {
    const { chart } = theme.palette;

    switch (serieId) {
      case POINT.NEGATIVE:
        return chart.negative;
      case POINT.POSITIVE:
        return chart.positive;
      case POINT.YOUR:
        return chart.your;
      default:
        return chart.other;
    }
  };

  /**
   * Function that checks the group of every point and sets the size on the chart. <br>
   *
   * @property {string} serieId Group name
   * @returns {number} Size proportions
   */
  const getDiamondSize = ({ serieId }) => {
    return serieId === POINT.YOUR ? 15 : 9;
  };

  /**
   * Function to render the tooltip. <br>
   * Shows groupName, color of the node and axis. <br>
   * Molecule is represented by {@link MolecularStructure}.
   *
   * @property {Object} node Properties of point
   * @returns {JSXElement} Structure of tooltip
   *
   * @see MolecularStructure
   */
  const renderTooltip = ({ node }) => {
    const { color, serieId, data } = node;
    const { x, y, smiles } = data;

    return (
      <Paper className={styles.tooltipContainer} elevation={4}>
        <Box className={styles.tooltipLine}>
          <SquareIcon className={styles.tooltipIcon} htmlColor={color} />
          <Typography className={styles.tooltipHeading}>{serieId}</Typography>
        </Box>

        <Box className={styles.tooltipLine}>
          <Typography className={styles.tooltipAxis}>x:</Typography>
          <Typography className={styles.tooltipText}>{x.toFixed(3)},</Typography>
          <Typography className={styles.tooltipAxis}>y:</Typography>
          <Typography className={styles.tooltipText}>{y.toFixed(3)}</Typography>
        </Box>

        <MolecularStructure smiles={smiles} width={400} height={300} />
      </Paper>
    );
  };

  /**
   * Function that exports the chart as PNG image, using submittedSmiles as part of file name.
   */
  const exportChart = () => {
    const fileName = `senolytics_chart_${submittedSmiles}`;
    exportComponentAsPNG(containerRef, { fileName });
  };

  if (!isShown) {
    return <Skeleton className={styles.skeleton} animation="wave" variant="rounded" />;
  }

  return (
    formattedPoints.length > 0 && (
      <Paper className={styles.container} elevation={3}>
        <IconButton className={styles.export} onClick={exportChart} size="large" aria-label="export chart">
          <SaveIcon fontSize="inherit" />
        </IconButton>

        <Typography className={styles.text}>UMAP of senolytics dataset with PCA</Typography>

        <Box className={styles.chart}>
          <ResponsiveScatterPlotCanvas
            animate={false}
            ref={containerRef}
            data={formattedPoints}
            renderNode={drawDiamond}
            colors={getDiamondColor}
            nodeSize={getDiamondSize}
            tooltip={renderTooltip}
            margin={{ top: 25, right: 140, bottom: 70, left: 90 }}
            xScale={{ type: "linear", min: "auto", max: "auto" }}
            yScale={{ type: "linear", min: "auto", max: "auto" }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "UMAP x",
              legendPosition: "middle",
              legendOffset: 45,
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "UMAP y",
              legendPosition: "middle",
              legendOffset: -52,
            }}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 130,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 12,
                itemsSpacing: 5,
                itemDirection: "left-to-right",
                symbolSize: 12,
                symbolShape: "circle",
              },
            ]}
          />
        </Box>
      </Paper>
    )
  );
};

export default Chart;
