import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ItemCard from "@/components/item-card";
import { type ClothingItem } from "@shared/schema";
import { Link } from "wouter";

interface ItemCarouselProps {
  title: string;
  items: Array<{
    item: ClothingItem;
    score?: number;
    quality?: string;
  }>;
  viewAllLink?: string;
}

export default function ItemCarousel({ title, items, viewAllLink }: ItemCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10); // -10 to account for potential rounding errors
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      // Initial check in case there are items already
      checkScroll();
      
      return () => scrollContainer.removeEventListener('scroll', checkScroll);
    }
  }, [items]);

  // Update scroll buttons when window resizes
  useEffect(() => {
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-500 mt-1">
            {items.length > 0 ? `${items.length} items available` : "No items available"}
          </p>
        </div>
        {viewAllLink && (
          <Link href={viewAllLink} className="flex items-center gap-1 text-primary font-medium hover:text-primary/80 transition-colors">
            See all <ArrowRight size={16} />
          </Link>
        )}
      </div>
      
      <div className="relative">
        {showLeftButton && (
          <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 z-10">
            <Button 
              variant="outline"
              size="icon"
              onClick={scrollLeft}
              className="bg-white/90 backdrop-blur-sm rounded-full shadow-md h-10 w-10 border border-gray-200 hover:bg-white hover:border-primary/20"
            >
              <ChevronLeft size={20} />
            </Button>
          </div>
        )}
        
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide py-2 pb-4 -mx-2"
          style={{ scrollbarWidth: 'none', scrollBehavior: 'smooth' }}
        >
          <div className="flex space-x-6 px-2">
            {items.map((item, index) => (
              <div key={index} className="w-60 md:w-64 flex-shrink-0">
                <ItemCard 
                  item={item.item} 
                  matchQuality={item.quality}
                  matchScore={item.score ? item.score / 100 : undefined}
                />
              </div>
            ))}
            
            {/* Show placeholder if no items */}
            {items.length === 0 && (
              <div className="w-full p-12 text-center">
                <p className="text-gray-500">No items available</p>
              </div>
            )}
          </div>
        </div>
        
        {showRightButton && (
          <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
            <Button 
              variant="outline"
              size="icon"
              onClick={scrollRight}
              className="bg-white/90 backdrop-blur-sm rounded-full shadow-md h-10 w-10 border border-gray-200 hover:bg-white hover:border-primary/20"
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
