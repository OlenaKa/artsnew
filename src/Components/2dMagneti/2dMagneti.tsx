import React from "react";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CardMedia from "@mui/material/CardMedia";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button, CircularProgress } from "@mui/material";
import {
  calculateResult,
  fetchMagneti2dPricing,
  validateForm,
} from "./formulaHelper2dMagneti";
import theme2dMagneti from "./theme2dMagneti";
import { Magneti2dPricing, Result } from "./formulaHelper2dMagneti";
import Result2dMagneti from "./Result2dMagneti";

const positiveNumber = /^[1-9]\d*(\.\d+)?$/;
const positiveNumberOrOneDecimal = /^(\d+(\.\d{1})?)$/;
let stringSrc = "http://nfc.rs/gallery/";

export default function Magneti2d({
  imageSrc,
}: {
  imageSrc: string;
}): JSX.Element {
  const [width, setWidth] = useState<string | number>("");
  const [widthError, setWidthError] = useState(false);
  const [height, setHeight] = useState<string | number>("");
  const [heightError, setHeightError] = useState(false);
  const [quantity, setQuantity] = useState<string | number>("");
  const [quantityError, setQuantityError] = useState(false);
  const [result, setResult] = useState<false | Result>(false);
  const [pricing, setPricing] = useState<Magneti2dPricing | null>(null);
  const [pricingLoading, setPricingLoading] = useState(true);
  const [pricingError, setPricingError] = useState<string | null>(null);

  useEffect(() => {
    setPricingLoading(true);
    fetchMagneti2dPricing()
      .then((apiPricing) => {
        setPricing(apiPricing);
        setPricingError(null);
      })
      .catch((error: Error) => {
        setPricingError(error.message);
      })
      .finally(() => {
        setPricingLoading(false);
      });
  }, []);

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
        quantity,
        setQuantityError,
        width,
        setWidthError,
        height,
        setHeightError,
        positiveNumber,
      )
    ) {
      if (!pricing) {
        setPricingError("Cenovnik nije ucitan. Pokusajte ponovo.");
        return;
      }

      const getParams = calculateResult(
        Number(quantity),
        pricing,
        width,
        height,
      );
      setResult(getParams);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme2dMagneti}>
        <Paper>
          <Typography variant="h2"> 2d Magneti </Typography>
          <CardMedia
            component="img"
            // height="194"
            image={stringSrc.concat(imageSrc)}
            alt="2d Magneti"
          />
          <Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.75,
                maxWidth: 600,
                mx: "auto",
                pt: 1,
              }}
            >
              <Typography variant="h5" sx={{ mb: 1 }}>
                Kalkulator
              </Typography>

              {/* Dimensions */}
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
                disabled={pricingLoading || !pricing}
                sx={{ mt: 1, minWidth: 200 }}
              >
                {pricingLoading ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  "Izračunaj"
                )}
              </Button>
              {pricingError && (
                <Typography color="error">{pricingError}</Typography>
              )}
            </Box>

            {result && <Result2dMagneti {...result} />}
          </Box>
          {/* </Container> */}
        </Paper>
      </ThemeProvider>
    </>
  );
}
