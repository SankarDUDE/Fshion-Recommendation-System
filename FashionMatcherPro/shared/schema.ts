import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// External URLs schema for shopping links
export const externalUrlsSchema = z.object({
  shopify: z.string().optional(),
  amazon: z.string().optional(),
  flipkart: z.string().optional(),
  myntra: z.string().optional(),
  ajio: z.string().optional(),
  tatacliq: z.string().optional(),
  nykaa: z.string().optional(),
}).optional();

export type ExternalUrls = z.infer<typeof externalUrlsSchema>;

// Clothing item model
export const clothingItems = pgTable("clothing_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // tops, pants, dresses, shoes, accessories, outerwear
  price: text("price").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  color: text("color").notNull(),
  style: text("style").notNull(), // casual, formal, business, party, sport
  occasion: text("occasion").notNull(), // casual, formal, business, party, sport
  isPopular: boolean("is_popular").default(false),
  externalUrls: jsonb("external_urls"),  // Store external shopping app links as JSON
  isExternal: boolean("is_external").default(false), // Flag to identify if item is from external API
});

export const insertClothingItemSchema = createInsertSchema(clothingItems).omit({
  id: true,
});

export type InsertClothingItem = z.infer<typeof insertClothingItemSchema>;
export type ClothingItem = typeof clothingItems.$inferSelect;

// Outfit model
export const outfits = pgTable("outfits", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  totalPrice: text("total_price").notNull(),
  occasion: text("occasion").notNull(),
  items: text("items").array().notNull(), // Array of clothing item IDs
});

export const insertOutfitSchema = createInsertSchema(outfits).omit({
  id: true,
});

export type InsertOutfit = z.infer<typeof insertOutfitSchema>;
export type Outfit = typeof outfits.$inferSelect;

// Favorites model
export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  itemId: integer("item_id"),
  outfitId: integer("outfit_id"),
});

export const insertFavoriteSchema = createInsertSchema(favorites).omit({
  id: true,
});

export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
export type Favorite = typeof favorites.$inferSelect;
