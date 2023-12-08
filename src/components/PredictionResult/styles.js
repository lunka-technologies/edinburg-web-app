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
    textAlign: "center",
  },

  predictionContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: spacing(3),
    width: "100%",
    borderRadius: spacing(3),
    padding: spacing(3),
    minHeight: 210,
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
    width: "100%",
    height: 210,
    margin: "0 auto",
    borderRadius: spacing(3),
  },

  predictionContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: spacing(1),
  },

  accordion: {
    width: "100%",
    boxShadow: "none",
  },

  accordionBorder: {
    border: `1px solid ${palette.accent.main}`,
    borderRadius: 10,
    overflow: "hidden",
  },

  accordionHeading: {
    width: "100%",
    paddingLeft: "25px",
  },
}));
