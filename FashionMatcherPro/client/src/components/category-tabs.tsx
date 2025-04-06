import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", name: "All Items", path: "/" },
  { id: "tops", name: "Tops & Shirts", path: "/category/tops" },
  { id: "pants", name: "Pants & Jeans", path: "/category/pants" },
  { id: "dresses", name: "Dresses", path: "/category/dresses" },
  { id: "ethnic", name: "Ethnic Wear", path: "/category/ethnic" },
  { id: "sportswear", name: "Sportswear", path: "/category/sportswear" },
  { id: "winter", name: "Winter Wear", path: "/category/winter" },
  { id: "kids", name: "Kids Wear", path: "/category/kids" },
  { id: "sleepwear", name: "Sleepwear", path: "/category/sleepwear" },
  { id: "outerwear", name: "Outerwear", path: "/category/outerwear" },
  { id: "footwear", name: "Footwear", path: "/category/footwear" },
  { id: "accessories", name: "Accessories", path: "/category/accessories" }
];

export default function CategoryTabs() {
  const [location] = useLocation();
  
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto">
        <nav className="flex overflow-x-auto scrollbar-hide">
          {categories.map(category => (
            <Link 
              key={category.id} 
              href={category.path}
              className={cn(
                "whitespace-nowrap px-6 py-4 font-medium",
                location === category.path
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-primary"
              )}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

// Hide scrollbars while allowing scrolling
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.appendChild(style);
