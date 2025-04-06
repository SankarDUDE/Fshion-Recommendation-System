import { type InsertOutfit } from "@shared/schema";

export const outfitsData: InsertOutfit[] = [
  {
    name: "Casual Weekend",
    description: "Comfortable and stylish outfit perfect for weekend activities.",
    totalPrice: "₹3,897",
    occasion: "casual",
    items: ["2", "7", "16"] // Black Basic Tee, Classic Blue Jeans, White Sneakers
  },
  {
    name: "Business Casual",
    description: "Professional yet comfortable outfit suitable for office and meetings.",
    totalPrice: "₹8,797",
    occasion: "business",
    items: ["1", "8", "17"] // White Button-down, Khaki Chinos, Brown Dress Shoes
  },
  {
    name: "Smart Casual",
    description: "Polished look that works for dining out or casual social events.",
    totalPrice: "₹5,597",
    occasion: "casual",
    items: ["3", "7", "18"] // Blue Striped Shirt, Classic Blue Jeans, Blue Casual Shoes
  },
  {
    name: "Formal Night",
    description: "Elegant ensemble perfect for formal events and special occasions.",
    totalPrice: "₹9,797",
    occasion: "formal",
    items: ["1", "9", "17"] // White Button-down, Black Dress Pants, Brown Dress Shoes
  },
  {
    name: "Weekend Party",
    description: "Fun and stylish outfit for weekend parties and social gatherings.",
    totalPrice: "₹4,797",
    occasion: "party",
    items: ["5", "7", "16"] // Red Polo Shirt, Classic Blue Jeans, White Sneakers
  },
  {
    name: "Office Ready",
    description: "Professional outfit that projects confidence in the workplace.",
    totalPrice: "₹7,697",
    occasion: "business",
    items: ["1", "8", "17", "19"] // White Button-down, Khaki Chinos, Brown Dress Shoes, Brown Leather Belt
  },
  {
    name: "Traditional Celebration",
    description: "Elegant ethnic wear perfect for traditional celebrations and festivals.",
    totalPrice: "₹9,398",
    occasion: "formal",
    items: ["24", "33", "32"] // Red Saree, Gold Necklace, Strappy Sandals
  },
  {
    name: "Winter Outing",
    description: "Warm and stylish outfit for cold winter days out in the city.",
    totalPrice: "₹7,697",
    occasion: "casual",
    items: ["35", "7", "19", "36"] // Black Puffer Jacket, Classic Blue Jeans, Brown Leather Belt, Red Woolen Cap
  },
  {
    name: "Morning Yoga",
    description: "Comfortable athletic wear perfect for yoga or light workout sessions.",
    totalPrice: "₹2,198",
    occasion: "sport",
    items: ["27", "28"] // Blue Sports Bra, Green Yoga Pants
  },
  {
    name: "Kids Party",
    description: "Adorable outfit for children attending birthday parties or special events.",
    totalPrice: "₹2,198",
    occasion: "party",
    items: ["39", "34"] // Pink Kids Dress, Red Woolen Cap
  },
  {
    name: "Cozy Night In",
    description: "Super comfortable sleepwear for relaxing evenings at home.",
    totalPrice: "₹1,848",
    occasion: "casual",
    items: ["29", "31"] // Pink Pajama Set, Comfortable Slippers
  }
];
