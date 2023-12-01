import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { useInitToolsContext } from "../../contexts/InitToolsContext";
import { usePredictionContext } from "../../contexts/PredictionContext";
import { useStyles } from "./styles";

const InputFlow = ({ isActive }) => {
  const [isValidInput, setIsValidInput] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [moleculeSvg, setMoleculeSvg] = useState("");
  const { setCurrentSmiles } = usePredictionContext();
  const { rdkit } = useInitToolsContext();
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
    const molrd = rdkit.get_mol(trimmedSmile);
    const isValid = Boolean(molrd) && !/\s/.test(trimmedSmile);
    setIsValidInput(isValid);

    if (!isValid) {
      setMoleculeSvg("");
      return;
    }

    const svg = molrd.get_svg(700, 400);
    setMoleculeSvg(svg);
  };

  const handleInputBlur = (event) => {
    setInputValue(event.target.value.trim());
  };

  const handleInputClear = () => {
    setInputValue("");
    setIsValidInput(true);
    setMoleculeSvg("");
  };

  const fillSvg = () => ({
    __html: DOMPurify.sanitize(moleculeSvg, { USE_PROFILES: { svg: true, svgFilters: true } }),
  });

  return (
    <>
      <Typography className={styles.text}>Enter molecule in SMILES format:</Typography>

      <TextField
        label="SMILES"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        error={!isValidInput}
        className={styles.inputWrapper}
        inputProps={{ spellCheck: "false" }}
        InputProps={{
          classes: { root: styles.input },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" size="small" onClick={handleInputClear}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Typography className={styles.text}>Chemical structure:</Typography>

      <Box className={styles.moleculeWrapper}>
        <div className={styles.molecule} dangerouslySetInnerHTML={fillSvg()} />
      </Box>
    </>
  );
};

export default InputFlow;
