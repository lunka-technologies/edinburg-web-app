import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(({ spacing, palette, shadows }) => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: spacing(3),
    margin: `0 auto ${spacing(3)}`,
    justifyContent: "center",
    maxWidth: 1000,
    padding: `0 ${spacing(3)}`,
  },

  button: {
    padding: `${spacing(1)} ${spacing(2)}`,
  },

  text: {
    fontSize: 18,
  },

  predictionContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: spacing(3),
    height: 100,
  },

  predictionResult: {
    fontSize: 18,
    width: 150,
    height: 50,
    border: `1px solid ${palette.accent.main}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: spacing(3),
    fontWeight: "bold",
    boxShadow: shadows[1],
  },

  predictionSkeleton: {
    width: 150,
    height: 100,
    margin: "0 auto",
  },

  chart: {
    width: 700,
    height: 700,
    border: `1px solid ${palette.accent.main}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 40,
    boxShadow: shadows[3],
    borderRadius: spacing(1),
    overflow: "hidden",
  },

  chartSkeleton: {
    width: 700,
    height: 700,
  },
}));
