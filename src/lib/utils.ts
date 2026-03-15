import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-family": [{ font: ["sans", "display"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
