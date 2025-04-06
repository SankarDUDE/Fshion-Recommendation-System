import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { type ClothingItem } from "@shared/schema";
import Header from "@/components/header";
import CategoryTabs from "@/components/category-tabs";
import ItemCard from "@/components/item-card";
import Footer from "@/components/footer";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryPage() {
  const [, params] = useRoute("/category/:category");
  const category = params?.category || "all";
  const [sortOption, setSortOption] = useState("popular");

  // Fetch items by category
  const { data: items = [], isLoading } = useQuery<ClothingItem[]>({
    queryKey: ["/api/clothing"],
    select: (data) => {
      if (category === "all") {
        return data;
      }
      return data.filter(item => item.category === category);
    }
  });

  // Sort items based on selection
  const sortedItems = [...items].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      case "price-high":
        return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
      case "popular":
      default:
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    }
  });

  // Get category display name
  const getCategoryDisplayName = () => {
    switch (category) {
      case "tops": return "Tops & Shirts";
      case "pants": return "Pants & Jeans";
      case "dresses": return "Dresses";
      case "outerwear": return "Outerwear";
      case "accessories": return "Accessories";
      case "shoes": return "Shoes";
      default: return "All Items";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <CategoryTabs />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{getCategoryDisplayName()}</h1>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <Select 
              value={sortOption} 
              onValueChange={setSortOption}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Popularity</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array(8).fill(0).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-60 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : sortedItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {sortedItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No items found</h3>
            <p className="mt-2 text-sm text-gray-500">
              We couldn't find any items in this category. Please try another category.
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
