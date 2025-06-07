import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, vat: number = 20): string {
  const totalPrice = price + (price * vat) / 100;
  return `£${totalPrice.toFixed(0)}`;
}

export function formatHirePeriod(days: number): string {
  return `${days} day${days > 1 ? "s" : ""} hire`;
}
