import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useStyles } from "./styles";

const SmilesDisplay = ({ smiles }) => {
  const styles = useStyles();

  return (
    <Box className={styles.smilesWrapper}>
      <Typography className={styles.smiles}>{smiles}</Typography>
    </Box>
  );
};

export default SmilesDisplay;
