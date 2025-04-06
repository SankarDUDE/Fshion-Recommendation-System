import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { getRecommendedMatches, getComplementaryItems } from "./recommendation";
import { setupAuth } from "./auth";
import { fetchExternalProducts } from "./services/api-service";
import { externalUrlsSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  setupAuth(app);
  
  // API Routes - prefix all routes with /api
  
  // Get all clothing items
  app.get("/api/clothing", async (req, res) => {
    const items = await storage.getClothingItems();
    res.json(items);
  });

  // Get clothing item by ID
  app.get("/api/clothing/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    const item = await storage.getClothingItemById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    res.json(item);
  });

  // Get clothing items by category
  app.get("/api/clothing/category/:category", async (req, res) => {
    const { category } = req.params;
    const items = await storage.getClothingItemsByCategory(category);
    res.json(items);
  });

  // Get popular clothing items
  app.get("/api/clothing/popular", async (req, res) => {
    const items = await storage.getPopularClothingItems();
    res.json(items);
  });

  // Get recommended matching items
  app.get("/api/recommendations/match/:itemId", async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    if (isNaN(itemId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    const targetCategory = req.query.category as string | undefined;
    
    const referenceItem = await storage.getClothingItemById(itemId);
    if (!referenceItem) {
      return res.status(404).json({ message: "Reference item not found" });
    }
    
    const allItems = await storage.getClothingItems();
    
    let candidateItems = allItems;
    if (targetCategory) {
      candidateItems = allItems.filter(item => item.category === targetCategory);
    }
    
    const recommendations = getRecommendedMatches(referenceItem, candidateItems);
    res.json(recommendations);
  });

  // Get complementary items for an outfit
  app.post("/api/recommendations/outfit", async (req, res) => {
    const schema = z.object({
      itemIds: z.array(z.number()),
      targetCategory: z.string()
    });
    
    const parseResult = schema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ message: "Invalid request body", errors: parseResult.error });
    }
    
    const { itemIds, targetCategory } = parseResult.data;
    
    // Get all items
    const allItems = await storage.getClothingItems();
    
    // Get selected items
    const selectedItems = itemIds
      .map(id => allItems.find(item => item.id === id))
      .filter((item): item is typeof item & { id: number } => item !== undefined);
    
    const recommendations = getComplementaryItems(selectedItems, allItems, targetCategory);
    res.json(recommendations);
  });

  // Get all outfits
  app.get("/api/outfits", async (req, res) => {
    const outfits = await storage.getOutfits();
    res.json(outfits);
  });

  // Get outfit by ID
  app.get("/api/outfits/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    const outfit = await storage.getOutfitById(id);
    if (!outfit) {
      return res.status(404).json({ message: "Outfit not found" });
    }
    
    res.json(outfit);
  });

  // Get outfits by occasion
  app.get("/api/outfits/occasion/:occasion", async (req, res) => {
    const { occasion } = req.params;
    const outfits = await storage.getOutfitsByOccasion(occasion);
    res.json(outfits);
  });

  // Add a favorite
  app.post("/api/favorites", async (req, res) => {
    const schema = z.object({
      userId: z.number(),
      itemId: z.number().optional(),
      outfitId: z.number().optional()
    }).refine(data => data.itemId !== undefined || data.outfitId !== undefined, {
      message: "Either itemId or outfitId must be provided"
    });
    
    const parseResult = schema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ message: "Invalid request body", errors: parseResult.error });
    }
    
    const favorite = await storage.addFavorite(parseResult.data);
    res.status(201).json(favorite);
  });

  // Get user's favorites
  app.get("/api/favorites/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    
    const favorites = await storage.getFavoritesByUserId(userId);
    res.json(favorites);
  });

  // Remove a favorite
  app.delete("/api/favorites/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    await storage.removeFavorite(id);
    res.status(204).send();
  });

  // External API Integration Routes
  
  // Get external clothing items 
  app.get("/api/external/clothing", async (req, res) => {
    const items = await storage.getExternalClothingItems();
    res.json(items);
  });
  
  // Fetch items from external API (requires API key)
  app.post("/api/external/fetch", async (req, res) => {
    const schema = z.object({
      apiKey: z.string(),
      category: z.string(),
      limit: z.number().optional().default(10)
    });
    
    const parseResult = schema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ message: "Invalid request body", errors: parseResult.error });
    }
    
    const { apiKey, category, limit } = parseResult.data;
    
    try {
      const externalItems = await fetchExternalProducts(apiKey, category, limit);
      if (externalItems.length === 0) {
        return res.status(404).json({ message: "No items found from external API" });
      }
      
      const addedItems = await storage.addExternalClothingItems(externalItems);
      res.status(201).json(addedItems);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching from external API", error: error.message });
    }
  });
  
  // Add external shopping links to an existing item
  app.post("/api/clothing/:id/shopping-links", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    const schema = z.object({
      externalUrls: externalUrlsSchema
    });
    
    const parseResult = schema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ message: "Invalid request body", errors: parseResult.error });
    }
    
    const item = await storage.getClothingItemById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    // Update the item with the new external URLs
    const updatedItem = await storage.addExternalClothingItem({
      ...item,
      externalUrls: parseResult.data.externalUrls
    });
    
    res.json(updatedItem);
  });

  const httpServer = createServer(app);

  return httpServer;
}
