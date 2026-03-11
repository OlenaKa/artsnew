const positiveNumberOrOneDecimal = /^(\d+(\.\d{1})?)$/;
const positiveInteger = /^[1-9]\d*$/;

interface PapirneNalepnicePricingRow {
  max_sheet_surface?: number;
  paper_price_per_sheet?: number;
  printing_bw_upto_10?: number;
  printing_bw_10_to_50?: number;
  printing_bw_51_to_100?: number;
  printing_bw_101_to_250?: number;
  printing_bw_251_to_500?: number;
  printing_bw_above_501?: number;
  printing_color_upto_10?: number;
  printing_color_10_to_50?: number;
  printing_color_51_to_100?: number;
  printing_color_101_to_250?: number;
  printing_color_251_to_500?: number;
  printing_color_above_501?: number;
  cutting_setup?: number;
  cutting_price_per_sheet?: number;
  cutting_price_per_qty?: number;
  maxSheetSurface?: number;
  paperPricePerSheet?: number;
  printingBWUpto10?: number;
  printingBW10To50?: number;
  printingBW51To100?: number;
  printingBW101To250?: number;
  printingBW251To500?: number;
  printingBWAbove501?: number;
  printingColorUpto10?: number;
  printingColor10To50?: number;
  printingColor51To100?: number;
  printingColor101To250?: number;
  printingColor251To500?: number;
  printingColorAbove501?: number;
  cuttingSetup?: number;
  cuttingPricePerSheet?: number;
  cuttingPricePerQty?: number;
}

interface PapirneNalepnicePricingResponse {
  success?: boolean;
  data?: PapirneNalepnicePricingRow[];
}

interface PapirneNalepnicePricing {
  maxSheetSurface: number;
  paperPricePerSheet: number;
  printingBWUpTo10: number;
  printingBW10to50: number;
  printingBW51to100: number;
  printingBW101to250: number;
  printingBW251to500: number;
  printingBWabove501: number;
  printingColorUpTo10: number;
  printingColor10to50: number;
  printingColor51to100: number;
  printingColor101to250: number;
  printingColor251to500: number;
  printingColorabove501: number;
  cuttingSetup: number;
  cuttingPricePerSheet: number;
  cuttingPricePerQty: number;
}

async function fetchPapirneNalepnicePricing(): Promise<PapirneNalepnicePricing> {
  const mainLink = process.env.REACT_APP_MAINLINK;
  if (!mainLink) {
    throw new Error("REACT_APP_MAINLINK is not defined");
  }

  const response = await fetch(`${mainLink}/papirne-nalepnice-pricing`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const json = (await response.json()) as
    | PapirneNalepnicePricingResponse
    | PapirneNalepnicePricingRow[];

  if (!Array.isArray(json) && json.success === false) {
    throw new Error("Backend returned success=false");
  }

  const rows = Array.isArray(json) ? json : (json.data ?? []);
  const firstRow = rows[0];

  if (!firstRow) {
    throw new Error("Pricing data is empty");
  }

  return {
    maxSheetSurface: Number(
      firstRow.max_sheet_surface ?? firstRow.maxSheetSurface,
    ),
    paperPricePerSheet: Number(
      firstRow.paper_price_per_sheet ?? firstRow.paperPricePerSheet,
    ),
    printingBWUpTo10: Number(
      firstRow.printing_bw_upto_10 ?? firstRow.printingBWUpto10,
    ),
    printingBW10to50: Number(
      firstRow.printing_bw_10_to_50 ?? firstRow.printingBW10To50,
    ),
    printingBW51to100: Number(
      firstRow.printing_bw_51_to_100 ?? firstRow.printingBW51To100,
    ),
    printingBW101to250: Number(
      firstRow.printing_bw_101_to_250 ?? firstRow.printingBW101To250,
    ),
    printingBW251to500: Number(
      firstRow.printing_bw_251_to_500 ?? firstRow.printingBW251To500,
    ),
    printingBWabove501: Number(
      firstRow.printing_bw_above_501 ?? firstRow.printingBWAbove501,
    ),
    printingColorUpTo10: Number(
      firstRow.printing_color_upto_10 ?? firstRow.printingColorUpto10,
    ),
    printingColor10to50: Number(
      firstRow.printing_color_10_to_50 ?? firstRow.printingColor10To50,
    ),
    printingColor51to100: Number(
      firstRow.printing_color_51_to_100 ?? firstRow.printingColor51To100,
    ),
    printingColor101to250: Number(
      firstRow.printing_color_101_to_250 ?? firstRow.printingColor101To250,
    ),
    printingColor251to500: Number(
      firstRow.printing_color_251_to_500 ?? firstRow.printingColor251To500,
    ),
    printingColorabove501: Number(
      firstRow.printing_color_above_501 ?? firstRow.printingColorAbove501,
    ),
    cuttingSetup: Number(firstRow.cutting_setup ?? firstRow.cuttingSetup),
    cuttingPricePerSheet: Number(
      firstRow.cutting_price_per_sheet ?? firstRow.cuttingPricePerSheet,
    ),
    cuttingPricePerQty: Number(
      firstRow.cutting_price_per_qty ?? firstRow.cuttingPricePerQty,
    ),
  };
}

interface FormValues {
  height: string | number;
  width: string | number;
  quantity: string | number;
  printColor: string;
  shape: string;
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
function calculateSheets(
  values: FormValues,
  pricing: PapirneNalepnicePricing,
): number {
  const { height, width, quantity } = values;
  const pcsPerSheet = Math.floor(
    pricing.maxSheetSurface /
      ((Number(height) + 0.15) * (Number(width) + 0.15)),
  );
  return Math.ceil(Number(quantity) / pcsPerSheet);
}

const getPrintingPriceBW = (
  sheetsNumber: number,
  pricing: PapirneNalepnicePricing,
): number => {
  switch (true) {
    case sheetsNumber <= 10:
      return (
        pricing.printingBWUpTo10 * sheetsNumber +
        pricing.paperPricePerSheet * sheetsNumber
      );
    case sheetsNumber <= 50 || sheetsNumber > 10:
      return (
        pricing.printingBW10to50 * sheetsNumber +
        pricing.paperPricePerSheet * sheetsNumber
      );
    case sheetsNumber <= 100 || sheetsNumber > 50:
      return (
        pricing.printingBW51to100 * sheetsNumber +
        pricing.paperPricePerSheet * sheetsNumber
      );
    case sheetsNumber <= 250 || sheetsNumber > 100:
      return (
        pricing.printingBW101to250 * sheetsNumber +
        pricing.paperPricePerSheet * sheetsNumber
      );
    case sheetsNumber <= 500 || sheetsNumber > 250:
      return (
        pricing.printingBW251to500 * sheetsNumber +
        pricing.paperPricePerSheet * sheetsNumber
      );
    case sheetsNumber > 500:
      return (
        pricing.printingBWabove501 * sheetsNumber +
        pricing.paperPricePerSheet * sheetsNumber
      );
    default:
      return 0;
  }
};

const getPrintingPriceColor = (
  sheetsNumber: number,
  pricing: PapirneNalepnicePricing,
): number => {
  switch (true) {
    case sheetsNumber <= 10:
      return (
        pricing.printingColorUpTo10 * sheetsNumber +
        pricing.paperPricePerSheet * sheetsNumber
      );
    case sheetsNumber <= 50 || sheetsNumber > 10:
      return (
        pricing.printingColor10to50 * sheetsNumber +
        pricing.paperPricePerSheet * sheetsNumber
      );
    case sheetsNumber <= 100 || sheetsNumber > 50:
      return (
        pricing.printingColor51to100 * sheetsNumber +
        pricing.paperPricePerSheet * sheetsNumber
      );
    case sheetsNumber <= 250 || sheetsNumber > 100:
      return (
        pricing.printingColor101to250 * sheetsNumber +
        pricing.paperPricePerSheet * sheetsNumber
      );
    case sheetsNumber <= 500 || sheetsNumber > 250:
      return (
        pricing.printingColor251to500 * sheetsNumber +
        pricing.paperPricePerSheet * sheetsNumber
      );
    case sheetsNumber > 500:
      return (
        pricing.printingColorabove501 * sheetsNumber +
        pricing.paperPricePerSheet * sheetsNumber
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
function calculatePrice(
  values: FormValues,
  pricing: PapirneNalepnicePricing,
): PriceDetails {
  const quantity = Number(values.quantity);
  const sheetsNumber = calculateSheets(values, pricing);
  let pricePrintingNet;
  switch (values.printColor) {
    case "bw":
      pricePrintingNet = getPrintingPriceBW(sheetsNumber, pricing);
      break;
    case "color":
      pricePrintingNet = getPrintingPriceColor(sheetsNumber, pricing);
      break;
    case "noPrinting":
      pricePrintingNet = sheetsNumber * pricing.paperPricePerSheet;
      break;
    default:
      pricePrintingNet = 0;
  }

  let priceNet;
  switch (values.shape) {
    case "squareSingle":
      priceNet = pricing.cuttingPricePerQty + pricePrintingNet;
      break;
    case "otherSingle":
      priceNet =
        pricing.cuttingPricePerSheet * sheetsNumber +
        pricePrintingNet +
        pricing.cuttingSetup +
        pricing.cuttingPricePerQty;
      break;
    case "onSheet":
      priceNet =
        pricing.cuttingPricePerSheet * sheetsNumber +
        pricePrintingNet +
        pricing.cuttingSetup;
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

export { validateFormValues, calculatePrice, fetchPapirneNalepnicePricing };
export type { PriceDetails, PapirneNalepnicePricing };
