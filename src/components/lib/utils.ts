import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Captures 0x + `chars - 2` characters, then the last `chars` characters.
const truncateRegex = (chars = 4) => new RegExp(`^([a-zA-Z0-9]{${chars}})[a-zA-Z0-9]+([a-zA-Z0-9]{${chars}})$`);

/**
 * Truncates an address to the format 0x0000…0000, preserving the first and last `chars` characters.
 *
 * @param address Full address to truncate.
 * @param chars Number of characters to keep at the start and end of the address (default is 4).
 * @returns Truncated address with `…` in the middle. Returns the original address if it doesn't match the expected format.
 */
export const formatShortAddress = (address?: string, chars = 4) => {
  if (!address) {
    return "0x0";
  }
  const match = address.match(truncateRegex(chars));
  if (!match) {
    return address;
  }

  return `${match[1]}…${match[2]}`;
};
