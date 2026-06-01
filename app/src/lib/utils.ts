import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getScoreColor(score: number): string {
  if (score >= 95) return "#22c55e"
  if (score >= 85) return "#84cc16"
  if (score >= 75) return "#fbbf24"
  if (score >= 65) return "#f97316"
  return "#ef4444"
}

export function openInMapsUrl(name: string, location: string): string {
  const query = encodeURIComponent(`${name} ${location}`)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

/**
 * Validate that a URL string is safe to use as an `href`.
 * Rejects javascript: data: and other dangerous protocols.
 */
export function validateUrl(url: string): string | null {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  // Allow http:, https:, tel:, and mailto:
  if (/^(https?:|tel:|mailto:)/i.test(trimmed)) return trimmed;
  // If it looks like a domain without protocol, prepend https://
  if (/^[a-z0-9][-a-z0-9]*\.[a-z]{2,}/i.test(trimmed)) return `https://${trimmed}`;
  return null;
}

/**
 * Escape a string for safe inclusion in a CSV cell.
 * Also prefixes with a single quote to prevent formula injection in spreadsheets.
 */
export function escapeCSV(value: string): string {
  const sanitized = value.replace(/\r/g, "");
  if (sanitized.includes('"') || sanitized.includes(",") || sanitized.includes("\n") || sanitized.startsWith("=") || sanitized.startsWith("+") || sanitized.startsWith("-") || sanitized.startsWith("@")) {
    return `"${sanitized.replace(/"/g, '""')}"`;
  }
  return sanitized;
}
