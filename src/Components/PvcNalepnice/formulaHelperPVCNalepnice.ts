const positiveNumberOrOneDecimal = /^(\d+(\.\d{1})?)$/;
const positiveInteger = /^[1-9]\d*$/;

interface PvcPriceTierRow {
  min_surface_m2?: number;
  max_surface_m2?: number | null;
  price_per_m2?: number;
  minimum_order_net?: number;
  minSurfaceM2?: number;
  maxSurfaceM2?: number | null;
  pricePerM2?: number;
  minimumOrderNet?: number;
}

interface PvcPriceTier {
  minSurfaceM2: number;
  maxSurfaceM2: number | null;
  pricePerM2: number;
  minimumOrderNet: number;
}

interface PvcPriceResponse {
  success?: boolean;
  data?: PvcPriceTierRow[];
}

async function fetchPvcNalepnicePrices(): Promise<PvcPriceTier[]> {
  const mainLink = process.env.REACT_APP_MAINLINK;
  if (!mainLink) {
    throw new Error("REACT_APP_MAINLINK is not defined");
  }

  const response = await fetch(`${mainLink}/pvc-nalepnice-prices`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const json = (await response.json()) as PvcPriceResponse | PvcPriceTierRow[];
  if (!Array.isArray(json) && json.success === false) {
    throw new Error("Backend returned success=false");
  }

  const rows = Array.isArray(json) ? json : (json.data ?? []);

  return rows
    .map((row) => ({
      minSurfaceM2: Number(row.min_surface_m2 ?? row.minSurfaceM2 ?? 0),
      maxSurfaceM2: row.max_surface_m2 ?? row.maxSurfaceM2 ?? null,
      pricePerM2: Number(row.price_per_m2 ?? row.pricePerM2 ?? 0),
      minimumOrderNet: Number(
        row.minimum_order_net ?? row.minimumOrderNet ?? 1000,
      ),
    }))
    .sort((a, b) => a.minSurfaceM2 - b.minSurfaceM2);
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

  return (Number(height) * Number(width) * Number(quantity)) / 10000;
}

function getMatchedTier(surface: number, tiers: PvcPriceTier[]): PvcPriceTier {
  const matchedTier = tiers.find(
    (tier) =>
      surface >= tier.minSurfaceM2 &&
      (tier.maxSurfaceM2 === null || surface < Number(tier.maxSurfaceM2)),
  );

  if (!matchedTier) {
    throw new Error("Pricing tier not found for entered dimensions");
  }

  return matchedTier;
}
type PriceDetails = {
  priceNet: number | string;
  pricePerPc: number | string;
  priceGross: number | string | null;
  moq: number | null;
};
function calculatePrice(
  values: FormValues,
  tiers: PvcPriceTier[],
): PriceDetails {
  const quantity = Number(values.quantity);
  const surface = calculateSurface(values);
  const matchedTier = getMatchedTier(surface, tiers);
  const minimumOrderNet = matchedTier.minimumOrderNet;
  let priceNet = surface * matchedTier.pricePerM2;
  let pricePerPc = priceNet / quantity;
  pricePerPc = parseFloat(pricePerPc.toFixed(2));
  if (priceNet >= minimumOrderNet) {
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
    const moq = Math.round(minimumOrderNet / pricePerPc);
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

export { validateFormValues, calculatePrice, fetchPvcNalepnicePrices };
export type { PriceDetails, PvcPriceTier };
