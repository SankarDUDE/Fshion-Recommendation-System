import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Match quality badge color mapping
export function getMatchQualityColor(quality: string): string {
  switch (quality) {
    case "Perfect Match":
      return "bg-green-500"; // success
    case "Great Match":
      return "bg-blue-500"; // primary
    case "Good Match":
      return "bg-amber-500"; // warning
    default:
      return "bg-gray-500"; // neutral
  }
}

// Format price string for consistent display
export function formatPrice(price: string): string {
  // Check if price is already in rupee format
  if (price.startsWith('₹')) {
    return price;
  }
  
  // If it's in dollar format, convert to rupee format (simple conversion just for display)
  if (price.startsWith('$')) {
    // Remove $ symbol and convert to number
    const dollarAmount = parseFloat(price.replace('$', '').replace(',', ''));
    // Convert to rupees (approximate exchange rate for demo)
    const rupeeAmount = Math.round(dollarAmount * 75);
    // Format with commas for thousands
    return `₹${rupeeAmount.toLocaleString('en-IN')}`;
  }
  
  // If no currency symbol, assume it's rupees
  return `₹${price}`;
}

// Convert color name to Tailwind class
export function colorToTailwindClass(color: string): string {
  const colorMap: Record<string, string> = {
    black: "bg-black",
    white: "bg-white border border-gray-300",
    gray: "bg-gray-500",
    blue: "bg-blue-600",
    navy: "bg-blue-900",
    red: "bg-red-600",
    pink: "bg-pink-500",
    green: "bg-green-600",
    khaki: "bg-yellow-700",
    brown: "bg-amber-800",
    denim: "bg-blue-800",
    purple: "bg-purple-600",
    yellow: "bg-yellow-500",
    orange: "bg-orange-500",
    silver: "bg-gray-300"
  };

  return colorMap[color.toLowerCase()] || "bg-gray-500";
}

// Get color name for display
export function getColorDisplayName(color: string): string {
  return color.charAt(0).toUpperCase() + color.slice(1);
}

// Check if two arrays have at least one common element
export function hasCommonElement(arr1: string[], arr2: string[]): boolean {
  return arr1.some(item => arr2.includes(item));
}
