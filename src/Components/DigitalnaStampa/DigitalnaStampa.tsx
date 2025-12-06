import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import themeDigitalnaStampa from "./themeDigitalnaStampa";
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
} from "./formulaHelperDigitalnaStampa";
import ResultDigitalnaStampa from "./ResultDigitalnaStampa";

const positiveNumberOrOneDecimal = /^(\d+(\.\d{1})?)$/;
const positiveNumber = /^[1-9]\d*$/;
let stringSrc = "http://nfc.rs/gallery/";

export default function DigitalnaStampa({
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
    <ThemeProvider theme={themeDigitalnaStampa}>
      <Paper>
        <Typography variant="h2">Digitalna štampa</Typography>
        <Box>
          <CardMedia
            component="img"
            image={`${stringSrc}${imageSrc}`}
            alt="Digitalna štampa"
          />
          <form onSubmit={handleSubmit}>
            <FormControl>
              <TextField
                id="width"
                label="Širina (cm)"
                variant="outlined"
                value={width}
                onChange={handleChangeWidth}
                error={widthError}
                helperText={widthError ? "Unesite validnu širinu" : ""}
              />
            </FormControl>
            <FormControl>
              <TextField
                id="height"
                label="Visina (cm)"
                variant="outlined"
                value={height}
                onChange={handleChangeHeight}
                error={heightError}
                helperText={heightError ? "Unesite validnu visinu" : ""}
              />
            </FormControl>
            <FormControl>
              <TextField
                id="quantity"
                label="Količina"
                variant="outlined"
                value={quantity}
                onChange={handleChangeQuantity}
                error={quantityError}
                helperText={quantityError ? "Unesite validnu količinu" : ""}
              />
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Izračunaj cenu
            </Button>
          </form>
        </Box>
        {QuotedPriceNet && (
          <ResultDigitalnaStampa
            priceNet={QuotedPriceNet}
            pricePerPc={QuotedPricePerPc}
            priceGross={QuotedPriceGross}
            moq={QuotedMOQ}
          />
        )}
      </Paper>
    </ThemeProvider>
  );
}
