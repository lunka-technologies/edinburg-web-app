import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(({ spacing, palette }) => ({
  smilesWrapper: {
    width: "100%",
    border: `1px solid ${palette.accent.main}`,
    borderRadius: spacing(1),
  },

  smiles: {
    width: "100%",
    fontWeight: "bold",
    wordWrap: "break-word",
    minHeight: 43,
    padding: spacing(1),
    fontSize: 18,
    textAlign: "center",
  },
}));
