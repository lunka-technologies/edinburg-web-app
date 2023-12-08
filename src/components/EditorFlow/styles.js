import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles(({ spacing, palette }) => ({
  text: {
    fontSize: 18,
    textAlign: "center",
  },

  editorWrapper: {
    position: "relative",
    width: "100%",
    height: 450,
    overflow: "hidden",
    transition: "border 100ms ease-out",
    WebkitTransition: "border 100ms ease-out",
    MozTransition: "border 100ms ease-out",
    borderRadius: spacing(1),
    borderColor: ({ isValid, toolsReady }) => {
      if (!isValid) return palette.error.main;
      if (!toolsReady) return "transparent";
      return palette.accent.main;
    },
  },

  editorSkeleton: {
    position: "absolute",
    width: "100%",
    height: 450,
    backgroundColor: palette.accent.light,
  },

  editor: {
    width: "100%",
    height: "100%",
    borderWidth: 0,
    opacity: ({ toolsReady }) => (toolsReady ? 1 : 0),
  },
}));
