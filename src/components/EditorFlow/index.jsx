import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import Skeleton from "@mui/material/Skeleton";

import SmilesDisplay from "../SmilesDisplay";
import { useInitToolsContext } from "../../contexts/InitToolsContext";
import { usePredictionContext } from "../../contexts/PredictionContext";
import { useStyles } from "./styles";

/**
 * Flow component that embeds MarvinJS editor. <br>
 * Editor is rendered inside of iframe as outer HTML, located in /public folder. <br>
 * Skeleton hides MarvinJS until tools succeded to initialize. <br>
 *
 * @property {boolean} isActive Indicates whether this flow is currently selected by user
 *
 * @namespace EditorFlow
 */
const EditorFlow = ({ isActive }) => {
  const [marvinSmile, setMarvinSmile] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { marvin, rdkit, toolsReady } = useInitToolsContext();
  const { setCurrentSmiles } = usePredictionContext();
  const styles = useStyles({ isValid, toolsReady });

  useEffect(() => {
    if (isActive) {
      setCurrentSmiles(marvinSmile);
    }
  }, [isActive, marvinSmile]);

  useEffect(() => {
    if (!toolsReady) return;

    marvin?.sketcherInstance?.on("molchange", handleMoleculeChange);

    return () => {
      marvin?.sketcherInstance?.off("molchange", handleMoleculeChange);
    };
  }, [toolsReady]);

  /**
   * Handler applied to 'molchange' event of marvin.sketcherInstance. <br>
   * Exports the molecule from editor in 'mol' format and validates it with RDKit. <br>
   * Valid molecule is represented in SMILES format by {@link SmilesDisplay} component. <br>
   * Invalid structure highlights the editor with red border. <br>
   * RDKit's instance of molecule is cleared from memory when all the processing is finished.
   *
   * @see SmilesDisplay
   */
  const handleMoleculeChange = async () => {
    setMarvinSmile("");
    setIsValid(true);

    const mol = await marvin?.sketcherInstance?.exportStructure("mol");
    const rdKitMolecule = rdkit.get_mol(mol);

    if (!rdKitMolecule) {
      setIsValid(false);
      return;
    }

    const smiles = rdKitMolecule.get_smiles();
    setMarvinSmile(smiles);

    rdKitMolecule?.delete();
  };

  return (
    <>
      <Typography className={styles.text}>Draw desired molecule to attack the disease:</Typography>

      <Paper className={styles.editorWrapper} variant="outlined">
        <Fade in={!toolsReady} appear={false}>
          <Skeleton className={styles.editorSkeleton} variant="rounded" animation="wave" />
        </Fade>

        <iframe
          className={styles.editor}
          id="sketch"
          src="marvinjs/editorws.html"
          title="MarvinJS editor"
          tabIndex={isActive ? 0 : -1}
        />
      </Paper>

      <Typography className={styles.text}>SMILES representation:</Typography>

      <SmilesDisplay smiles={marvinSmile} />
    </>
  );
};

export default EditorFlow;
