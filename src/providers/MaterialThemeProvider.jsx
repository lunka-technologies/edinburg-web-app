import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CssBaseline from "@mui/material/CssBaseline";

/**
 * Every component has its according style.js file. <br>
 * Styles become available by calling the exported useStyles hook. <br>
 * useStyles itself calls makeStyles from MUI, that gets theme as an argument.
 *
 * @example
 * // usage of styling
 * // spacing and palette are product of destructuring theme object
 * export const useStyles = makeStyles(({ spacing, palette }) => ({
 *  // custom styling className
 *  editor: {
 *   width: "100%",
 *   height: "100%",
 *   // using spacing instead of pixels brings consistensy to box sizings
 *   borderRadius: spacing(1),
 *   // accessing custom colors from the palette
 *   backgroundColor: palette.accent.light,
 *   // css property as a function that toggles its state on condition
 *   opacity: ({ toolsReady }) => (toolsReady ? 1 : 0),
 * },
 *
 * // calling the hook
 * const styles = useStyles({ toolsReady });
 *
 * // applying created style
 * <Box className={styles.editor}/>
 *
 * @see [MaterialUI makeStyles API]{@link https://mui.com/system/styles/api/#makestyles-styles-options-hook}
 * @namespace Styling
 */

/**
 * Style cache that makes sure all the custom style classes override default MUI ones.
 *
 * @see [Material UI style cache]{@link https://mui.com/material-ui/guides/interoperability/#css-injection-order-3}
 * @memberof MaterialThemeProvider
 */
const cache = createCache({
  key: "css",
  prepend: true,
});

/**
 * Creates MUI theme and assigns custom solors to its palette. <br>
 * Theme can be accessed by calling useTheme hook inside of component. <br>
 * It is passed automatically as an argument to makeStyles function in styles.js files. <br>
 *
 * @example
 * const theme = createTheme({
    palette: {
      accent: {
        main: "#d3d3d3",
        light: "#f2f2f2",
      },

      //palette could be extended in similar way and accessed by theme.palette.yourName.yourColor
      [yourName]: {
        [yourColor]: [hex],
        ...
      }
    },
});
 *
 * @see [Material UI theming]{@link https://mui.com/material-ui/customization/theming/}
 * @memberof MaterialThemeProvider
 */
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
      other: "#808080",
    },
  },
});

/**
 * Context provider that applies Material UI custom config to every child. It: <br><br>
 * 1) nullifies all the default styles of your browser <br>
 * 2) extends base MUI palette with custom colors <br>
 * 3) prioritizes all the custom styles over default ones
 *
 * @property {ReactNode} children Components that needs an access to the context
 *
 * @example
 * // app should be wrapped once at its highest level
 * // to make sure every component gains access to custom styling
 *
 * <MaterialThemeProvider>
 *   <YourComponent/>
 * </MaterialThemeProvider>
 *
 * @namespace MaterialThemeProvider
 */
const MaterialThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CacheProvider value={cache}>
      <CssBaseline />
      {children}
    </CacheProvider>
  </ThemeProvider>
);

export default MaterialThemeProvider;
