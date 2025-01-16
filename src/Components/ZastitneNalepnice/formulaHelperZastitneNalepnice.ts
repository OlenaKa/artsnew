const positiveNumberOrOneDecimal = /^(\d+(\.\d{1})?)$/;
const positiveInteger = /^[1-9]\d*$/;
const pricePerCM = 2.15;

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

function getPriceNet(surface: number): number {
  return surface * pricePerCM;
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
