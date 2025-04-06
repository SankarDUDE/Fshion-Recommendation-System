import axios from 'axios';
import { ClothingItem, ExternalUrls } from '@shared/schema';

interface ShopifyProduct {
  id: number;
  title: string;
  description: string;
  variants: Array<{
    price: string;
    inventory_quantity: number;
  }>;
  image: {
    src: string;
  };
  tags: string;
}

// Function to convert external API data to our ClothingItem format
function mapShopifyProductToClothingItem(product: ShopifyProduct): Partial<ClothingItem> {
  // Extract style, occasion, color from tags
  const tags = product.tags.split(',');
  const style = tags.find(tag => 
    ['casual', 'formal', 'sporty', 'ethnic', 'business', 'party', 'smart_casual'].includes(tag)
  ) || 'casual';
  
  const occasion = tags.find(tag => 
    ['casual', 'formal', 'business', 'party', 'sport'].includes(tag)
  ) || 'casual';
  
  const color = tags.find(tag => 
    ['red', 'blue', 'green', 'black', 'white', 'yellow', 'purple', 'pink', 'orange', 'brown', 'grey', 'beige'].includes(tag)
  ) || 'black';

  // Extract category from tags
  const category = tags.find(tag => 
    ['tops', 'pants', 'dresses', 'shoes', 'accessories', 'outerwear'].includes(tag)
  ) || 'tops';

  // Format price to Rupee format
  const priceInRupees = Math.floor(parseFloat(product.variants[0].price) * 83); // Convert to INR (approximate rate)
  const formattedPrice = `₹${priceInRupees.toLocaleString('en-IN')}`;

  // Create external URLs
  const externalUrls: ExternalUrls = {
    shopify: `https://shopify.com/products/${product.id}`,
    amazon: `https://amazon.in/s?k=${encodeURIComponent(product.title)}`,
    flipkart: `https://flipkart.com/search?q=${encodeURIComponent(product.title)}`,
    myntra: `https://myntra.com/search?q=${encodeURIComponent(product.title)}`,
    ajio: `https://www.ajio.com/search/?text=${encodeURIComponent(product.title)}`,
    tatacliq: `https://www.tatacliq.com/search/?searchCategory=all&text=${encodeURIComponent(product.title)}`,
    nykaa: `https://www.nykaafashion.com/search?q=${encodeURIComponent(product.title)}`
  };

  return {
    name: product.title,
    category,
    description: product.description,
    price: formattedPrice,
    imageUrl: product.image.src,
    color,
    style,
    occasion,
    isPopular: product.variants[0].inventory_quantity < 10, // If low inventory, it's popular
    externalUrls,
    isExternal: true
  };
}

export async function fetchExternalProducts(apiKey: string, category: string, limit = 10): Promise<Partial<ClothingItem>[]> {
  try {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    
    // Replace with actual Shopify API or any other fashion API endpoint
    const response = await axios.get(
      `https://api.shopify.com/admin/api/2023-07/products.json?limit=${limit}&collection_id=${category}`,
      {
        headers: {
          'X-Shopify-Access-Token': apiKey
        }
      }
    );
    
    if (response.data && response.data.products) {
      return response.data.products.map(mapShopifyProductToClothingItem);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching external products:', error);
    return [];
  }
}

// Mock function for development when no API key is available
export function getMockExternalProducts(category: string, limit = 5): Partial<ClothingItem>[] {
  // Return empty array in production - only used for development
  return [];
}