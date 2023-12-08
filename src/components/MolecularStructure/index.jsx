import DOMPurify from "dompurify";
import Box from "@mui/material/Box";

import { useInitToolsContext } from "../../contexts/InitToolsContext";
import { useStyles } from "./styles";

const MolecularStructure = ({ smiles, width, height }) => {
  const { rdkit } = useInitToolsContext();
  const styles = useStyles();

  const getMoleculeSvg = () => {
    if (!rdkit) {
      return "";
    }

    const rdkitMolecule = rdkit.get_mol(smiles);
    const isValid = Boolean(rdkitMolecule) && !/\s/.test(smiles.trim());

    if (!isValid) {
      return "";
    }

    const svg = rdkitMolecule.get_svg(width, height);
    rdkitMolecule.delete();
    return svg;
  };

  const fillSvg = () => ({
    __html: DOMPurify.sanitize(getMoleculeSvg(), { USE_PROFILES: { svg: true, svgFilters: true } }),
  });

  return (
    <Box className={styles.moleculeWrapper}>
      <div className={styles.molecule} dangerouslySetInnerHTML={fillSvg()} />
    </Box>
  );
};

export default MolecularStructure;
