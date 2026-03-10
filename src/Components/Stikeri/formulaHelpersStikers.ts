interface StikeriPricingRow {
  foil_type: string;
  price_per_sq_cm: number;
}

interface StikeriPricingResponse {
  success: boolean;
  data: StikeriPricingRow[];
}

type FoilPricing = Record<string, number>;

async function fetchStikeriPrices(): Promise<FoilPricing> {
  const mainLink = process.env.REACT_APP_MAINLINK;
  if (!mainLink) {
    throw new Error("REACT_APP_MAINLINK is not defined");
  }

  const response = await fetch(`${mainLink}/stikeri`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const json: StikeriPricingResponse = await response.json();
  if (!json.success) {
    throw new Error("Backend returned success=false");
  }

  return json.data.reduce<FoilPricing>((acc, row) => {
    acc[row.foil_type] = Number(row.price_per_sq_cm);
    return acc;
  }, {});
}

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
  positiveNumber: RegExp,
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
    case (shape === "rectangle" || shape === "ellipse") &&
      (!positiveNumber.test(String(width)) || width === ""):
      setErrorFieldWidth();
      return false;
    case (shape === "rectangle" || shape === "ellipse") &&
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
  diameter?: string | number | undefined,
): number {
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

function calculatePrice(surface: number, pricePerCm: number): number {
  const priceNet = Number(surface) * Number(pricePerCm);
  return priceNet;
}

interface Result {
  priceNet: number | string;
  valueNet: number | string;
  valueBrutto: number | string;
  shape?: string;
  foil?: string;
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
  pricing: FoilPricing,
  width?: string | number | undefined,
  height?: string | number | undefined,
  diameter?: string | number | undefined,
): Result {
  const pricePerCm = pricing[foil];
  if (typeof pricePerCm !== "number") {
    throw new Error(`Pricing not found for foil: ${foil}`);
  }

  const surface = calculateSurface(shape, width, height, diameter);
  const priceNet = Number(roundToTwo(calculatePrice(surface, pricePerCm)));

  const valueEstimatedNet = Number(priceNet) * Number(quantity);
  if (valueEstimatedNet >= 2000) {
    const valueNet = roundToTwo(valueEstimatedNet);
    const valueBrutto = roundToTwo(valueEstimatedNet * 1.2);

    const result: Result = {
      priceNet: priceNet.toLocaleString("sr-RS", { minimumFractionDigits: 2 }),
      valueNet: valueNet.toLocaleString("sr-RS", { minimumFractionDigits: 2 }),
      valueBrutto: valueBrutto.toLocaleString("sr-RS", {
        minimumFractionDigits: 2,
      }),
    };
    return result;
  } else {
    const minQuantity = Math.round(2000 / Number(priceNet));
    const valueNet = roundToTwo(minQuantity * Number(priceNet));
    const valueBrutto = roundToTwo(Number(valueNet) * 1.2);

    const result: Result = {
      priceNet: priceNet.toLocaleString("sr-RS", { minimumFractionDigits: 2 }),
      valueNet: valueNet.toLocaleString("sr-RS", { minimumFractionDigits: 2 }),
      valueBrutto: valueBrutto.toLocaleString("sr-RS", {
        minimumFractionDigits: 2,
      }),
      minQuantity,
    };
    return result;
  }
}

export { calculateResult, fetchStikeriPrices, validateForm };
export type { FoilPricing, Result };
