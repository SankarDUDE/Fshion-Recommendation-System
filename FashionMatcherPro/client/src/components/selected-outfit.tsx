import { useState, useEffect } from "react";
import { useOutfit } from "@/contexts/outfit-context";
import { 
  Shirt, 
  Pocket, 
  ShoppingBag, 
  Share2, 
  Save,
  Trash2,
  RefreshCw 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter,
  CardDescription
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import ItemCard from "@/components/item-card";
import { calculateMatchScore, getMatchQuality } from "@/lib/matching";
import { useAuth } from "@/hooks/use-auth";

export default function SelectedOutfit() {
  const { selectedItems, getItemByCategory, removeItem, clearOutfit } = useOutfit();
  const [matchPercentage, setMatchPercentage] = useState(0);
  const [matchQuality, setMatchQuality] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();
  
  const topItem = getItemByCategory("tops");
  const bottomItem = getItemByCategory("pants") || getItemByCategory("skirts");
  const shoesItem = getItemByCategory("shoes");
  const accessoryItem = getItemByCategory("accessories");
  const outerwearItem = getItemByCategory("outerwear");
  
  // Calculate compatibility percentage when items change
  useEffect(() => {
    if (selectedItems.length < 2) {
      setMatchPercentage(0);
      setMatchQuality("");
      return;
    }
    
    // Calculate average match score between all selected items
    let totalScore = 0;
    let pairCount = 0;
    
    for (let i = 0; i < selectedItems.length; i++) {
      for (let j = i + 1; j < selectedItems.length; j++) {
        totalScore += calculateMatchScore(selectedItems[i], selectedItems[j]);
        pairCount++;
      }
    }
    
    const avgScore = pairCount > 0 ? totalScore / pairCount : 0;
    const percentage = Math.min(Math.round(avgScore), 100);
    
    setMatchPercentage(percentage);
    
    // Set match quality text based on percentage
    if (percentage >= 80) {
      setMatchQuality("Perfect Match");
    } else if (percentage >= 65) {
      setMatchQuality("Great Match");
    } else if (percentage >= 50) {
      setMatchQuality("Good Match");
    } else if (percentage > 0) {
      setMatchQuality("Basic Match");
    } else {
      setMatchQuality("");
    }
  }, [selectedItems]);
  
  // Get color for match quality
  const getMatchColor = () => {
    if (matchPercentage >= 80) return "bg-green-500";
    if (matchPercentage >= 65) return "bg-blue-500";
    if (matchPercentage >= 50) return "bg-amber-500";
    return "bg-gray-500";
  };
  
  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Your Selected Outfit</CardTitle>
          <CardDescription>
            {selectedItems.length === 0 
              ? "Start building your outfit by adding items"
              : `${selectedItems.length} item${selectedItems.length > 1 ? 's' : ''} selected`}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    clearOutfit();
                    toast({
                      title: "Outfit cleared",
                      description: "Your outfit has been cleared. Start building a new one!",
                      duration: 2000,
                    });
                  }}
                  disabled={selectedItems.length === 0}
                >
                  <Trash2 size={16} className="mr-2" />
                  Clear
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Clear all items from the outfit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {user && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={selectedItems.length < 2}
                    onClick={() => {
                      toast({
                        title: "Outfit saved",
                        description: "Your outfit has been saved to your account.",
                        duration: 2000,
                      });
                    }}
                  >
                    <Save size={16} className="mr-2" />
                    Save
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Save this outfit to your favorites</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topItem ? (
            <ItemCard 
              item={topItem} 
              inOutfit={true}
              onRemoveItem={() => {
                removeItem(topItem.id);
                toast({
                  title: "Item removed",
                  description: `${topItem.name} has been removed from your outfit.`,
                  duration: 2000,
                });
              }}
            />
          ) : (
            <EmptySlot 
              title="Select a top" 
              icon={<Shirt className="w-12 h-12 text-gray-500" />} 
              message="Select a top to start creating your outfit" 
            />
          )}
          
          {bottomItem ? (
            <ItemCard 
              item={bottomItem} 
              inOutfit={true}
              onRemoveItem={() => {
                removeItem(bottomItem.id);
                toast({
                  title: "Item removed",
                  description: `${bottomItem.name} has been removed from your outfit.`,
                  duration: 2000,
                });
              }}
            />
          ) : (
            <EmptySlot 
              title="Select bottoms" 
              icon={<Pocket className="w-12 h-12 text-gray-500" />} 
              message="Add pants or a skirt to your outfit" 
            />
          )}
          
          {shoesItem ? (
            <ItemCard 
              item={shoesItem} 
              inOutfit={true}
              onRemoveItem={() => {
                removeItem(shoesItem.id);
                toast({
                  title: "Item removed",
                  description: `${shoesItem.name} has been removed from your outfit.`,
                  duration: 2000,
                });
              }}
            />
          ) : (
            <EmptySlot 
              title="Select footwear" 
              icon={<ShoppingBag className="w-12 h-12 text-gray-500" />} 
              message="Complete your look with footwear" 
            />
          )}
        </div>
        
        {/* Additional items (accessories, outerwear, etc.) */}
        {(accessoryItem || outerwearItem) && (
          <>
            <Separator className="my-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {accessoryItem && (
                <ItemCard 
                  item={accessoryItem} 
                  inOutfit={true}
                  onRemoveItem={() => {
                    removeItem(accessoryItem.id);
                    toast({
                      title: "Item removed",
                      description: `${accessoryItem.name} has been removed from your outfit.`,
                      duration: 2000,
                    });
                  }}
                />
              )}
              
              {outerwearItem && (
                <ItemCard 
                  item={outerwearItem} 
                  inOutfit={true}
                  onRemoveItem={() => {
                    removeItem(outerwearItem.id);
                    toast({
                      title: "Item removed",
                      description: `${outerwearItem.name} has been removed from your outfit.`,
                      duration: 2000,
                    });
                  }}
                />
              )}
            </div>
          </>
        )}
      </CardContent>
      
      {selectedItems.length >= 2 && (
        <CardFooter className="flex flex-col border-t pt-6">
          <div className="w-full mb-2 flex justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">Outfit Compatibility</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 cursor-help">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">How well these items work together based on colors, styles, and occasions</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="font-semibold">{matchPercentage}%</span>
          </div>
          <div className="w-full">
            <Progress 
              value={matchPercentage} 
              className={`h-3 ${getMatchColor()}`} 
            />
          </div>
          <div className="w-full mt-2 flex justify-between items-center">
            <span className={`text-sm font-medium ${
              matchPercentage >= 80 ? 'text-green-600' : 
              matchPercentage >= 65 ? 'text-blue-600' : 
              matchPercentage >= 50 ? 'text-amber-600' : 
              'text-gray-600'
            }`}>
              {matchQuality}
            </span>
            
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={selectedItems.length < 2}
                      onClick={() => {
                        toast({
                          title: "Outfit shared",
                          description: "A link to your outfit has been copied to clipboard.",
                          duration: 2000,
                        });
                      }}
                    >
                      <Share2 size={16} className="mr-2" />
                      Share
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Share this outfit with friends</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Button 
                variant="default"
                size="sm"
                className="bg-gradient-to-r from-primary to-rose-500 hover:from-primary/90 hover:to-rose-500/90 transition-all"
                disabled={selectedItems.length < 2}
                onClick={() => {
                  toast({
                    title: "Outfit shop",
                    description: "You can now shop all items in this outfit.",
                    duration: 2000,
                  });
                }}
              >
                <ShoppingBag size={16} className="mr-2" />
                Shop this outfit
              </Button>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

interface EmptySlotProps {
  title: string;
  icon: React.ReactNode;
  message: string;
}

function EmptySlot({ title, icon, message }: EmptySlotProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center h-60 md:h-80">
      <div className="mb-3">
        {icon}
      </div>
      <p className="text-gray-500 text-center">{message}</p>
    </div>
  );
}
