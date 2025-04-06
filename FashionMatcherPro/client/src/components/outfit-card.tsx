import { useState } from "react";
import { type Outfit, type ClothingItem } from "@shared/schema";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";

interface OutfitCardProps {
  outfit: Outfit;
}

export default function OutfitCard({ outfit }: OutfitCardProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Fetch the items that make up this outfit
  const { data: outfitItems = [] } = useQuery<ClothingItem[]>({
    queryKey: [`/api/clothing`],
    select: (data) => {
      // Filter the items that are part of this outfit
      return data.filter(item => outfit.items.includes(String(item.id)));
    }
  });

  const handleAddToFavorites = () => {
    setLoading(true);
    
    // Simulate API call for adding to favorites
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Added to Favorites",
        description: `${outfit.name} has been added to your favorites.`,
        duration: 3000,
      });
    }, 500);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>{outfit.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="grid grid-cols-3 gap-2">
          {outfitItems.map((item, index) => (
            <div key={index} className="rounded-md overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-28 object-cover"
              />
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-2">
        <span className="text-primary font-semibold">{outfit.totalPrice}</span>
        <Button 
          onClick={handleAddToFavorites}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add to Favorites"}
        </Button>
      </CardFooter>
    </Card>
  );
}
