const positiveNumberOrOneDecimal = /^(\d+(\.\d{1})?)$/;
const positiveInteger = /^[1-9]\d*$/;

interface ZastitneNalepnicePricingRow {
  price_per_cm?: number;
  pricePerCm?: number;
}

interface ZastitneNalepnicePricingResponse {
  success?: boolean;
  data?: ZastitneNalepnicePricingRow[];
}

async function fetchZastitneNalepnicePricing(): Promise<number> {
  const mainLink = process.env.REACT_APP_MAINLINK;
  if (!mainLink) {
    throw new Error("REACT_APP_MAINLINK is not defined");
  }

  const response = await fetch(`${mainLink}/zastitne-nalepnice-pricing`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const json = (await response.json()) as
    | ZastitneNalepnicePricingResponse
    | ZastitneNalepnicePricingRow[];

  if (!Array.isArray(json) && json.success === false) {
    throw new Error("Backend returned success=false");
  }

  const rows = Array.isArray(json) ? json : (json.data ?? []);
  const firstRow = rows[0];

  if (!firstRow) {
    throw new Error("Pricing data is empty");
  }

  const pricePerCm = Number(firstRow.price_per_cm ?? firstRow.pricePerCm);
  if (!Number.isFinite(pricePerCm)) {
    throw new Error("Invalid price_per_cm value from backend");
  }

  return pricePerCm;
}

interface FormValues {
  height: string | number;
  width: string | number;
  quantity: string | number;
}

interface ValidationResult {
  isValid: boolean;
  errors: {
    height: boolean;
    width: boolean;
    quantity: boolean;
  };
}

function validateFormValues(values: FormValues): ValidationResult {
  const errors: ValidationResult["errors"] = {
    height: !positiveNumberOrOneDecimal.test(String(values.height)),
    width: !positiveNumberOrOneDecimal.test(String(values.width)),
    quantity: !positiveInteger.test(String(values.quantity)),
  };

  return {
    isValid: !errors.height && !errors.width && !errors.quantity,
    errors,
  };
}
function calculateSurface(values: FormValues): number {
  const { height, width, quantity } = values;

  return Number(height) * Number(width) * Number(quantity);
}

function getPriceNet(surface: number, pricePerCm: number): number {
  return surface * pricePerCm;
}
type PriceDetails = {
  priceNet: number | string;
  pricePerPc: number | string;
  priceGross: number | string | null;
  moq: number | null;
};
function calculatePrice(values: FormValues, pricePerCm: number): PriceDetails {
  const quantity = Number(values.quantity);
  const surface = calculateSurface(values);
  let priceNet = getPriceNet(surface, pricePerCm);
  let pricePerPc = priceNet / quantity;
  pricePerPc = parseFloat(pricePerPc.toFixed(2));
  if (priceNet >= 1000) {
    const priceGross = parseFloat((priceNet * 1.2).toFixed(2));
    return {
      priceNet: priceNet.toLocaleString("sr-RS", { minimumFractionDigits: 2 }),
      pricePerPc: pricePerPc.toLocaleString("sr-RS", {
        minimumFractionDigits: 2,
      }),
      priceGross: priceGross.toLocaleString("sr-RS", {
        minimumFractionDigits: 2,
      }),
      moq: null,
    };
  } else {
    const moq = Math.round(1000 / pricePerPc);
    priceNet = moq * pricePerPc;
    const priceGross = parseFloat((priceNet * 1.2).toFixed(2));
    return {
      priceNet: priceNet.toLocaleString("sr-RS", { minimumFractionDigits: 2 }),
      pricePerPc: pricePerPc.toLocaleString("sr-RS", {
        minimumFractionDigits: 2,
      }),
      priceGross: priceGross.toLocaleString("sr-RS", {
        minimumFractionDigits: 2,
      }),
      moq,
    };
  }
}

export { validateFormValues, calculatePrice, fetchZastitneNalepnicePricing };
export type { PriceDetails };
