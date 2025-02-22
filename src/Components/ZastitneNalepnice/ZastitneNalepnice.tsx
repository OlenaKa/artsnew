import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import themePvcNalepnice from "./themeZastitneNalepnice";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  validateFormValues,
  calculatePrice,
} from "./formulaHelperZastitneNalepnice";
import ResultZastitneNalepnice from "./ResultZastitneNalepnice";

const positiveNumberOrOneDecimal = /^(\d+(\.\d{1})?)$/;
const positiveNumber = /^[1-9]\d*$/;
let stringSrc = "http://nfc.rs/gallery/";

export default function ZastitneNalepnice({
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
  const [QuotedPricePerPc, setQuotedPricePricePerPc] = useState<
    number | string | null
  >(null);
  const [QuotedPriceNet, setQuotedPriceNet] = useState<number | string | null>(
    null
  );
  const [QuotedPriceGross, setQuotedPriceGross] = useState<
    number | string | null
  >(null);
  const [QuotedMOQ, setQuotedMOQ] = useState<number | null>(null);
  useEffect(() => {}, [QuotedMOQ]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isValid, errors } = validateFormValues({ height, width, quantity });
    setHeightError(errors.height);
    setWidthError(errors.width);
    setQuantityError(errors.quantity);

    if (isValid) {
      const { moq, priceNet, pricePerPc, priceGross } = calculatePrice({
        height,
        width,
        quantity,
      });
      setQuotedPriceNet(priceNet);
      setQuotedPricePricePerPc(pricePerPc);
      setQuotedPriceGross(priceGross);
      setQuotedMOQ(moq);
    } else {
      console.log("Form is invalid. Fix errors and try again.");
    }
  };

  const handleChangeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(`${event.target.value}`);

    if (!positiveNumberOrOneDecimal.test(event.target.value)) {
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

  return (
    <>
      <ThemeProvider theme={themePvcNalepnice}>
        <Paper>
          <Typography variant="h2"> Zaštitne nalepnice </Typography>
          <CardMedia component="img" src={stringSrc.concat(imageSrc)} />
          <Box>
            <Box component={"form"} onSubmit={handleSubmit}>
              <Typography variant="h5">Izračunajte cenu</Typography>
              <FormControl key="width">
                <TextField
                  id="width"
                  label="Unesite širinu u cm, format 111,1"
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
                ></TextField>
              </FormControl>
              <FormControl key="height">
                <TextField
                  id="height"
                  label="Unesite visinu u cm, format 111,1"
                  error={heightError}
                  value={height}
                  type="number"
                  helperText={
                    !heightError
                      ? "Obavezno polje*"
                      : "Niste uneli validnu veličinu!"
                  }
                  onChange={handleChangeHeight}
                  inputProps={{ min: "0,1", step: "0,1" }}
                ></TextField>
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
                  inputProps={{ min: "1", step: "1" }}
                ></TextField>
              </FormControl>
              <Button type="submit" variant="contained">
                Izračunaj
              </Button>
            </Box>
            {QuotedPricePerPc && QuotedPriceNet && (
              <ResultZastitneNalepnice
                pricePerPc={QuotedPricePerPc}
                priceNet={QuotedPriceNet}
                priceGross={QuotedPriceGross}
                moq={QuotedMOQ}
              />
            )}
          </Box>
        </Paper>
      </ThemeProvider>
    </>
  );
}
