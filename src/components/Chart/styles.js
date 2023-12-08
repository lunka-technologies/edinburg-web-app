import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(({ spacing }) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: spacing(3),
    borderRadius: spacing(3),
    width: "100%",
    height: 550,
    position: "relative",
  },

  skeleton: {
    width: "100%",
    borderRadius: spacing(3),
    height: 550,
  },

  chart: {
    height: 500,
    width: "100%",
  },

  export: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  text: {
    fontSize: 18,
    textAlign: "center",
  },

  tooltipContainer: {
    transform: "translate(-50%, -100%)",
    position: "absolute",
    top: -15,
    opacity: 0.9,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: spacing(1),
    borderRadius: spacing(1),
    gap: spacing(0.5),
  },

  tooltipLine: {
    display: "flex",
    gap: spacing(1),
  },

  tooltipAxis: {
    fontWeight: "bold",
    fontSize: 14,
  },

  tooltipText: {
    fontSize: 14,
  },

  tooltipHeading: {
    fontSize: 16,
    fontWeight: "bold",
  },

  tooltipIcon: {
    transform: "rotate(45deg)",
    width: 14,
    paddingBottom: "2px",
  },
}));
