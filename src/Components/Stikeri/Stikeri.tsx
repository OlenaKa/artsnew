import React from "react";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { calculateResult, validateForm } from "./formulaHelpersStikers";

import themeStikeri from "./themeStikeri";

const positiveNumber = /^[1-9]\d*(\.\d+)?$/;

export default function Stikeri(): JSX.Element {
  const [foil, setFoil] = useState("");
  const [foilError, setFoilError] = useState(false);
  const [shape, setShape] = useState("");
  const [shapeError, setShapeError] = useState(false);
  const [width, setWidth] = useState<string | number>("");
  const [widthError, setWidthError] = useState(false);
  const [height, setHeight] = useState<string | number>("");
  const [heightError, setHeightError] = useState(false);
  const [diameter, setDiameter] = useState<string | number>("");
  const [diameterError, setDiameterError] = useState(false);
  const [quantity, setQuantity] = useState<string | number>("");
  const [quantityError, setQuantityError] = useState(false);

  useEffect(() => {}, [
    foil,
    shape,
    width,
    height,
    diameter,
    foilError,
    shapeError,
    widthError,
    heightError,
    diameterError,
  ]);

  const handleChangeFoil = (event: SelectChangeEvent) => {
    setFoil(`${event.target.value}`);
    if (event.target.value !== "") setFoilError(false);
  };

  const handleChangeShape = (event: SelectChangeEvent) => {
    setShape(`${event.target.value}`);
    if (event.target.value !== "") setShapeError(false);
  };

  const handleChangeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(`${event.target.value}`);
    if (!positiveNumber.test(event.target.value)) {
      setWidthError(true);
    } else {
      setWidthError(false);
    }
  };

  const handleChangeHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(`${event.target.value}`);
    if (!positiveNumber.test(event.target.value)) {
      setHeightError(true);
    } else {
      setHeightError(false);
    }
  };
  const handleChangeDiameter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiameter(`${event.target.value}`);
    if (!positiveNumber.test(event.target.value)) {
      setDiameterError(true);
    } else {
      setDiameterError(false);
    }
  };

  const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(`${event.target.value}`);
    if (!positiveNumber.test(event.target.value)) {
      setQuantityError(true);
    } else {
      setQuantityError(false);
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("shape", shape);
    console.log("width", width);
    console.log("height", height);
    console.log("diameter", diameter);

    if (
      validateForm(
        event,
        foil,
        setFoilError,
        shape,
        setShapeError,
        quantity,
        setQuantityError,
        diameter,
        setDiameterError,
        width,
        setWidthError,
        height,
        setHeightError,
        positiveNumber
      )
    ) {
      const result = calculateResult(
        shape,
        foil,
        Number(quantity),
        width,
        height,
        diameter
      );

      console.log("result", result);
    }
  };

  return (
    <>
      <ThemeProvider theme={themeStikeri}>
        <Paper>
          <Typography variant="h2"> 3d Stikeri </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <FormControl key="foil" error={foilError}>
              <InputLabel id="foil-helper">Izaberite foliju</InputLabel>
              <Select
                labelId="foil-helper"
                id="foil"
                value={foil}
                label="Izaberite foliju"
                onChange={handleChangeFoil}
              >
                <MenuItem value="bela" key="bela">
                  Bela
                </MenuItem>
                <MenuItem value="gold" key="gold">
                  Srebrna ili Zlatna
                </MenuItem>
              </Select>
              <FormHelperText>
                {!foilError ? "Obavezno polje*" : "Niste izabrali foliju!"}
              </FormHelperText>
            </FormControl>
            <FormControl key="shape" error={shapeError}>
              <InputLabel id="shape-helper">Izaberite oblik</InputLabel>
              <Select
                labelId="shape-helper"
                id="shape"
                value={shape}
                label="Izaberite oblik"
                onChange={handleChangeShape}
              >
                <MenuItem value="rectangle" key="rectangle">
                  Pravougaonik ili kvadrat
                </MenuItem>
                <MenuItem value="circle" key="circle">
                  Krug
                </MenuItem>
                <MenuItem value="ellipse" key="ellipse">
                  Elipsa
                </MenuItem>
              </Select>
              <FormHelperText>
                {!shapeError ? "Obavezno polje*" : "Niste izabrali oblik!"}
              </FormHelperText>
            </FormControl>
            <FormControl key="quantity">
              <TextField
                id="quantity"
                label="Unesite količinu"
                error={quantityError}
                value={quantity}
                type="number"
                helperText={
                  !quantityError
                    ? "Obavezno polje*"
                    : "Niste uneli validnu veličinu!"
                }
                onChange={handleChangeQuantity}
              ></TextField>
            </FormControl>
            {shape === "circle" ? (
              <FormControl key="diameter">
                <TextField
                  id="diameter"
                  label="Unesite prečnik u milimetrima"
                  error={diameterError}
                  value={diameter}
                  type="number"
                  helperText={
                    !diameterError
                      ? "Obavezno polje*"
                      : "Niste uneli validnu veličinu!"
                  }
                  onChange={handleChangeDiameter}
                ></TextField>
              </FormControl>
            ) : (
              <>
                <FormControl key="width">
                  <TextField
                    id="width"
                    label="Unesite širinu u milimetrima"
                    error={widthError}
                    value={width}
                    type="number"
                    helperText={
                      !widthError
                        ? "Obavezno polje*"
                        : "Niste uneli validnu veličinu!"
                    }
                    onChange={handleChangeWidth}
                  ></TextField>
                </FormControl>
                <FormControl key="height">
                  <TextField
                    id="height"
                    label="Unesite visinu u milimetrima"
                    error={heightError}
                    value={height}
                    type="number"
                    helperText={
                      !heightError
                        ? "Obavezno polje*"
                        : "Niste uneli validnu veličinu!"
                    }
                    inputProps={{ min: "0", step: "0,1" }}
                    onChange={handleChangeHeight}
                  ></TextField>
                </FormControl>
              </>
            )}
            <Button type="submit" variant="contained">
              Izračunaj
            </Button>
          </Box>
        </Paper>
      </ThemeProvider>
    </>
  );
}
