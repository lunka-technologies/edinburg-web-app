import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(({ spacing, palette }) => ({
  container: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: spacing(3),
  },

  innerContainer: {
    borderRadius: spacing(3),
    overflow: "hidden",
  },

  tabs: {
    backgroundColor: palette.common.black,
  },

  slide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: spacing(3),
    padding: spacing(3),
  },
}));
