// type Shape = "rectangle" | "circle" | "ellipse";

import { m } from "framer-motion";

const pricePerSqCmWhite = 2.2; // 1 cent per cm^2
const pricePerSqCmGold = 2.7; // 1 cent per cm^2

const validateForm = (
  event: React.FormEvent<HTMLFormElement>,
  foil: string,
  setFoilError: (arg0: boolean) => void,
  shape: string,
  setShapeError: (arg0: boolean) => void,
  quantity: string | number,
  setQuantityError: (arg0: boolean) => void,
  diameter: string | number,
  setDiameterError: (arg0: boolean) => void,
  width: string | number,
  setWidthError: (arg0: boolean) => void,
  height: string | number,
  setHeightError: (arg0: boolean) => void,
  positiveNumber: RegExp
) => {
  const setErrorFieldFoil = () => {
    setFoilError(true);
    return document.getElementById("foil")?.scrollIntoView();
  };

  const setErrorFieldShape = () => {
    setShapeError(true);
    return document.getElementById("shape")?.scrollIntoView();
  };

  const setErrorFieldQuantity = () => {
    setQuantityError(true);
    return document.getElementById("quantity")?.scrollIntoView();
  };

  const setErrorFieldDiameter = () => {
    setDiameterError(true);
    return document.getElementById("diameter")?.scrollIntoView();
  };

  const setErrorFieldWidth = () => {
    setWidthError(true);
    return document.getElementById("width")?.scrollIntoView();
  };
  const setErrorFieldHeight = () => {
    setHeightError(true);
    return document.getElementById("height")?.scrollIntoView();
  };

  switch (true) {
    case foil === "":
      setErrorFieldFoil();
      return false;
    case shape === "":
      setErrorFieldShape();
      return false;
    case !positiveNumber.test(String(quantity)) || quantity === "":
      setErrorFieldQuantity();
      return false;
    case shape === "circle" &&
      (!positiveNumber.test(String(diameter)) || diameter === ""):
      setErrorFieldDiameter();
      return false;
    case (shape === "rectangle" || "ellipse") &&
      (!positiveNumber.test(String(width)) || width === ""):
      setErrorFieldWidth();
      return false;
    case (shape === "rectangle" || "ellipse") &&
      (!positiveNumber.test(String(height)) || height === ""):
      setErrorFieldHeight();
      return false;

    default:
      return true;
  }
};

function calculateSurface(
  shape: string,
  width?: string | number | undefined,
  height?: string | number | undefined,
  diameter?: string | number | undefined
): number | null | undefined {
  let surface: number | null = null;

  switch (shape) {
    case "rectangle":
      surface = (Number(width) * Number(height)) / 100; // convert mm^2 to cm^2
      break;
    case "circle":
      let radius = Number(diameter) / 2;
      let radiusCm = radius / 10;
      surface = Math.PI * Math.pow(radiusCm, 2);
      break;
    case "ellipse":
      let widthCm = Number(width) / 10;
      let heightCm = Number(height) / 10;
      surface = Math.PI * (Number(widthCm) / 2) * (Number(heightCm) / 2);

      break;
    default:
      throw new Error("Invalid shape");
  }

  return surface;
}

function calculatePrice(
  surface: number | null | undefined,
  pricePerCm: number | null | undefined
): number {
  const priceNet = Number(surface) * Number(pricePerCm);
  return priceNet;
}

interface Result {
  priceNet: number | null | undefined;
  valueNet: number;
  valueBrutto: number;
  shape: string;
  foil: string;
  quantity?: number | null | undefined;
  width?: string | number | undefined;
  height?: string | number | undefined;
  diameter?: string | number | undefined;
  minQuantity?: number;
}

function roundToTwo(num: number) {
  return +(Math.round(Number(num + "e+2")) + "e-2");
}

function calculateResult(
  shape: string,
  foil: string,
  quantity: number | null | undefined,
  width?: string | number | undefined,
  height?: string | number | undefined,
  diameter?: string | number | undefined
): Result | number | null | undefined {
  const pricePerCm = foil === "bela" ? pricePerSqCmWhite : pricePerSqCmGold;
  console.log(pricePerCm);

  const surface = calculateSurface(shape, width, height, diameter);
  const priceNet = roundToTwo(calculatePrice(surface, pricePerCm));

  const valueEstimatedNet = Number(priceNet) * Number(quantity);
  if (valueEstimatedNet >= 2000) {
    const valueNet = roundToTwo(valueEstimatedNet);
    const valueBrutto = roundToTwo(valueEstimatedNet * 1.2);

    const result: Result = {
      priceNet,
      valueNet,
      valueBrutto,
      shape,
      quantity,
      foil,
      width,
      height,
      diameter,
    };
    return result;
  } else {
    const minQuantity = Math.round(2000 / Number(priceNet));
    const valueNet = roundToTwo(minQuantity * Number(priceNet));
    const valueBrutto = roundToTwo(valueNet * 1.2);

    const result: Result = {
      priceNet,
      valueNet,
      valueBrutto,
      shape,
      foil,
      width,
      height,
      diameter,
      minQuantity,
    };
    return result;
  }
}

export { calculateResult, validateForm };
