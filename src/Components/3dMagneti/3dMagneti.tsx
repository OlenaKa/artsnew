import React from "react";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { calculateResult, validateForm } from "./formulaHelper3dMagneti";
import theme3dMagneti from "./theme3dMagneti";
import { Result } from "./formulaHelper3dMagneti";
import Result3dMagneti from "./Result3dMagneti";
import { Category } from "../MobileNav/typesCategories";

const positiveNumber = /^[1-9]\d*(\.\d+)?$/;
const positiveNumberOrOneDecimal = /^(\d+(\.\d{1})?)$/;
let stringSrc = "http://nfc.rs/gallery/";

export default function Magneti3d({
  imageSrc,
}: {
  imageSrc: string;
}): JSX.Element {
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
  const [result, setResult] = useState<false | Result>(false);

  useEffect(() => {}, [
    shape,
    width,
    height,
    diameter,
    shapeError,
    widthError,
    heightError,
    diameterError,
    result,
  ]);

  const handleChangeShape = (event: SelectChangeEvent) => {
    setShape(`${event.target.value}`);
    if (event.target.value !== "") setShapeError(false);
  };

  const handleChangeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(`${event.target.value}`);
    if (
      !positiveNumberOrOneDecimal.test(event.target.value) ||
      !positiveNumber.test(event.target.value)
    ) {
      setWidthError(true);
    } else {
      setWidthError(false);
    }
  };

  const handleChangeHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(`${event.target.value}`);
    if (!positiveNumberOrOneDecimal.test(event.target.value)) {
      setHeightError(true);
    } else {
      setHeightError(false);
    }
  };
  const handleChangeDiameter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiameter(`${event.target.value}`);
    if (!positiveNumberOrOneDecimal.test(event.target.value)) {
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
    if (
      validateForm(
        event,
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
        positiveNumber,
      )
    ) {
      const getParams = calculateResult(
        shape,
        Number(quantity),
        width,
        height,
        diameter,
      );
      setResult(getParams);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme3dMagneti}>
        <Paper>
          <Typography variant="h2"> 3d Magneti </Typography>
          <CardMedia
            component="img"
            // height="194"
            image={stringSrc.concat(imageSrc)}
            alt="3d Magneti"
          />
          <Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.7,
                maxWidth: 600,
                // mx: "auto",
                pt: 1,
              }}
            >
              <Typography variant="h5" sx={{ mb: 1 }}>
                Kalkulator
              </Typography>

              {/* Shape field */}
              <FormControl
                key="shape"
                error={shapeError}
                sx={{ width: "100%", maxWidth: 400 }}
              >
                <InputLabel id="shape-helper" className="select">
                  Izaberite oblik
                </InputLabel>
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

              {/* Dimensions */}
              {shape === "circle" ? (
                <FormControl
                  key="diameter"
                  sx={{ width: "100%", maxWidth: 400 }}
                >
                  <TextField
                    id="diameter"
                    label="Prečnik (mm)"
                    error={diameterError}
                    value={diameter}
                    type="number"
                    helperText={
                      !diameterError
                        ? "Obavezno polje*"
                        : "Niste uneli validnu veličinu!"
                    }
                    onChange={handleChangeDiameter}
                    inputProps={{ min: "0,1", step: "0,1" }}
                  />
                </FormControl>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    gap: 0.75,
                    width: "100%",
                    maxWidth: 400,
                  }}
                >
                  <FormControl key="width" sx={{ flex: 1 }}>
                    <TextField
                      id="width"
                      label="Širina (mm)"
                      error={widthError}
                      value={width}
                      type="number"
                      helperText={
                        !widthError
                          ? "Obavezno polje*"
                          : "Niste uneli validnu veličinu!"
                      }
                      onChange={handleChangeWidth}
                      inputProps={{ min: "0,1", step: "0,1" }}
                    />
                  </FormControl>
                  <FormControl key="height" sx={{ flex: 1 }}>
                    <TextField
                      id="height"
                      label="Visina (mm)"
                      error={heightError}
                      value={height}
                      type="number"
                      helperText={
                        !heightError
                          ? "Obavezno polje*"
                          : "Niste uneli validnu veličinu!"
                      }
                      inputProps={{ min: "0,1", step: "0,1" }}
                      onChange={handleChangeHeight}
                    />
                  </FormControl>
                </Box>
              )}

              {/* Quantity */}
              <FormControl key="quantity" sx={{ width: "100%", maxWidth: 400 }}>
                <TextField
                  id="quantity"
                  label="Količina"
                  error={quantityError}
                  value={quantity}
                  type="number"
                  helperText={
                    !quantityError
                      ? "Obavezno polje*"
                      : "Niste uneli validnu veličinu!"
                  }
                  onChange={handleChangeQuantity}
                  inputProps={{ min: "0", step: "1" }}
                />
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 1, minWidth: 200 }}
              >
                Izračunaj
              </Button>
            </Box>

            {result && <Result3dMagneti {...result} />}
          </Box>
          {/* </Container> */}
        </Paper>
      </ThemeProvider>
    </>
  );
}
