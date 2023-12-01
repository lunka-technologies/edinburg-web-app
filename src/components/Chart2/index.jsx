import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SquareIcon from "@mui/icons-material/Square";
import Skeleton from "@mui/material/Skeleton";

import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";

const data = [
  {
    id: "Negative",
    data: [...Array(500)].map(() => ({
      x: -20 + Math.random() * 40,
      y: -7 + Math.random() * 14,
    })),
  },
  {
    id: "Positive",
    data: [...Array(50)].map(() => ({
      x: -20 + Math.random() * 40,
      y: -7 + Math.random() * 14,
    })),
  },
  {
    id: "Your",
    data: [{ x: -20 + Math.random() * 40, y: -7 + Math.random() * 14 }],
  },
];

const renderDiamond = (ctx, node) => {
  const x = node.x;
  const y = node.y;
  const width = node.size;
  const height = node.size;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - width / 2, y + height / 2);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x + width / 2, y + height / 2);
  ctx.closePath();
  ctx.fillStyle = node.color;
  ctx.fill();
};

const Chart2 = ({ isShown }) => {
  const getDiamondColors = ({ serieId }) => {
    switch (serieId) {
      case "Negative":
        return "#0492C2";
      case "Positive":
        return "magenta";
      case "Your":
        return "red";
    }
  };

  const getDiamondSize = ({ serieId }) => {
    return serieId === "Your" ? 13 : 9;
  };

  const renderTooltip = ({ node }) => {
    return (
      <Paper
        elevation={4}
        sx={{
          transform: "translate(-50%, -100%)",
          position: "absolute",
          top: -15,
          padding: 1,
          minWidth: 100,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <SquareIcon
            sx={{ transform: "rotate(45deg)", width: 14, paddingBottom: "2px" }}
            htmlColor={node.color}
          />
          <Typography sx={{}}>{node.serieId}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>x:</Typography>
          <Typography sx={{ fontSize: 14 }}>{node.data.x.toFixed(3)}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>y:</Typography>
          <Typography sx={{ fontSize: 14 }}>{node.data.y.toFixed(3)}</Typography>
        </Box>
      </Paper>
    );
  };

  if (!isShown) {
    return (
      <Skeleton
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 3,
          width: "100%",
          borderRadius: 8,
          height: 550,
        }}
        animation="wave"
        variant="rounded"
      />
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 3,
        width: "100%",
        borderRadius: 8,
        height: 550,
      }}
    >
      <Typography sx={{ fontSize: 18 }}>t-SNE of senolytics dataset with PCA</Typography>

      <Box sx={{ height: 500, width: "100%" }}>
        <ResponsiveScatterPlotCanvas
          renderNode={renderDiamond}
          animate={false}
          data={data}
          colors={getDiamondColors}
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
            legend: "t-SNE x",
            legendPosition: "middle",
            legendOffset: 45,
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "t-SNE y",
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
  );
};

export default Chart2;
