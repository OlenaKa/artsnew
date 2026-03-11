interface Magneti3dPricingRow {
  price_per_sq_cm?: number;
  pricePerSqCm?: number;
  minimum_order_net?: number;
  minimumOrderNet?: number;
}

interface Magneti3dPricingResponse {
  success?: boolean;
  data?: Magneti3dPricingRow[];
}

interface Magneti3dPricing {
  pricePerSqCm: number;
  minimumOrderNet: number;
}

async function fetchMagneti3dPricing(): Promise<Magneti3dPricing> {
  const mainLink = process.env.REACT_APP_MAINLINK;
  if (!mainLink) {
    throw new Error("REACT_APP_MAINLINK is not defined");
  }

  const response = await fetch(`${mainLink}/magneti-3d-pricing`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const json = (await response.json()) as
    | Magneti3dPricingResponse
    | Magneti3dPricingRow[];

  if (!Array.isArray(json) && json.success === false) {
    throw new Error("Backend returned success=false");
  }

  const rows = Array.isArray(json) ? json : (json.data ?? []);
  const firstRow = rows[0];

  if (!firstRow) {
    throw new Error("Pricing data is empty");
  }

  const pricePerSqCm = Number(
    firstRow.price_per_sq_cm ?? firstRow.pricePerSqCm,
  );
  const minimumOrderNet = Number(
    firstRow.minimum_order_net ?? firstRow.minimumOrderNet ?? 2000,
  );

  if (!Number.isFinite(pricePerSqCm)) {
    throw new Error("Invalid price_per_sq_cm value from backend");
  }

  return {
    pricePerSqCm,
    minimumOrderNet,
  };
}

const validateForm = (
  event: React.FormEvent<HTMLFormElement>,
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
  quantity: number | null | undefined,
  pricing: Magneti3dPricing,
  width?: string | number | undefined,
  height?: string | number | undefined,
  diameter?: string | number | undefined,
): Result {
  const surface = calculateSurface(shape, width, height, diameter);
  const priceNet = Number(
    roundToTwo(calculatePrice(surface, pricing.pricePerSqCm)),
  );

  const valueEstimatedNet = Number(priceNet) * Number(quantity);
  if (valueEstimatedNet >= pricing.minimumOrderNet) {
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
    const minQuantity = Math.round(pricing.minimumOrderNet / Number(priceNet));
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

export { calculateResult, fetchMagneti3dPricing, validateForm };
export type { Magneti3dPricing, Result };
