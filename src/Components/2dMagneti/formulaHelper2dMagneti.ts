const pricePerSqCm = 1.4; // din per cm^2

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
  width: string | number,
  height: string | number,
): Result {
  const surface = calculateSurface(width, height);
  const priceNet = Number(roundToTwo(calculatePrice(surface, pricePerSqCm)));

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

export { calculateResult, validateForm };
export type { Result };
