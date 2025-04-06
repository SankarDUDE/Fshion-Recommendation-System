import { type InsertClothingItem } from "@shared/schema";

export const clothingData: InsertClothingItem[] = [
  // Tops & Shirts
  {
    name: "White Button-down",
    category: "tops",
    price: "₹1,999",
    description:
      "Classic white button-down shirt perfect for formal and business casual occasions.",
    imageUrl:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "white",
    style: "business",
    occasion: "formal",
    isPopular: true,
  },
  {
    name: "Black Basic Tee",
    category: "tops",
    price: "₹599",
    description:
      "Essential black t-shirt that goes with everything. 100% cotton for comfort and durability.",
    imageUrl:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "black",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },
  {
    name: "Blue Striped Shirt",
    category: "tops",
    price: "₹2,499",
    description:
      "Blue and white striped button-up shirt, perfect for a smart casual look.",
    imageUrl:
      "https://images.unsplash.com/photo-1516720262454-a5a21bfd6203?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "blue",
    style: "smart_casual",
    occasion: "business",
    isPopular: false,
  },
  {
    name: "Gray Knit Sweater",
    category: "tops",
    price: "₹2,999",
    description:
      "Cozy gray knit sweater for those cool days. Soft and comfortable fit.",
    imageUrl:
      "https://images.unsplash.com/photo-1549037173-e3b717902c57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "gray",
    style: "casual",
    occasion: "casual",
    isPopular: false,
  },
  {
    name: "Red Polo Shirt",
    category: "tops",
    price: "₹1,499",
    description:
      "Classic red polo shirt with a comfortable fit and breathable fabric.",
    imageUrl:
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "red",
    style: "smart_casual",
    occasion: "casual",
    isPopular: false,
  },
  {
    name: "Printed Casual Shirt",
    category: "tops",
    price: "₹1,299",
    description:
      "Stylish printed shirt with modern patterns, perfect for weekend outings.",
    imageUrl:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "blue",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },
  {
    name: "Navy Blazer",
    category: "outerwear",
    price: "₹4,999",
    description:
      "Timeless navy blazer that elevates any outfit. Tailored fit with subtle details.",
    imageUrl:
      "https://images.unsplash.com/photo-1598808503746-f34faef0e719?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "navy",
    style: "formal",
    occasion: "formal",
    isPopular: true,
  },

  // Pants & Jeans
  {
    name: "Classic Blue Jeans",
    category: "pants",
    price: "₹2,499",
    description:
      "Classic blue denim jeans with a straight leg. Versatile and durable for everyday wear.",
    imageUrl:
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "denim",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },
  {
    name: "Khaki Chinos",
    category: "pants",
    price: "₹1,999",
    description:
      "Versatile khaki chinos that transition perfectly from work to weekend.",
    imageUrl:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "khaki",
    style: "business",
    occasion: "business",
    isPopular: true,
  },
  {
    name: "Black Dress Pants",
    category: "pants",
    price: "₹2,999",
    description:
      "Elegant black dress pants with a slim fit, perfect for formal occasions.",
    imageUrl:
      "https://images.unsplash.com/photo-1633966887768-64f9a867bdba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "black",
    style: "formal",
    occasion: "formal",
    isPopular: false,
  },
  {
    name: "Gray Joggers",
    category: "pants",
    price: "₹1,299",
    description:
      "Comfortable gray joggers for casual outings or workout sessions.",
    imageUrl:
      "https://images.unsplash.com/photo-1572689835013-5e6d6999a3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "gray",
    style: "sporty",
    occasion: "sport",
    isPopular: false,
  },
  {
    name: "Slim Fit Dark Jeans",
    category: "pants",
    price: "₹2,799",
    description:
      "Stylish dark wash jeans with a slim fit silhouette for a modern look.",
    imageUrl:
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "denim",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },
  {
    name: "Distressed Jeans",
    category: "pants",
    price: "₹2,299",
    description: "Trendy distressed jeans with a comfortable relaxed fit.",
    imageUrl:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "denim",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },
  {
    name: "Olive Cargo Pants",
    category: "pants",
    price: "₹2,199",
    description: "Functional olive cargo pants with multiple pockets, perfect for outdoor activities and casual wear.",
    imageUrl:
      "https://images.unsplash.com/photo-1517940310602-26535839fe84?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "green",
    style: "casual",
    occasion: "casual",
    isPopular: false,
  },
  {
    name: "Black Skinny Jeans",
    category: "pants",
    price: "₹2,699",
    description: "Sleek black skinny jeans that provide a modern, streamlined silhouette for any casual outfit.",
    imageUrl:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "black",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },
  {
    name: "Relaxed Fit Jeans",
    category: "pants",
    price: "₹2,399",
    description: "Comfortable relaxed fit jeans with a classic wash, offering both style and comfort.",
    imageUrl:
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "blue",
    style: "casual",
    occasion: "casual",
    isPopular: false,
  },
  {
    name: "White Summer Pants",
    category: "pants",
    price: "₹1,799",
    description: "Lightweight white linen pants, perfect for hot summer days and beach outings.",
    imageUrl:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "white",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },

  // Dresses
  {
    name: "Floral Summer Dress",
    category: "dresses",
    price: "₹2,999",
    description:
      "Light and breezy floral summer dress, perfect for warm days and special occasions.",
    imageUrl:
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "blue",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },
  {
    name: "Black Cocktail Dress",
    category: "dresses",
    price: "₹4,999",
    description: "Elegant black cocktail dress for parties and formal events.",
    imageUrl:
      "https://images.unsplash.com/photo-1538329972958-465d6d2144ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "black",
    style: "formal",
    occasion: "party",
    isPopular: true,
  },
  {
    name: "Red Party Dress",
    category: "dresses",
    price: "₹4,299",
    description:
      "Stunning red dress that stands out at any party or special event.",
    imageUrl:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "red",
    style: "party",
    occasion: "party",
    isPopular: false,
  },
  {
    name: "Casual Maxi Dress",
    category: "dresses",
    price: "₹2,499",
    description:
      "Comfortable and stylish maxi dress perfect for casual day outings.",
    imageUrl:
      "https://images.unsplash.com/photo-1623609163859-ca93c959b5b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "green",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },
  {
    name: "Wrap Dress",
    category: "dresses",
    price: "₹3,699",
    description:
      "Elegant wrap dress that flatters all body types and transitions from day to night.",
    imageUrl:
      "https://images.unsplash.com/photo-1550639525-c97d455acf70?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "purple",
    style: "smart_casual",
    occasion: "business",
    isPopular: true,
  },

  // Outerwear
  {
    name: "Black Leather Jacket",
    category: "outerwear",
    price: "₹4,999",
    description: "Classic black leather jacket that adds edge to any outfit.",
    imageUrl:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "black",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },
  {
    name: "Gray Hoodie",
    category: "outerwear",
    price: "₹1,299",
    description: "Comfortable gray hoodie for casual days and light layering.",
    imageUrl:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "gray",
    style: "sporty",
    occasion: "casual",
    isPopular: true,
  },
  {
    name: "Denim Jacket",
    category: "outerwear",
    price: "₹3,499",
    description:
      "Classic denim jacket that works with almost any casual outfit.",
    imageUrl:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "denim",
    style: "casual",
    occasion: "casual",
    isPopular: false,
  },
  {
    name: "Trench Coat",
    category: "outerwear",
    price: "₹4,899",
    description: "Timeless trench coat that adds sophistication to any look.",
    imageUrl:
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "khaki",
    style: "formal",
    occasion: "formal",
    isPopular: true,
  },

  // Shoes
  {
    name: "White Sneakers",
    category: "shoes",
    price: "₹2,799",
    description: "Clean white sneakers that complement any casual outfit.",
    imageUrl:
      "https://images.unsplash.com/photo-1542280756-74b2f55e73ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "white",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },
  {
    name: "Brown Dress Shoes",
    category: "shoes",
    price: "₹4,799",
    description:
      "Elegant brown dress shoes for formal occasions and business meetings.",
    imageUrl:
      "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "brown",
    style: "formal",
    occasion: "formal",
    isPopular: false,
  },
  {
    name: "Blue Casual Shoes",
    category: "shoes",
    price: "₹2,599",
    description: "Comfortable blue casual shoes for everyday wear.",
    imageUrl:
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "blue",
    style: "casual",
    occasion: "casual",
    isPopular: false,
  },
  {
    name: "Black Formal Oxfords",
    category: "shoes",
    price: "₹4,899",
    description:
      "Classic black oxford shoes, a must-have for formal occasions.",
    imageUrl:
      "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "black",
    style: "formal",
    occasion: "formal",
    isPopular: true,
  },
  {
    name: "Casual Flip Flops",
    category: "shoes",
    price: "₹399",
    description:
      "Comfortable flip flops for casual beach days and relaxed outings.",
    imageUrl:
      "https://images.unsplash.com/photo-1612202634253-4dbedd822eb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "blue",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },
  {
    name: "Canvas Slip-Ons",
    category: "shoes",
    price: "₹999",
    description: "Easy to wear slip-on canvas shoes for everyday comfort.",
    imageUrl:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "gray",
    style: "casual",
    occasion: "casual",
    isPopular: false,
  },
  {
    name: "Comfortable Slippers",
    category: "shoes",
    price: "₹349",
    description: "Soft and cozy slippers for relaxing at home.",
    imageUrl:
      "https://images.unsplash.com/photo-1590060156669-fb30f25a90a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "brown",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },

  // Accessories
  {
    name: "Brown Leather Belt",
    category: "accessories",
    price: "₹899",
    description:
      "Quality brown leather belt that adds a finishing touch to any outfit.",
    imageUrl:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "brown",
    style: "formal",
    occasion: "business",
    isPopular: false,
  },
  {
    name: "Silver Watch",
    category: "accessories",
    price: "₹4,999",
    description:
      "Elegant silver watch that elevates any outfit with a touch of sophistication.",
    imageUrl:
      "https://images.unsplash.com/photo-1509048191080-d2677e3bae48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "silver",
    style: "formal",
    occasion: "formal",
    isPopular: true,
  },
  {
    name: "Black Sunglasses",
    category: "accessories",
    price: "₹1,299",
    description:
      "Stylish black sunglasses that provide UV protection while looking great.",
    imageUrl:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "black",
    style: "casual",
    occasion: "casual",
    isPopular: false,
  },
  {
    name: "Patterned Scarf",
    category: "accessories",
    price: "₹699",
    description:
      "Versatile patterned scarf that adds color and warmth to your outfit.",
    imageUrl:
      "https://images.unsplash.com/photo-1606483956061-46a898dce538?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "red",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },
  {
    name: "Gold Necklace",
    category: "accessories",
    price: "₹3,299",
    description:
      "Elegant gold necklace perfect for special occasions and everyday wear.",
    imageUrl:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "yellow",
    style: "formal",
    occasion: "party",
    isPopular: true,
  },

  // Ethnic Wear
  {
    name: "Red Saree",
    category: "ethnic",
    price: "₹4,499",
    description:
      "Elegant red saree with golden embroidery, perfect for weddings and special occasions.",
    imageUrl:
      "https://images.unsplash.com/photo-1610189020382-668a857542e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "red",
    style: "ethnic",
    occasion: "formal",
    isPopular: true,
  },
  {
    name: "Blue Kurta",
    category: "ethnic",
    price: "₹1,899",
    description:
      "Comfortable blue kurta with traditional patterns, ideal for festive occasions.",
    imageUrl:
      "https://images.unsplash.com/photo-1598544968583-83a0e75e9c4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "blue",
    style: "ethnic",
    occasion: "party",
    isPopular: true,
  },
  {
    name: "Pink Lehenga",
    category: "ethnic",
    price: "₹4,999",
    description:
      "Beautiful pink lehenga with intricate embroidery for wedding ceremonies.",
    imageUrl: "https://images.app.goo.gl/HnknAQZUtzFeohX78",
    color: "pink",
    style: "ethnic",
    occasion: "party",
    isPopular: false,
  },
  {
    name: "Beige Sherwani",
    category: "ethnic",
    price: "₹4,499",
    description:
      "Regal beige sherwani with detailed embroidery for grooms and special events.",
    imageUrl:
      "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "beige",
    style: "ethnic",
    occasion: "formal",
    isPopular: false,
  },

  // Sleepwear
  {
    name: "Pink Pajama Set",
    category: "sleepwear",
    price: "₹1,499",
    description: "Cozy pink cotton pajama set for a comfortable night's sleep.",
    imageUrl:
      "https://images.unsplash.com/photo-1634038971779-ebaba8a3c25d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "pink",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },
  {
    name: "Blue Nightgown",
    category: "sleepwear",
    price: "₹899",
    description:
      "Soft blue nightgown made of lightweight fabric for comfortable sleep.",
    imageUrl:
      "https://images.unsplash.com/photo-1550246140-5119ae4790b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "blue",
    style: "casual",
    occasion: "casual",
    isPopular: false,
  },
  {
    name: "Grey Lounge Set",
    category: "sleepwear",
    price: "₹1,799",
    description:
      "Comfortable grey lounge set perfect for relaxing at home or casual wear.",
    imageUrl:
      "https://images.unsplash.com/photo-1618677831708-0e7fda6d3165?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "grey",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },

  // Footwear
  {
    name: "Strappy Sandals",
    category: "footwear",
    price: "₹1,299",
    description:
      "Elegant strappy sandals with low heels, perfect for summer outings.",
    imageUrl:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "brown",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },
  {
    name: "Red High Heels",
    category: "footwear",
    price: "₹2,999",
    description:
      "Stunning red high heels to make a statement at any special event.",
    imageUrl:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "red",
    style: "formal",
    occasion: "party",
    isPopular: true,
  },
  {
    name: "Black Combat Boots",
    category: "footwear",
    price: "₹3,499",
    description:
      "Durable black combat boots that add an edgy touch to any outfit.",
    imageUrl:
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "black",
    style: "casual",
    occasion: "casual",
    isPopular: false,
  },
  {
    name: "Golden Stilettos",
    category: "footwear",
    price: "₹3,299",
    description:
      "Elegant golden stiletto heels that add glamour to evening gowns and party dresses.",
    imageUrl:
      "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "gold",
    style: "formal",
    occasion: "party",
    isPopular: true,
  },
  {
    name: "Leather Loafers",
    category: "footwear",
    price: "₹2,499",
    description:
      "Classic brown leather loafers offering both comfort and style for casual business settings.",
    imageUrl:
      "https://images.unsplash.com/photo-1582897085656-c636d006a246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "brown",
    style: "business",
    occasion: "business",
    isPopular: true,
  },
  {
    name: "Canvas Sneakers",
    category: "footwear",
    price: "₹899",
    description:
      "Lightweight canvas sneakers in vibrant blue, perfect for casual daily wear.",
    imageUrl:
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "blue",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },
  {
    name: "Ankle Boots",
    category: "footwear",
    price: "₹2,699",
    description:
      "Versatile brown ankle boots that complement both casual and semi-formal outfits.",
    imageUrl:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "brown",
    style: "casual",
    occasion: "casual",
    isPopular: false,
  },
  {
    name: "Platform Sandals",
    category: "footwear",
    price: "₹1,799",
    description:
      "Comfortable black platform sandals that provide height without sacrificing comfort.",
    imageUrl:
      "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "black",
    style: "casual",
    occasion: "casual",
    isPopular: false,
  },

  // Winter Wear
  {
    name: "Grey Woolen Sweater",
    category: "winter",
    price: "₹2,299",
    description:
      "Warm grey woolen sweater for cold winter days, comfortable and stylish.",
    imageUrl:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "grey",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },
  {
    name: "Black Puffer Jacket",
    category: "winter",
    price: "₹3,999",
    description:
      "Insulated black puffer jacket that provides warmth without bulk.",
    imageUrl:
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "black",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },
  {
    name: "Red Woolen Cap",
    category: "winter",
    price: "₹499",
    description:
      "Soft red woolen cap to keep your head warm during winter months.",
    imageUrl:
      "https://images.unsplash.com/photo-1510598152595-ae9b308afef1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "red",
    style: "casual",
    occasion: "casual",
    isPopular: false,
  },
  {
    name: "Blue Thermal Set",
    category: "winter",
    price: "₹1,799",
    description:
      "Insulating blue thermal wear set for extreme cold conditions.",
    imageUrl:
      "https://images.unsplash.com/photo-1578948856697-db91d246b7b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "blue",
    style: "casual",
    occasion: "casual",
    isPopular: false,
  },

  // Kids Wear
  {
    name: "Colorful Kids T-shirt",
    category: "kids",
    price: "₹599",
    description:
      "Bright and colorful t-shirt for kids, made of soft cotton fabric.",
    imageUrl:
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "multi",
    style: "casual",
    occasion: "casual",
    isPopular: true,
  },
  {
    name: "Blue Kids Jeans",
    category: "kids",
    price: "₹899",
    description:
      "Durable blue jeans for active kids, with adjustable waist for comfort.",
    imageUrl:
      "https://images.unsplash.com/photo-1543107886-d80978a612ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "blue",
    style: "casual",
    occasion: "casual",
    isPopular: false,
  },
  {
    name: "Pink Kids Dress",
    category: "kids",
    price: "₹1,299",
    description:
      "Adorable pink dress for little girls, perfect for parties and special occasions.",
    imageUrl:
      "https://images.unsplash.com/photo-1591241900019-5991c61e5ff7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    color: "pink",
    style: "formal",
    occasion: "party",
    isPopular: true,
  },
];
