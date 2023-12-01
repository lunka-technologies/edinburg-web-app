import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(({ spacing, palette }) => ({
  text: {
    fontSize: 18,
    textAlign: "center",
  },

  inputWrapper: {
    width: "100%",
  },

  input: {
    borderRadius: spacing(1),
  },

  moleculeWrapper: {
    width: "100%",
    height: "100%",
    border: `1px solid ${palette.accent.main}`,
    borderRadius: spacing(1),
    overflow: "hidden",
  },

  molecule: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 1,
  },
}));
