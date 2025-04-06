import { 
  users, 
  clothingItems, 
  outfits, 
  favorites, 
  type User, 
  type InsertUser, 
  type ClothingItem, 
  type InsertClothingItem,
  type Outfit,
  type InsertOutfit,
  type Favorite,
  type InsertFavorite
} from "@shared/schema";
import { clothingData } from "./data/clothing";
import { outfitsData } from "./data/outfits";
import session from "express-session";
import createMemStoreFactory from "memorystore";

// Create and export the memory store for session
export function createMemoryStore(sessionModule: typeof session) {
  const MemoryStore = createMemStoreFactory(sessionModule);
  return new MemoryStore({
    checkPeriod: 86400000, // prune expired entries every 24h
  });
}

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Clothing item methods
  getClothingItems(): Promise<ClothingItem[]>;
  getClothingItemById(id: number): Promise<ClothingItem | undefined>;
  getClothingItemsByCategory(category: string): Promise<ClothingItem[]>;
  getClothingItemsByColor(color: string): Promise<ClothingItem[]>;
  getClothingItemsByStyle(style: string): Promise<ClothingItem[]>;
  getClothingItemsByOccasion(occasion: string): Promise<ClothingItem[]>;
  getPopularClothingItems(): Promise<ClothingItem[]>;
  getExternalClothingItems(): Promise<ClothingItem[]>;
  addExternalClothingItem(item: Partial<ClothingItem>): Promise<ClothingItem>;
  addExternalClothingItems(items: Partial<ClothingItem>[]): Promise<ClothingItem[]>;

  // Outfit methods
  getOutfits(): Promise<Outfit[]>;
  getOutfitById(id: number): Promise<Outfit | undefined>;
  getOutfitsByOccasion(occasion: string): Promise<Outfit[]>;

  // Favorite methods
  getFavoritesByUserId(userId: number): Promise<Favorite[]>;
  addFavorite(favorite: InsertFavorite): Promise<Favorite>;
  removeFavorite(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private clothingItems: Map<number, ClothingItem>;
  private outfits: Map<number, Outfit>;
  private favorites: Map<number, Favorite>;
  private userCurrentId: number;
  private clothingItemCurrentId: number;
  private outfitCurrentId: number;
  private favoriteCurrentId: number;

  constructor() {
    this.users = new Map();
    this.clothingItems = new Map();
    this.outfits = new Map();
    this.favorites = new Map();
    this.userCurrentId = 1;
    this.clothingItemCurrentId = 1;
    this.outfitCurrentId = 1;
    this.favoriteCurrentId = 1;

    // Load initial clothing data
    this.seedClothingItems();
    this.seedOutfits();
  }

  private seedClothingItems() {
    clothingData.forEach(item => {
      const id = this.clothingItemCurrentId++;
      this.clothingItems.set(id, { 
        ...item, 
        id,
        isExternal: false,
        externalUrls: null 
      } as ClothingItem);
    });
  }

  private seedOutfits() {
    outfitsData.forEach(outfit => {
      const id = this.outfitCurrentId++;
      this.outfits.set(id, { ...outfit, id });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Clothing item methods
  async getClothingItems(): Promise<ClothingItem[]> {
    return Array.from(this.clothingItems.values());
  }

  async getClothingItemById(id: number): Promise<ClothingItem | undefined> {
    return this.clothingItems.get(id);
  }

  async getClothingItemsByCategory(category: string): Promise<ClothingItem[]> {
    return Array.from(this.clothingItems.values()).filter(
      item => item.category === category
    );
  }

  async getClothingItemsByColor(color: string): Promise<ClothingItem[]> {
    return Array.from(this.clothingItems.values()).filter(
      item => item.color === color
    );
  }

  async getClothingItemsByStyle(style: string): Promise<ClothingItem[]> {
    return Array.from(this.clothingItems.values()).filter(
      item => item.style === style
    );
  }

  async getClothingItemsByOccasion(occasion: string): Promise<ClothingItem[]> {
    return Array.from(this.clothingItems.values()).filter(
      item => item.occasion === occasion
    );
  }

  async getPopularClothingItems(): Promise<ClothingItem[]> {
    return Array.from(this.clothingItems.values()).filter(
      item => item.isPopular
    );
  }
  
  async getExternalClothingItems(): Promise<ClothingItem[]> {
    return Array.from(this.clothingItems.values()).filter(
      item => item.isExternal === true
    );
  }
  
  async addExternalClothingItem(item: Partial<ClothingItem>): Promise<ClothingItem> {
    const id = this.clothingItemCurrentId++;
    const newItem = { 
      ...item, 
      id,
      isExternal: true 
    } as ClothingItem;
    this.clothingItems.set(id, newItem);
    return newItem;
  }
  
  async addExternalClothingItems(items: Partial<ClothingItem>[]): Promise<ClothingItem[]> {
    return Promise.all(items.map(item => this.addExternalClothingItem(item)));
  }

  // Outfit methods
  async getOutfits(): Promise<Outfit[]> {
    return Array.from(this.outfits.values());
  }

  async getOutfitById(id: number): Promise<Outfit | undefined> {
    return this.outfits.get(id);
  }

  async getOutfitsByOccasion(occasion: string): Promise<Outfit[]> {
    return Array.from(this.outfits.values()).filter(
      outfit => outfit.occasion === occasion
    );
  }

  // Favorite methods
  async getFavoritesByUserId(userId: number): Promise<Favorite[]> {
    return Array.from(this.favorites.values()).filter(
      favorite => favorite.userId === userId
    );
  }

  async addFavorite(insertFavorite: InsertFavorite): Promise<Favorite> {
    const id = this.favoriteCurrentId++;
    const favorite: Favorite = { 
      ...insertFavorite, 
      id,
      itemId: insertFavorite.itemId || null,
      outfitId: insertFavorite.outfitId || null
    };
    this.favorites.set(id, favorite);
    return favorite;
  }

  async removeFavorite(id: number): Promise<void> {
    this.favorites.delete(id);
  }
}

export const storage = new MemStorage();
