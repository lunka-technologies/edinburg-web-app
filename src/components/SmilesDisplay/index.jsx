import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useStyles } from "./styles";

/**
 * Adaptive container that renders provided string. <br>
 *
 * @example
 * <SmilesDisplay smiles="O=Cc1ccc(O)c(OC)c1COc1cc(C=O)ccc1O" />
 * <SmilesDisplay smiles="CN1CCC[C@H]1c2cccnc2" />
 * <SmilesDisplay smiles={marvinSmile} />
 *
 * @property {string} smiles String to show in the display
 *
 * @namespace SmilesDisplay
 */
const SmilesDisplay = ({ smiles }) => {
  const styles = useStyles();

  return (
    <Box className={styles.smilesWrapper}>
      <Typography className={styles.smiles}>{smiles}</Typography>
    </Box>
  );
};

export default SmilesDisplay;
