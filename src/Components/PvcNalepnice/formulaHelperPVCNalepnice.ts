import { m } from "framer-motion";

const positiveNumberOrOneDecimal = /^(\d+(\.\d{1})?)$/;
const positiveInteger = /^[1-9]\d*$/;
const priceTill2M2 = 1800;
const price2to4M2 = 1450;
const price4to10M2 = 1380;
const price10to20M2 = 1200;
const price20to50M2 = 1100;
const priceAbove50M2 = 1000;

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

  return (Number(height) * Number(width) * Number(quantity)) / 10000;
}

function getPriceNet(surface: number): number {
  if (surface < 2) {
    return surface * priceTill2M2; // Price per m² for surface < 2 m²
  } else if (surface >= 2 && surface < 4) {
    return surface * price2to4M2; // Price per m² for surface between 2 and 4 m²
  } else if (surface >= 4 && surface < 10) {
    return surface * price4to10M2; // Price per m² for surface between 4 and 10 m²
  } else if (surface >= 10 && surface < 20) {
    return surface * price10to20M2; // Price per m² for surface between 10 and 20 m²
  } else if (surface >= 20 && surface < 50) {
    return surface * price20to50M2; // Price per m² for surface between 20 and 50 m²
  } else {
    return surface * priceAbove50M2; // Price per m² for surface >= 50 m²
  }
}
type PriceDetails = {
  priceNet: number | string;
  pricePerPc: number | string;
  priceGross: number | string | null;
  moq: number | null;
};
function calculatePrice(values: FormValues): PriceDetails {
  const quantity = Number(values.quantity);
  const surface = calculateSurface(values);
  let priceNet = getPriceNet(surface);
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

export { validateFormValues, calculatePrice };
export type { PriceDetails };
