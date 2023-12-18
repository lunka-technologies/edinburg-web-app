import DOMPurify from "dompurify";
import Box from "@mui/material/Box";

import { useInitToolsContext } from "../../contexts/InitToolsContext";
import { useStyles } from "./styles";

/**
 * Adaptive container that renders SVG image of provided molecule's structure. <br>
 * Dimensions passed as props act as max size, container is allowed to shrink if needed.
 *
 * @example
 * <MolecularStructure smiles="OCCc1c(C)[n+](cs1)Cc2cnc(C)nc2N" width={500} height={500} />
 * <MolecularStructure smiles={inputValue} width={700} height={400} />
 *
 * @property {string} smiles Molecule in SMILES format
 * @property {number} width Width of SVG
 * @property {number} height Height of SVG
 *
 * @namespace MolecularStructure
 */
const MolecularStructure = ({ smiles, width, height }) => {
  const { rdkit } = useInitToolsContext();
  const styles = useStyles();

  /**
   * Checks the validity of provided SMILES and returns SVG image HTML node using RDKit. <br>
   * If SMILES is not valid, returns an empty string leading to an empty image result. <br>
   * RDKit's instance of molecule is cleared from memory when all the processing is finished.
   *
   * @returns {string} HTMLStructure
   */
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

  /**
   * Fills container with sanitised HTML structure.
   *
   * @see [dompurify]{@link https://www.npmjs.com/package/dompurify}
   */
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
