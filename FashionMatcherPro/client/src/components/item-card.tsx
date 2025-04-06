import { useState } from "react";
import { Heart, Info, ShoppingBag, ExternalLink, Plus, X, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { useOutfit } from "@/contexts/outfit-context";
import { type ClothingItem, type ExternalUrls } from "@shared/schema";
import { formatPrice, colorToTailwindClass } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { SiAmazon, SiFlipkart, SiShopify } from "react-icons/si";

interface ItemCardProps {
  item: ClothingItem;
  matchQuality?: string;
  matchScore?: number;
  inOutfit?: boolean;
  onReplaceItem?: () => void;
  onRemoveItem?: () => void;
}

export default function ItemCard({ 
  item, 
  matchQuality,
  matchScore,
  inOutfit = false,
  onReplaceItem,
  onRemoveItem
}: ItemCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem, removeItem } = useOutfit();
  const { toast } = useToast();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${item.name} has been ${isFavorite ? "removed from" : "added to"} your favorites.`,
      duration: 2000,
    });
  };

  const handleAddToOutfit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(item);
    
    toast({
      title: "Added to outfit",
      description: `${item.name} has been added to your outfit.`,
      duration: 2000,
    });
  };

  return (
    <Card className="relative overflow-hidden h-full transition-all duration-200 hover:shadow-lg hover:border-primary/40">
      {/* Favorite Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-gray-200",
          isFavorite ? "text-rose-500" : "text-gray-500 hover:text-rose-500"
        )}
        onClick={handleFavoriteClick}
      >
        <Heart className={cn(isFavorite ? "fill-current" : "")} size={16} />
      </Button>
      
      {/* Match Quality Badge */}
      {matchQuality && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className={matchQualityToBgColor(matchQuality)}>
            {matchQuality}
          </Badge>
        </div>
      )}
      
      {/* Item Image */}
      <Link href={`/item/${item.id}`} className="block">
        <div className="w-full h-48 md:h-64 overflow-hidden group">
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      
      {/* Item Details */}
      <CardContent className="p-4">
        <Link href={`/item/${item.id}`} className="block">
          <h3 className="font-medium text-gray-800 hover:text-primary transition-colors">{item.name}</h3>
        </Link>
        <div className="flex justify-between items-center mt-2">
          <span className="font-semibold bg-gradient-to-r from-primary to-rose-500 bg-clip-text text-transparent">{formatPrice(item.price)}</span>
          <div className="flex items-center gap-1">
            <span className={cn("h-4 w-4 rounded-full border border-gray-200", colorToTailwindClass(item.color))}></span>
            <span className="text-xs text-gray-500">{item.color}</span>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {item.style && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{item.style}</span>
          )}
          {item.occasion && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{item.occasion}</span>
          )}
        </div>
        
        {/* Match Score Progress Bar */}
        {matchScore !== undefined && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium">Match Percentage</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Info size={12} className="text-gray-400" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">How well this item matches with your current outfit</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-xs font-semibold">{Math.round(matchScore * 100)}%</span>
            </div>
            <Progress
              value={matchScore * 100}
              className={cn(
                "h-2", 
                matchScore > 0.8 ? "bg-gray-100 [&>div]:bg-green-500" : 
                matchScore > 0.6 ? "bg-gray-100 [&>div]:bg-blue-500" : 
                matchScore > 0.4 ? "bg-gray-100 [&>div]:bg-amber-500" : 
                "bg-gray-100 [&>div]:bg-gray-500"
              )}
            />
          </div>
        )}
      </CardContent>
      
      {/* Card Footer with Action Buttons */}
      <CardFooter className="p-4 pt-0 gap-2">
        {inOutfit ? (
          // Actions for items already in the outfit
          <div className="flex w-full gap-2 mt-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1"
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (onReplaceItem) {
                        onReplaceItem();
                      }
                    }}
                  >
                    <RefreshCw size={16} className="mr-2" />
                    Replace
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Replace this item with another one</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (onRemoveItem) {
                        onRemoveItem();
                      } else {
                        removeItem(item.id);
                        toast({
                          title: "Removed from outfit",
                          description: `${item.name} has been removed from your outfit.`,
                          duration: 2000,
                        });
                      }
                    }}
                  >
                    <X size={16} className="mr-2" />
                    Remove
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Remove this item from your outfit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : (
          // Actions for items not in the outfit
          <div className="flex w-full gap-2">
            <Button 
              size="sm" 
              className="flex-1 mt-2 bg-gradient-to-r from-primary to-rose-500 hover:from-primary/90 hover:to-rose-500/90 transition-all"
              onClick={handleAddToOutfit}
            >
              <Plus size={16} className="mr-2" />
              Add to Outfit
            </Button>
            
            {/* Shopping Button */}
            <Button 
              size="sm" 
              variant="outline" 
              className="mt-2"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                toast({
                  title: "Shopping options",
                  description: `View ${item.name} on your favorite shopping sites.`,
                  duration: 2000,
                });
              }}
            >
              <ShoppingBag size={16} className="mr-2" />
              Shop
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

function matchQualityToBgColor(quality: string): string {
  switch (quality) {
    case "Perfect Match":
      return "bg-green-500 text-white";
    case "Great Match":
      return "bg-blue-500 text-white";
    case "Good Match":
      return "bg-amber-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}
