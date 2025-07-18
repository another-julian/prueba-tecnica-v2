import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";

/**
 * Combina clases de Tailwind de forma segura, incluso si hay duplicadas.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
