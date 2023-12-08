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

  const handleInputBlur = (event) => {
    setInputValue(event.target.value.trim());
  };

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
