import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges standard classnames with Tailwind utilities.
 * @param {ClassValue[]} inputs - Array of class names to merge
 * @returns {string} Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}