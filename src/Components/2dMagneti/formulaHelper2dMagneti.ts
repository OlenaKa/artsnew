interface Magneti2dPricingRow {
  price_per_sq_cm?: number;
  pricePerSqCm?: number;
  minimum_order_net?: number;
  minimumOrderNet?: number;
}

interface Magneti2dPricingResponse {
  success?: boolean;
  data?: Magneti2dPricingRow[];
}

interface Magneti2dPricing {
  pricePerSqCm: number;
  minimumOrderNet: number;
}

async function fetchMagneti2dPricing(): Promise<Magneti2dPricing> {
  const mainLink = process.env.REACT_APP_MAINLINK;
  if (!mainLink) {
    throw new Error("REACT_APP_MAINLINK is not defined");
  }

  const response = await fetch(`${mainLink}/magneti-2d-pricing`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const json = (await response.json()) as
    | Magneti2dPricingResponse
    | Magneti2dPricingRow[];

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
  quantity: string | number,
  setQuantityError: (arg0: boolean) => void,
  width: string | number,
  setWidthError: (arg0: boolean) => void,
  height: string | number,
  setHeightError: (arg0: boolean) => void,
  positiveNumber: RegExp,
) => {
  const setErrorFieldQuantity = () => {
    setQuantityError(true);
    return document.getElementById("quantity")?.scrollIntoView();
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
    case !positiveNumber.test(String(quantity)) || quantity === "":
      setErrorFieldQuantity();
      return false;
    case !positiveNumber.test(String(width)) || width === "":
      setErrorFieldWidth();
      return false;
    case !positiveNumber.test(String(height)) || height === "":
      setErrorFieldHeight();
      return false;

    default:
      return true;
  }
};

function calculateSurface(
  width: string | number,
  height: string | number,
): number {
  // Calculate rectangle surface: convert mm^2 to cm^2
  return (Number(width) * Number(height)) / 100;
}

function calculatePrice(surface: number, pricePerCm: number): number {
  return Number(surface) * Number(pricePerCm);
}

interface Result {
  priceNet: number | string;
  valueNet: number | string;
  valueBrutto: number | string;
  minQuantity?: number;
}

function roundToTwo(num: number) {
  return +(Math.round(Number(num + "e+2")) + "e-2");
}

function calculateResult(
  quantity: number | null | undefined,
  pricing: Magneti2dPricing,
  width: string | number,
  height: string | number,
): Result {
  const surface = calculateSurface(width, height);
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

export { calculateResult, fetchMagneti2dPricing, validateForm };
export type { Magneti2dPricing, Result };
