import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CssBaseline from "@mui/material/CssBaseline";

const cache = createCache({
  key: "css",
  prepend: true,
});

const theme = createTheme({
  palette: {
    accent: {
      main: "#d3d3d3",
      light: "#f2f2f2",
    },

    chart: {
      negative: "#FFD860",
      positive: "#FD3900",
      your: "#5C68F5",
    },
  },
});

const MaterialThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CacheProvider value={cache}>
      <CssBaseline />
      {children}
    </CacheProvider>
  </ThemeProvider>
);

export default MaterialThemeProvider;
