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

// Cene: po otisku, u din bez PDV-a – POPUNI vrednosti:
export const prices: Record<PrintTypeId, Record<QuantityRangeId, number>> = {
  "4-0": {
    "1-10": 100,
    "11-50": 85,
    "51-100": 68,
    "101-250": 58,
    "251-500": 48,
    "500+": 40,
  },
  "4-4": {
    "1-10": 150,
    "11-50": 120,
    "51-100": 100,
    "101-250": 85,
    "251-500": 65,
    "500+": 60,
  },
  "4-1": {
    "1-10": 130,
    "11-50": 110,
    "51-100": 85,
    "101-250": 71,
    "251-500": 55,
    "500+": 50,
  },
  "1-0": {
    "1-10": 33,
    "11-50": 28,
    "51-100": 27,
    "101-250": 24,
    "251-500": 22,
    "500+": 20,
  },
  "1-1": {
    "1-10": 46,
    "11-50": 38,
    "51-100": 35,
    "101-250": 32,
    "251-500": 30,
    "500+": 27,
  },
};
