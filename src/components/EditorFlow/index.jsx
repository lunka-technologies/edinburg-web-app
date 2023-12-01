import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import Skeleton from "@mui/material/Skeleton";

import { useInitToolsContext } from "../../contexts/InitToolsContext";
import { usePredictionContext } from "../../contexts/PredictionContext";
import { useStyles } from "./styles";

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

    marvin.sketcherInstance.on("molchange", handleMoleculeChange);

    return () => {
      marvin.sketcherInstance.off("molchange", handleMoleculeChange);
    };
  }, [toolsReady]);

  const handleMoleculeChange = async () => {
    setMarvinSmile("");
    setIsValid(true);

    const mol = await marvin.sketcherInstance.exportStructure("mol");
    const rdMol = rdkit.get_mol(mol);

    if (!rdMol) {
      setIsValid(false);
      return;
    }

    const smiles = rdMol.get_smiles();
    setMarvinSmile(smiles);
  };

  return (
    <>
      <Typography className={styles.text}>Draw desired molecule to attack the disease:</Typography>

      <Paper className={styles.editorWrapper} variant="outlined">
        <Fade in={!toolsReady} appear={false}>
          <Skeleton className={styles.editorSkeleton} variant="rounded" animation="wave" />
        </Fade>

        <iframe className={styles.editor} id="sketch" src="marvinjs/editorws.html" />
      </Paper>

      <Typography className={styles.text}>SMILES representation:</Typography>

      <Box className={styles.smilesWrapper}>
        <Typography className={`${styles.smiles} ${styles.text}`}>{marvinSmile}</Typography>
      </Box>
    </>
  );
};

export default EditorFlow;
