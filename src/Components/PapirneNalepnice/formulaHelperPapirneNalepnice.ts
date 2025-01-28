const positiveNumberOrOneDecimal = /^(\d+(\.\d{1})?)$/;
const positiveInteger = /^[1-9]\d*$/;
const maxSheetSurface = 1192.8; // 426mm x 280mm
const paperPricePerSheet = 19;
const printingBWUpTo10 = 33;
const printingBW10to50 = 28;
const printingBW51to100 = 27;
const printingBW101to250 = 24;
const printingBW251to500 = 22;
const printingBWabove501 = 20;
const printingColorUpTo10 = 100;
const printingColor10to50 = 85;
const printingColor51to100 = 68;
const printingColor101to250 = 58;
const printingColor251to500 = 48;
const printingColorabove501 = 40;

interface FormValues {
  height: string | number;
  width: string | number;
  quantity: string | number;
  printColor: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: {
    height: boolean;
    width: boolean;
    quantity: boolean;
    printColor: boolean;
  };
}

function validateFormValues(values: FormValues): ValidationResult {
  const errors: ValidationResult["errors"] = {
    height: !positiveNumberOrOneDecimal.test(String(values.height)),
    width: !positiveNumberOrOneDecimal.test(String(values.width)),
    quantity: !positiveInteger.test(String(values.quantity)),
    printColor: values.printColor === "",
  };

  return {
    isValid: !errors.height && !errors.width && !errors.quantity,
    errors,
  };
}
function calculateSheets(values: FormValues): number {
  const { height, width, quantity } = values;
  const pcsPerSheet = Math.floor(
    maxSheetSurface / ((Number(height) + 0.15) * (Number(width) + 0.15))
  );
  return Math.ceil(Number(quantity) / pcsPerSheet);
}

const getPrintingPriceBW = (sheetsNumber: number): number => {
  switch (true) {
    case sheetsNumber <= 10:
      return (
        printingBWUpTo10 * sheetsNumber + paperPricePerSheet * sheetsNumber
      );
    case sheetsNumber <= 50 || sheetsNumber > 10:
      return (
        printingBW10to50 * sheetsNumber + paperPricePerSheet * sheetsNumber
      );
    case sheetsNumber <= 100 || sheetsNumber > 50:
      return (
        printingBW51to100 * sheetsNumber + paperPricePerSheet * sheetsNumber
      );
    case sheetsNumber <= 250 || sheetsNumber > 100:
      return (
        printingBW101to250 * sheetsNumber + paperPricePerSheet * sheetsNumber
      );
    case sheetsNumber <= 500 || sheetsNumber > 250:
      return (
        printingBW251to500 * sheetsNumber + paperPricePerSheet * sheetsNumber
      );
    case sheetsNumber > 500:
      return (
        printingBWabove501 * sheetsNumber + paperPricePerSheet * sheetsNumber
      );
    default:
      return 0;
  }
};

const getPrintingPriceColor = (sheetsNumber: number): number => {
  switch (true) {
    case sheetsNumber <= 10:
      return (
        printingColorUpTo10 * sheetsNumber + paperPricePerSheet * sheetsNumber
      );
    case sheetsNumber <= 50 || sheetsNumber > 10:
      return (
        printingColor10to50 * sheetsNumber + paperPricePerSheet * sheetsNumber
      );
    case sheetsNumber <= 100 || sheetsNumber > 50:
      return (
        printingColor51to100 * sheetsNumber + paperPricePerSheet * sheetsNumber
      );
    case sheetsNumber <= 250 || sheetsNumber > 100:
      return (
        printingColor101to250 * sheetsNumber + paperPricePerSheet * sheetsNumber
      );
    case sheetsNumber <= 500 || sheetsNumber > 250:
      return (
        printingColor251to500 * sheetsNumber + paperPricePerSheet * sheetsNumber
      );
    case sheetsNumber > 500:
      return (
        printingColorabove501 * sheetsNumber + paperPricePerSheet * sheetsNumber
      );
    default:
      return 0;
  }
};

type PriceDetails = {
  priceNet: number | string;
  pricePerPc: number | string;
  priceGross: number | string | null;
  moq: number | null;
};
function calculatePrice(values: FormValues): PriceDetails {
  const quantity = Number(values.quantity);
  const sheetsNumber = calculateSheets(values);
  let priceNet;
  switch (values.printColor) {
    case "bw":
      priceNet = getPrintingPriceBW(sheetsNumber);
      break;
    case "color":
      priceNet = getPrintingPriceColor(sheetsNumber);
      break;
    default:
      priceNet = 0;
  }
  let pricePerPc = priceNet / quantity;
  pricePerPc = parseFloat(pricePerPc.toFixed(2));
  if (priceNet >= 200) {
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
    const moq = Math.round(200 / pricePerPc);
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
