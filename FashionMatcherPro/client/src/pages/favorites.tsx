import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type ClothingItem, type Outfit } from "@shared/schema";
import Header from "@/components/header";
import CategoryTabs from "@/components/category-tabs";
import Footer from "@/components/footer";
import ItemCard from "@/components/item-card";
import OutfitCard from "@/components/outfit-card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

// This is a mock implementation since we don't have a real favorites system yet
export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState("items");
  
  // Fetch all items to simulate favorites
  const { data: allItems = [], isLoading: isLoadingItems } = useQuery<ClothingItem[]>({
    queryKey: ["/api/clothing"],
  });

  // Fetch all outfits to simulate favorites
  const { data: allOutfits = [], isLoading: isLoadingOutfits } = useQuery<Outfit[]>({
    queryKey: ["/api/outfits"],
  });

  // Simulate favorite items (first few items)
  const favoriteItems = allItems.slice(0, 5);
  
  // Simulate favorite outfits (first couple outfits)
  const favoriteOutfits = allOutfits.slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <CategoryTabs />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
        
        <Tabs defaultValue="items" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="items">Individual Items</TabsTrigger>
            <TabsTrigger value="outfits">Complete Outfits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="items">
            {isLoadingItems ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {Array(4).fill(0).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton className="h-60 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : favoriteItems.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {favoriteItems.map(item => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">No favorite items yet</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Browse our collection and add items to your favorites to see them here.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="outfits">
            {isLoadingOutfits ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(3).fill(0).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton className="h-60 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : favoriteOutfits.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteOutfits.map(outfit => (
                  <OutfitCard key={outfit.id} outfit={outfit} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">No favorite outfits yet</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Add complete outfits to your favorites to see them here.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}
