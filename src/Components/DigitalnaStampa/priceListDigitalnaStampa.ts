// src/Components/DigitalnaStampa/priceListDigitalnaStampa.ts

export type QuantityRangeId =
  | "1-10"
  | "11-50"
  | "51-100"
  | "101-250"
  | "251-500"
  | "500+";

export type PrintTypeId = "4-0" | "4-4" | "4-1" | "1-0" | "1-1";

export const quantityRanges: {
  id: QuantityRangeId;
  label: string;
  description: string;
  imageSrc: string;
}[] = [
  {
    id: "1-10",
    label: "1–10 kom",
    description: "Male probne ili personalizovane serije.",
    imageSrc: "digitalna-1-10.jpg",
  },
  {
    id: "11-50",
    label: "11–50 kom",
    description: "Idealno za manje događaje i timove.",
    imageSrc: "digitalna-11-50.jpg",
  },
  {
    id: "51-100",
    label: "51–100 kom",
    description: "Standardan tiraž za manje kampanje.",
    imageSrc: "digitalna-51-100.jpg",
  },
  {
    id: "101-250",
    label: "101–250 kom",
    description: "Povoljniji otisak po komadu.",
    imageSrc: "digitalna-101-250.jpg",
  },
  {
    id: "251-500",
    label: "251–500 kom",
    description: "Veći tiraž po odličnim cenama.",
    imageSrc: "digitalna-251-500.jpg",
  },
  {
    id: "500+",
    label: "Preko 500 kom",
    description: "Najpovoljnija cena po komadu.",
    imageSrc: "digitalna-500plus.jpg",
  },
];

export const printTypes: {
  id: PrintTypeId;
  label: string;
  description: string;
}[] = [
  {
    id: "4-0",
    label: "4/0 pun kolor jednostrano",
    description: "Štampa samo sa jedne strane u boji.",
  },
  {
    id: "4-4",
    label: "4/4 pun kolor obostrano",
    description: "Štampa u boji sa obe strane.",
  },
  {
    id: "4-1",
    label: "4/1 kolor + crna",
    description: "Prednja strana u boji, zadnja crno-bela.",
  },
  {
    id: "1-0",
    label: "1/0 crno-belo jednostrano",
    description: "Crno-bela štampa sa jedne strane.",
  },
  {
    id: "1-1",
    label: "1/1 crno-belo obostrano",
    description: "Crno-bela štampa sa obe strane.",
  },
];

const printTypeIds: PrintTypeId[] = ["4-0", "4-4", "4-1", "1-0", "1-1"];
const quantityRangeIds: QuantityRangeId[] = [
  "1-10",
  "11-50",
  "51-100",
  "101-250",
  "251-500",
  "500+",
];

export interface DigitalnaStampaPricingData {
  prices: Record<PrintTypeId, Record<QuantityRangeId, number>>;
  laminationSetup: number;
  laminationPerSide: number;
}

interface DigitalnaStampaPricingRow {
  price_type?: "printing" | "plastification";
  print_type?: string;
  quantity_range?: string;
  price_per_otisak?: number;
  setup_price?: number;
  lamination_per_side?: number;
  priceType?: "printing" | "plastification";
  printType?: string;
  quantityRange?: string;
  pricePerOtisak?: number;
  setupPrice?: number;
  laminationPerSide?: number;
}

interface DigitalnaStampaPricingResponse {
  success?: boolean;
  data?: DigitalnaStampaPricingRow[];
}

function createEmptyPrices(): Record<
  PrintTypeId,
  Record<QuantityRangeId, number>
> {
  return printTypeIds.reduce(
    (pricesByType, printTypeId) => {
      pricesByType[printTypeId] = quantityRangeIds.reduce(
        (pricesByRange, rangeId) => {
          pricesByRange[rangeId] = 0;
          return pricesByRange;
        },
        {} as Record<QuantityRangeId, number>,
      );
      return pricesByType;
    },
    {} as Record<PrintTypeId, Record<QuantityRangeId, number>>,
  );
}

function isPrintTypeId(value: string): value is PrintTypeId {
  return printTypeIds.includes(value as PrintTypeId);
}

function isQuantityRangeId(value: string): value is QuantityRangeId {
  return quantityRangeIds.includes(value as QuantityRangeId);
}

export async function fetchDigitalnaStampaPricing(): Promise<DigitalnaStampaPricingData> {
  const mainLink = process.env.REACT_APP_MAINLINK;
  if (!mainLink) {
    throw new Error("REACT_APP_MAINLINK is not defined");
  }

  const response = await fetch(`${mainLink}/digitalna-stampa-pricing`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const json = (await response.json()) as
    | DigitalnaStampaPricingResponse
    | DigitalnaStampaPricingRow[];

  if (!Array.isArray(json) && json.success === false) {
    throw new Error("Backend returned success=false");
  }

  const rows = Array.isArray(json) ? json : (json.data ?? []);
  const mappedPrices = createEmptyPrices();
  let laminationSetup = 0;
  let laminationPerSide = 0;

  rows.forEach((row) => {
    const priceType = row.price_type ?? row.priceType;

    if (priceType === "printing") {
      const printType = row.print_type ?? row.printType ?? "";
      const quantityRange = row.quantity_range ?? row.quantityRange ?? "";
      const pricePerOtisak = Number(
        row.price_per_otisak ?? row.pricePerOtisak ?? 0,
      );

      if (isPrintTypeId(printType) && isQuantityRangeId(quantityRange)) {
        mappedPrices[printType][quantityRange] = pricePerOtisak;
      }
    }

    if (priceType === "plastification") {
      laminationSetup = Number(
        row.setup_price ?? row.setupPrice ?? laminationSetup,
      );
      laminationPerSide = Number(
        row.lamination_per_side ?? row.laminationPerSide ?? laminationPerSide,
      );
    }
  });

  return {
    prices: mappedPrices,
    laminationSetup,
    laminationPerSide,
  };
}
