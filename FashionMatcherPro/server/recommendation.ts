import { type ClothingItem } from "@shared/schema";

// Color matching rules
const colorMatches: Record<string, string[]> = {
  black: ["white", "gray", "blue", "red", "pink"],
  white: ["black", "navy", "blue", "red", "gray", "brown"],
  gray: ["black", "white", "blue", "pink", "purple"],
  blue: ["white", "gray", "navy", "khaki", "brown"],
  navy: ["white", "gray", "blue", "khaki"],
  red: ["white", "black", "gray", "denim"],
  pink: ["white", "gray", "navy", "denim"],
  green: ["white", "black", "khaki", "brown"],
  khaki: ["navy", "white", "blue", "green", "brown"],
  brown: ["white", "blue", "khaki", "green"],
  denim: ["white", "black", "red", "pink"],
  purple: ["white", "gray", "black"],
  yellow: ["white", "navy", "gray"],
  orange: ["white", "navy", "blue", "gray"]
};

// Style matching criteria
const styleCompatibility: Record<string, string[]> = {
  casual: ["casual", "sporty"],
  formal: ["formal", "business"],
  business: ["formal", "business", "smart_casual"],
  party: ["party", "smart_casual"],
  sport: ["sporty", "casual"],
  smart_casual: ["business", "casual", "party"]
};

// Calculate match score between clothing items
export function calculateMatchScore(item1: ClothingItem, item2: ClothingItem): number {
  let score = 0;
  
  // Color matching (0-40 points)
  if (item1.color === item2.color) {
    // Same color - good for monochromatic looks
    score += 20;
  } else if (colorMatches[item1.color]?.includes(item2.color)) {
    // Colors are known to match well
    score += 40;
  }
  
  // Style matching (0-40 points)
  if (item1.style === item2.style) {
    // Same style - very coherent
    score += 40;
  } else if (styleCompatibility[item1.style]?.includes(item2.style)) {
    // Compatible styles
    score += 30;
  }
  
  // Occasion matching (0-20 points)
  if (item1.occasion === item2.occasion) {
    score += 20;
  }
  
  return score;
}

// Get match quality descriptor based on score
export function getMatchQuality(score: number): string {
  if (score >= 80) {
    return "Perfect Match";
  } else if (score >= 60) {
    return "Great Match";
  } else if (score >= 40) {
    return "Good Match";
  } else {
    return "Basic Match";
  }
}

// Function to sort items by match score with a reference item
export function getRecommendedMatches(
  referenceItem: ClothingItem, 
  candidateItems: ClothingItem[],
  limit: number = 10
): { item: ClothingItem; score: number; quality: string }[] {
  // Calculate scores for each candidate
  const scoredItems = candidateItems
    .filter(item => item.id !== referenceItem.id) // Don't recommend the same item
    .map(item => {
      const score = calculateMatchScore(referenceItem, item);
      const quality = getMatchQuality(score);
      return { item, score, quality };
    });
  
  // Sort by score (highest first) and limit results
  return scoredItems
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// Function to get complementary items for an outfit
export function getComplementaryItems(
  selectedItems: ClothingItem[],
  allItems: ClothingItem[],
  targetCategory: string,
  limit: number = 10
): { item: ClothingItem; score: number; quality: string }[] {
  // Filter items by target category
  const categoryItems = allItems.filter(item => item.category === targetCategory);
  
  // If no items are selected yet, just return some popular items from the category
  if (selectedItems.length === 0) {
    return categoryItems
      .filter(item => item.isPopular)
      .slice(0, limit)
      .map(item => ({ item, score: 50, quality: "Suggested Item" }));
  }
  
  // Calculate average score against all selected items
  const scoredItems = categoryItems
    .filter(item => !selectedItems.some(selected => selected.id === item.id))
    .map(item => {
      const totalScore = selectedItems.reduce(
        (sum, selected) => sum + calculateMatchScore(selected, item), 
        0
      );
      const avgScore = totalScore / selectedItems.length;
      const quality = getMatchQuality(avgScore);
      return { item, score: avgScore, quality };
    });
  
  // Sort by score (highest first) and limit results
  return scoredItems
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
