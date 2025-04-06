import { useState } from "react";
import { Check, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { cn, colorToTailwindClass } from "@/lib/utils";

interface FilterSectionProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  categories: string[];
  colors: string[];
  occasions: string[];
  priceRange: [number, number];
  styles: string[];
  brands: string[];
  sizes: string[];
  ratings: number[];
}

const categoryOptions = [
  { id: "tops", label: "Tops", count: 124 },
  { id: "pants", label: "Pants", count: 98 },
  { id: "dresses", label: "Dresses", count: 57 },
  { id: "shoes", label: "Shoes", count: 112 },
  { id: "accessories", label: "Accessories", count: 76 },
];

const colorOptions = [
  { id: "black", label: "Black" },
  { id: "white", label: "White" },
  { id: "gray", label: "Gray" },
  { id: "blue", label: "Blue" },
  { id: "red", label: "Red" },
  { id: "green", label: "Green" },
  { id: "yellow", label: "Yellow" },
  { id: "purple", label: "Purple" },
  { id: "pink", label: "Pink" },
  { id: "orange", label: "Orange" },
];

const occasionOptions = [
  { id: "casual", label: "Casual" },
  { id: "formal", label: "Formal" },
  { id: "business", label: "Business" },
  { id: "party", label: "Party" },
  { id: "sport", label: "Sport" },
];

const styleOptions = [
  { id: "casual", label: "Casual" },
  { id: "formal", label: "Formal" },
  { id: "streetwear", label: "Streetwear" },
  { id: "bohemian", label: "Bohemian" },
  { id: "vintage", label: "Vintage" },
  { id: "minimalist", label: "Minimalist" },
];

const brandOptions = [
  { id: "nike", label: "Nike" },
  { id: "adidas", label: "Adidas" },
  { id: "zara", label: "Zara" },
  { id: "hm", label: "H&M" },
  { id: "gucci", label: "Gucci" },
  { id: "levis", label: "Levi's" },
];

const sizeOptions = [
  { id: "xs", label: "XS" },
  { id: "s", label: "S" },
  { id: "m", label: "M" },
  { id: "l", label: "L" },
  { id: "xl", label: "XL" },
  { id: "xxl", label: "XXL" },
];

const ratingOptions = [
  { id: 5, label: "5 Stars" },
  { id: 4, label: "4+ Stars" },
  { id: 3, label: "3+ Stars" },
  { id: 2, label: "2+ Stars" },
  { id: 1, label: "1+ Stars" },
];

export default function FilterSection({ onFilterChange }: FilterSectionProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: ["tops"],
    colors: ["black"],
    occasions: ["casual"],
    priceRange: [0, 5000] as [number, number],
    styles: [],
    brands: [],
    sizes: [],
    ratings: [],
  });

  const handleCategoryChange = (category: string) => {
    setFilters(prev => {
      const updatedCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      const newFilters = { ...prev, categories: updatedCategories };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleColorChange = (color: string) => {
    setFilters(prev => {
      const updatedColors = prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color];
      
      const newFilters = { ...prev, colors: updatedColors };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleOccasionChange = (occasion: string) => {
    setFilters(prev => {
      const updatedOccasions = prev.occasions.includes(occasion)
        ? prev.occasions.filter(o => o !== occasion)
        : [...prev.occasions, occasion];
      
      const newFilters = { ...prev, occasions: updatedOccasions };
      onFilterChange(newFilters);
      return newFilters;
    });
  };
  
  const handleStyleChange = (style: string) => {
    setFilters(prev => {
      const updatedStyles = prev.styles.includes(style)
        ? prev.styles.filter(s => s !== style)
        : [...prev.styles, style];
      
      const newFilters = { ...prev, styles: updatedStyles };
      onFilterChange(newFilters);
      return newFilters;
    });
  };
  
  const handleBrandChange = (brand: string) => {
    setFilters(prev => {
      const updatedBrands = prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand];
      
      const newFilters = { ...prev, brands: updatedBrands };
      onFilterChange(newFilters);
      return newFilters;
    });
  };
  
  const handleSizeChange = (size: string) => {
    setFilters(prev => {
      const updatedSizes = prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size];
      
      const newFilters = { ...prev, sizes: updatedSizes };
      onFilterChange(newFilters);
      return newFilters;
    });
  };
  
  const handleRatingChange = (rating: number) => {
    setFilters(prev => {
      const updatedRatings = prev.ratings.includes(rating)
        ? prev.ratings.filter(r => r !== rating)
        : [...prev.ratings, rating];
      
      const newFilters = { ...prev, ratings: updatedRatings };
      onFilterChange(newFilters);
      return newFilters;
    });
  };
  
  const handlePriceRangeChange = (range: [number, number]) => {
    setFilters(prev => {
      const newFilters = { ...prev, priceRange: range };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      categories: ["tops"],
      colors: [],
      occasions: ["casual"],
      priceRange: [0, 5000] as [number, number],
      styles: [],
      brands: [],
      sizes: [],
      ratings: [],
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <Card className="mb-8">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle>Find More Items</CardTitle>
        <Button variant="ghost" onClick={resetFilters} className="h-8 px-2">
          Reset Filters
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6">
          {/* Column 1: Category and Color */}
          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="font-medium mb-3">Category</h3>
              <div className="space-y-2">
                {categoryOptions.map(category => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={filters.categories.includes(category.id)}
                      onCheckedChange={() => handleCategoryChange(category.id)}
                      className="h-5 w-5 rounded"
                    />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="ml-2 text-sm font-normal"
                    >
                      {category.label} ({category.count})
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Color Filter */}
            <div>
              <h3 className="font-medium mb-3">Color</h3>
              <div className="grid grid-cols-5 gap-2">
                {colorOptions.map(color => (
                  <Button
                    key={color.id}
                    variant="outline"
                    className={cn(
                      "w-8 h-8 rounded-full p-0 relative",
                      colorToTailwindClass(color.id),
                      filters.colors.includes(color.id) && "ring-2 ring-primary ring-offset-2"
                    )}
                    onClick={() => handleColorChange(color.id)}
                    title={color.label}
                  >
                    {filters.colors.includes(color.id) && color.id === "white" && (
                      <Check className="h-3 w-3 text-black absolute" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Column 2: Occasion and Style */}
          <div className="space-y-6">
            {/* Occasion Filter */}
            <div>
              <h3 className="font-medium mb-3">Occasion</h3>
              <div className="space-y-2">
                {occasionOptions.map(occasion => (
                  <div key={occasion.id} className="flex items-center">
                    <Checkbox
                      id={`occasion-${occasion.id}`}
                      checked={filters.occasions.includes(occasion.id)}
                      onCheckedChange={() => handleOccasionChange(occasion.id)}
                      className="h-5 w-5 rounded"
                    />
                    <Label
                      htmlFor={`occasion-${occasion.id}`}
                      className="ml-2 text-sm font-normal"
                    >
                      {occasion.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Style Filter */}
            <div>
              <h3 className="font-medium mb-3">Style</h3>
              <div className="space-y-2">
                {styleOptions.map(style => (
                  <div key={style.id} className="flex items-center">
                    <Checkbox
                      id={`style-${style.id}`}
                      checked={filters.styles.includes(style.id)}
                      onCheckedChange={() => handleStyleChange(style.id)}
                      className="h-5 w-5 rounded"
                    />
                    <Label
                      htmlFor={`style-${style.id}`}
                      className="ml-2 text-sm font-normal"
                    >
                      {style.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Column 3: Brand and Size */}
          <div className="space-y-6">
            {/* Brand Filter */}
            <div>
              <h3 className="font-medium mb-3">Brand</h3>
              <div className="space-y-2">
                {brandOptions.map(brand => (
                  <div key={brand.id} className="flex items-center">
                    <Checkbox
                      id={`brand-${brand.id}`}
                      checked={filters.brands.includes(brand.id)}
                      onCheckedChange={() => handleBrandChange(brand.id)}
                      className="h-5 w-5 rounded"
                    />
                    <Label
                      htmlFor={`brand-${brand.id}`}
                      className="ml-2 text-sm font-normal"
                    >
                      {brand.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Size Filter */}
            <div>
              <h3 className="font-medium mb-3">Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {sizeOptions.map(size => (
                  <Button
                    key={size.id}
                    variant={filters.sizes.includes(size.id) ? "default" : "outline"}
                    className={cn(
                      "h-9 px-3",
                      filters.sizes.includes(size.id) ? 
                        "bg-primary text-primary-foreground" : 
                        "bg-transparent hover:bg-primary/10"
                    )}
                    onClick={() => handleSizeChange(size.id)}
                  >
                    {size.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Column 4: Price Range and Rating */}
          <div className="space-y-6">
            {/* Price Range Filter */}
            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="px-2">
                <div className="flex justify-between mb-1">
                  <span className="text-xs">₹{filters.priceRange[0]}</span>
                  <span className="text-xs">₹{filters.priceRange[1]}</span>
                </div>
                <Slider
                  defaultValue={[0, 5000]}
                  min={0}
                  max={10000}
                  step={500}
                  value={filters.priceRange}
                  onValueChange={(value) => handlePriceRangeChange(value as [number, number])}
                  className="my-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Min: ₹0</span>
                  <span>Max: ₹10,000</span>
                </div>
              </div>
            </div>
            
            {/* Rating Filter */}
            <div>
              <h3 className="font-medium mb-3">Customer Rating</h3>
              <div className="space-y-2">
                {ratingOptions.map(rating => (
                  <div key={rating.id} className="flex items-center">
                    <Checkbox
                      id={`rating-${rating.id}`}
                      checked={filters.ratings.includes(rating.id)}
                      onCheckedChange={() => handleRatingChange(rating.id)}
                      className="h-5 w-5 rounded"
                    />
                    <Label
                      htmlFor={`rating-${rating.id}`}
                      className="ml-2 text-sm font-normal flex items-center"
                    >
                      <div className="flex items-center">
                        {[...Array(rating.id)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                        {[...Array(5 - rating.id)].map((_, i) => (
                          <span key={i} className="text-gray-300">★</span>
                        ))}
                      </div>
                      <span className="ml-1">{rating.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Applied Filters Section */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            ...filters.categories.map(c => ({ type: 'Category', value: categoryOptions.find(cat => cat.id === c)?.label || c })),
            ...filters.colors.map(c => ({ type: 'Color', value: colorOptions.find(col => col.id === c)?.label || c })),
            ...filters.occasions.map(o => ({ type: 'Occasion', value: occasionOptions.find(occ => occ.id === o)?.label || o })),
            ...filters.styles.map(s => ({ type: 'Style', value: styleOptions.find(sty => sty.id === s)?.label || s })),
            ...filters.brands.map(b => ({ type: 'Brand', value: brandOptions.find(br => br.id === b)?.label || b })),
            ...filters.sizes.map(s => ({ type: 'Size', value: sizeOptions.find(sz => sz.id === s)?.label || s })),
            ...filters.ratings.map(r => ({ type: 'Rating', value: `${r}+ Stars` })),
            filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? [{ type: 'Price', value: `₹${filters.priceRange[0]} - ₹${filters.priceRange[1]}` }] : [],
          ].flat().map((filter, i) => (
            <Badge key={i} variant="outline" className="px-2 py-1 text-xs flex items-center gap-1">
              <span className="font-semibold">{filter.type}:</span> {filter.value}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0 text-gray-400 hover:text-red-500"
                // Handle removing individual filters here
              >
                <X size={10} />
              </Button>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
