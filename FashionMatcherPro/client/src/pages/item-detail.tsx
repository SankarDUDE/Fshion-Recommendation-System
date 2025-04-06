import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type ClothingItem } from "@shared/schema";
import Header from "@/components/header";
import CategoryTabs from "@/components/category-tabs";
import Footer from "@/components/footer";
import ItemCarousel from "@/components/item-carousel";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useOutfit } from "@/contexts/outfit-context";
import { colorToTailwindClass, formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiAmazon, SiFlipkart, SiShopify } from "react-icons/si";

export default function ItemDetailPage() {
  const [, params] = useRoute("/item/:id");
  const itemId = parseInt(params?.id || "0");
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  const { addItem } = useOutfit();

  // Fetch item details
  const { data: item, isLoading } = useQuery<ClothingItem>({
    queryKey: [`/api/clothing/${itemId}`],
    enabled: !!itemId && !isNaN(itemId)
  });

  // Fetch recommended items
  const { data: recommendations = [], isLoading: isLoadingRecommendations } = useQuery({
    queryKey: [`/api/recommendations/match/${itemId}`],
    enabled: !!itemId && !isNaN(itemId)
  });

  const handleAddToOutfit = () => {
    if (item) {
      addItem(item);
      toast({
        title: "Added to outfit",
        description: `${item.name} has been added to your outfit.`,
        duration: 2000,
      });
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${item?.name} has been ${isFavorite ? "removed from" : "added to"} your favorites.`,
      duration: 2000,
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <CategoryTabs />
        <main className="container mx-auto px-4 py-6 flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="pt-4">
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <CategoryTabs />
        <main className="container mx-auto px-4 py-6 flex-grow flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Item Not Found</h1>
            <p className="text-gray-600 mb-6">The item you are looking for does not exist or has been removed.</p>
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <CategoryTabs />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        {/* Item Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Item Image */}
          <div className="rounded-lg overflow-hidden">
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Item Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h1>
            <p className="text-xl text-primary font-semibold mb-4">{formatPrice(item.price)}</p>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">{item.description}</p>
              
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-sm font-medium text-gray-600">Color:</span>
                <span 
                  className={cn(
                    "h-6 w-6 rounded-full", 
                    colorToTailwindClass(item.color)
                  )}
                ></span>
                <span className="capitalize">{item.color}</span>
              </div>
              
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-sm font-medium text-gray-600">Style:</span>
                <span className="capitalize">{item.style.replace('_', ' ')}</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-600">Occasion:</span>
                <span className="capitalize">{item.occasion}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                className="flex-1" 
                onClick={handleAddToOutfit}
              >
                Add to Outfit
              </Button>
              
              <Button 
                variant="outline" 
                className={cn(
                  "min-w-[44px]",
                  isFavorite && "text-rose-500"
                )}
                onClick={handleToggleFavorite}
              >
                <Heart className={cn(isFavorite && "fill-rose-500")} size={20} />
                {!isFavorite && <span className="ml-2">Add to Favorites</span>}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Shopping Links Section */}
        {item.externalUrls && Object.keys(item.externalUrls as Record<string, string>).length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4">Buy This Item Online</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(item.externalUrls as any).amazon && (
                <Card className="hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <SiAmazon className="mr-2 h-5 w-5" />
                      Amazon
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <Button 
                      onClick={() => window.open((item.externalUrls as any).amazon, '_blank')}
                      className="w-full"
                      variant="outline"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Shop Now
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              {(item.externalUrls as any).flipkart && (
                <Card className="hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <SiFlipkart className="mr-2 h-5 w-5" />
                      Flipkart
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <Button 
                      onClick={() => window.open((item.externalUrls as any).flipkart, '_blank')}
                      className="w-full"
                      variant="outline"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Shop Now
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              {(item.externalUrls as any).myntra && (
                <Card className="hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <span className="mr-2 w-5 h-5 flex items-center justify-center font-bold">M</span>
                      Myntra
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <Button 
                      onClick={() => window.open((item.externalUrls as any).myntra, '_blank')}
                      className="w-full"
                      variant="outline"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Shop Now
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              {(item.externalUrls as any).ajio && (
                <Card className="hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <span className="mr-2 w-5 h-5 flex items-center justify-center font-bold">A</span>
                      Ajio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <Button 
                      onClick={() => window.open((item.externalUrls as any).ajio, '_blank')}
                      className="w-full"
                      variant="outline"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Shop Now
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
        
        {/* Recommended Items */}
        <ItemCarousel 
          title={`Items That Match With ${item.name}`}
          items={recommendations as any}
        />
      </main>
      
      <Footer />
    </div>
  );
}
