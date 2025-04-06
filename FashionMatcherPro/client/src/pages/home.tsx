import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type ClothingItem, type Outfit } from "@shared/schema";
import Header from "@/components/header";
import CategoryTabs from "@/components/category-tabs";
import SelectedOutfit from "@/components/selected-outfit";
import ItemCarousel from "@/components/item-carousel";
import OutfitCard from "@/components/outfit-card";
import FilterSection from "@/components/filter-section";
import ItemCard from "@/components/item-card";
import Footer from "@/components/footer";
import { useOutfit } from "@/contexts/outfit-context";

export default function Home() {
  const { selectedItems } = useOutfit();
  const [activeFilters, setActiveFilters] = useState({
    categories: ["tops"],
    colors: ["black"],
    occasions: ["casual"],
  });
  
  // Fetch all clothing items
  const { data: clothingItems = [], isLoading: isLoadingItems } = useQuery<ClothingItem[]>({
    queryKey: ["/api/clothing"],
  });

  // Fetch all outfits
  const { data: outfits = [], isLoading: isLoadingOutfits } = useQuery<Outfit[]>({
    queryKey: ["/api/outfits"],
  });

  // Get outfit components for recommendations
  const selectedPants = selectedItems.find(item => item.category === "pants");
  const selectedTop = selectedItems.find(item => item.category === "tops");
  const selectedShoes = selectedItems.find(item => item.category === "shoes");
  
  // Determine recommendation quality order
  const qualityOrder = {
    "Perfect Match": 0,
    "Great Match": 1,
    "Good Match": 2,
    "Suggested Item": 3
  };
  
  // Get recommended tops based on selected pants
  let recommendedTops = clothingItems
    .filter(item => item.category === "tops")
    .map(item => ({
      item,
      quality: selectedPants ? getMatchQuality(item, selectedPants) : "Suggested Item"
    }))
    .sort((a, b) => 
      qualityOrder[a.quality as keyof typeof qualityOrder] - 
      qualityOrder[b.quality as keyof typeof qualityOrder]
    );
  
  // Get recommended footwear based on the outfit
  let recommendedFootwear = clothingItems
    .filter(item => item.category === "shoes")
    .map(item => {
      // If we have both top and pants, give a combined match score
      if (selectedTop && selectedPants) {
        const topQuality = getMatchQuality(item, selectedTop);
        const pantsQuality = getMatchQuality(item, selectedPants);
        // Use the better match quality for UI display
        return {
          item,
          quality: qualityOrder[topQuality as keyof typeof qualityOrder] <= 
                   qualityOrder[pantsQuality as keyof typeof qualityOrder] ? topQuality : pantsQuality
        };
      } 
      // If we have just one item, match with that
      else if (selectedTop) {
        return {
          item,
          quality: getMatchQuality(item, selectedTop)
        };
      }
      else if (selectedPants) {
        return {
          item,
          quality: getMatchQuality(item, selectedPants)
        };
      }
      // If no outfit items selected, show as suggested
      else {
        return {
          item,
          quality: "Suggested Item"
        };
      }
    })
    .sort((a, b) => 
      qualityOrder[a.quality as keyof typeof qualityOrder] - 
      qualityOrder[b.quality as keyof typeof qualityOrder]
    );

  // Get popular items
  const popularItems = clothingItems.filter(item => item.isPopular);
  
  // Handle filter changes
  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <CategoryTabs />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary/5 to-rose-500/5 border-b border-gray-200">
        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-rose-500 bg-clip-text text-transparent">
                Fashion Meets Technology
              </span>
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              Build the perfect outfit with our AI-powered recommendations based on color, style, and occasion compatibility.
            </p>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Selected Outfit Section */}
        <section className="mb-12">
          <SelectedOutfit />
        </section>
        
        {/* Recommended Tops */}
        <section className="mb-12">
          <ItemCarousel 
            title="Recommended Tops" 
            items={recommendedTops.map(item => ({
              item: item.item,
              quality: item.quality
            }))}
            viewAllLink="/category/tops"
          />
        </section>
        
        {/* Recommended Footwear */}
        <section className="mb-12">
          <ItemCarousel 
            title="Recommended Footwear" 
            items={recommendedFootwear.map(item => ({
              item: item.item,
              quality: item.quality
            }))}
            viewAllLink="/category/shoes"
          />
        </section>
        
        {/* Complete Your Look - Outfits */}
        <section className="mb-12 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Complete Your Look</h2>
              <p className="text-gray-500 mt-1">Curated outfits based on latest trends</p>
            </div>
            <div className="text-primary font-medium hover:text-primary/80 transition-colors cursor-pointer">
              View all outfits →
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outfits.slice(0, 3).map((outfit) => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        </section>
        
        {/* Filter Section */}
        <section className="mb-12">
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Your Perfect Match</h2>
            <FilterSection onFilterChange={handleFilterChange} />
          </div>
        </section>
        
        {/* Trending Items */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Trending Now</h2>
              <p className="text-gray-500 mt-1">Popular items based on customer favorites</p>
            </div>
            <div className="text-primary font-medium hover:text-primary/80 transition-colors cursor-pointer">
              View all trending →
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {popularItems.slice(0, 8).map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

// Function to determine match quality (simple version for the UI)
function getMatchQuality(item1: ClothingItem, item2: ClothingItem): string {
  // For the UI, we just need to simulate match quality
  // The real matching algorithm is on the server
  
  // Simple color matches for UI demonstration
  const colorMatches: Record<string, string[]> = {
    black: ["white", "gray", "blue", "red"],
    white: ["black", "blue", "red"],
    denim: ["white", "black", "red"],
  };
  
  // Simple logic for UI demonstration
  if (item1.color === item2.color) {
    return "Good Match";
  } else if (colorMatches[item2.color]?.includes(item1.color)) {
    return "Perfect Match";
  } else {
    return "Good Match";
  }
}
