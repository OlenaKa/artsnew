import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import themePvcNalepnice from "./themePapirneNalepnice";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  validateFormValues,
  calculatePrice,
} from "./formulaHelperPapirneNalepnice";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Radio, { RadioProps } from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import ResultPapirneNalepnice from "./ResultPapirneNalepnice";
import FormLabel from "@mui/material/FormLabel";
import {
  CustomRadioOtherSingle,
  CustomRadioSquareSingle,
  CustomRadioOnSheet,
} from "./radioHelperPapirneNalepnice";

const positiveNumberOrOneDecimal = /^(\d+(\.\d{1})?)$/;
const positiveNumber = /^[1-9]\d*$/;
let stringSrc = "http://nfc.rs/gallery/";

export default function PapirneNalepnice({
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
  const [printColor, setPrintColor] = useState("");
  const [printColorError, setPrintColorError] = useState(false);
  const [shape, setShape] = useState("squareSingle");
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
  console.log("PapirneNalepnice");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isValid, errors } = validateFormValues({
      height,
      width,
      quantity,
      printColor,
    });
    setHeightError(errors.height);
    setWidthError(errors.width);
    setQuantityError(errors.quantity);
    setPrintColorError(errors.printColor);

    if (isValid) {
      const { moq, priceNet, pricePerPc, priceGross } = calculatePrice({
        height,
        width,
        quantity,
        printColor,
      });
      setQuotedPriceNet(priceNet);
      setQuotedPricePricePerPc(pricePerPc);
      setQuotedPriceGross(priceGross);
      setQuotedMOQ(moq);
    } else {
      console.log("Form is invalid. Fix errors and try again.");
    }
  };

  const handleChangePrintColor = (event: SelectChangeEvent) => {
    setPrintColor(`${event.target.value}`);
    if (event.target.value !== "") setPrintColorError(false);
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
          <Typography variant="h2"> Papirne nalepnice </Typography>
          <CardMedia component="img" src={stringSrc.concat(imageSrc)} />
          <Box>
            <Box component={"form"} onSubmit={handleSubmit}>
              <Typography variant="h5">Izračunajte cenu</Typography>
              <FormControl key="shape" id="shape">
                <FormLabel id="shape">
                  <RadioGroup
                    id="shape"
                    aria-labelledby="shape"
                    name="shape"
                    value={shape}
                    onChange={(e) => setShape(e.target.value)}
                  >
                    {/* <Typography variant="body2">Izaberite oblik</Typography> */}
                    <FormControlLabel
                      value="squareSingle"
                      control={<CustomRadioSquareSingle />}
                      label="Pojedinacne nalepnice pravougaonik/kvadrat"
                    />
                    <FormControlLabel
                      value="otherSingle"
                      control={<CustomRadioOtherSingle />}
                      label="Pojedinačne nalepnice drugog oblika"
                    />
                    <FormControlLabel
                      value="onSheet"
                      control={<CustomRadioOnSheet />}
                      label="Nalepnice na tabaku"
                    />
                  </RadioGroup>
                </FormLabel>
              </FormControl>
              <FormControl key="cut" error={printColorError}>
                <InputLabel id="printColor" className="select">
                  Izaberite boju štampe
                </InputLabel>
                <Select
                  labelId="printColor"
                  id="colour"
                  value={printColor}
                  label="Izaberite boju štampe"
                  onChange={handleChangePrintColor}
                >
                  <MenuItem value="bw" key="bw">
                    Crno-bela
                  </MenuItem>
                  <MenuItem value="color" key="color">
                    Kolor štampa
                  </MenuItem>
                </Select>
                <FormHelperText>
                  {!printColorError
                    ? "Obavezno polje*"
                    : "Niste izabrali boju štampe!"}
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
                  inputProps={{ min: "1", step: "1" }}
                ></TextField>
              </FormControl>

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

              <Button type="submit" variant="contained">
                Izračunaj
              </Button>
            </Box>
            {QuotedPricePerPc && QuotedPriceNet && (
              <ResultPapirneNalepnice
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
