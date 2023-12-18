import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import MolecularStructure from "../MolecularStructure";
import { useInitToolsContext } from "../../contexts/InitToolsContext";
import { usePredictionContext } from "../../contexts/PredictionContext";
import { useStyles } from "./styles";

/**
 * Flow component that allows user to input molecule in SMILES format. <br>
 * Valid molecule gets represented as svg by {@link MolecularStructure} component.
 *
 * @property {boolean} isActive Indicates whether this flow is currently selected by user
 *
 * @see MolecularStructure
 * @namespace InputFlow
 */
const InputFlow = ({ isActive }) => {
  const [isValidInput, setIsValidInput] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const { setCurrentSmiles } = usePredictionContext();
  const { rdkit, toolsReady } = useInitToolsContext();
  const styles = useStyles();

  useEffect(() => {
    if (isActive) {
      setCurrentSmiles(isValidInput ? inputValue : "");
    }
  }, [isActive, inputValue, isValidInput]);

  /**
   * Handler applied to input's onChange event. <br>
   * Chacks the validity of entered SMILES by RDKit means. <br>
   * RDKit's instance of molecule is cleared from memory when all the processing is finished.
   */
  const handleInputChange = (event) => {
    const smile = event.target.value;
    setInputValue(smile);

    if (!rdkit) return;

    const trimmedSmile = smile.trim();
    const rdKitMolecule = rdkit.get_mol(trimmedSmile);
    const isValid = Boolean(rdKitMolecule) && !/\s/.test(trimmedSmile);
    setIsValidInput(isValid);

    rdKitMolecule?.delete();
  };

  /**
   * Handler applied to input's onBlur event. <br>
   * Trims (cuts space characters from start and end of the string) the input.
   */
  const handleInputBlur = (event) => {
    setInputValue(event.target.value.trim());
  };

  /**
   * Handler applied to right input adornment's onClick event. <br>
   * Clears inputted molecule.
   */
  const handleInputClear = () => {
    setInputValue("");
    setIsValidInput(true);
  };

  return (
    <>
      <Typography className={styles.text}>Enter molecule in SMILES format:</Typography>

      <TextField
        label="SMILES"
        disabled={!toolsReady}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        error={!isValidInput}
        className={styles.inputWrapper}
        autoComplete="off"
        inputProps={{ spellCheck: "false", tabIndex: isActive ? 0 : -1 }}
        InputProps={{
          classes: { root: styles.input },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                size="small"
                onClick={handleInputClear}
                disabled={!toolsReady}
                tabIndex={isActive ? 0 : -1}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Typography className={styles.text}>Chemical structure:</Typography>

      <MolecularStructure smiles={inputValue} width={700} height={400} />
    </>
  );
};

export default InputFlow;
