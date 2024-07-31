import { Apple, ChevronDown, ChevronUp } from "lucide-react";

export const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "IDR",
    label: "Rp.",
  }
];

export const types = [
  {
    value: "income",
    label: "Income",
    icon: ChevronDown,
  },
  {
    value: "expense",
    label: "Expense",
    icon: ChevronUp,
  },
];

export const categories = [
  {
    label: "Food",
    value: "food",
    icon: Apple,
  },
];
