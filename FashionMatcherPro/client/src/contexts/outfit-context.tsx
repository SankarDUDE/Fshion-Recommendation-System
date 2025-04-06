import { createContext, useContext, useState, ReactNode } from "react";
import { type ClothingItem } from "@shared/schema";

interface OutfitContextType {
  selectedItems: ClothingItem[];
  addItem: (item: ClothingItem) => void;
  removeItem: (itemId: number) => void;
  replaceItem: (item: ClothingItem) => void;
  clearOutfit: () => void;
  getItemByCategory: (category: string) => ClothingItem | undefined;
}

const OutfitContext = createContext<OutfitContextType | undefined>(undefined);

export function OutfitProvider({ children }: { children: ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<ClothingItem[]>([]);

  const addItem = (item: ClothingItem) => {
    // Check if an item of this category already exists
    const existingItemIndex = selectedItems.findIndex(
      existingItem => existingItem.category === item.category
    );

    if (existingItemIndex >= 0) {
      // Replace the existing item with the new one
      const updatedItems = [...selectedItems];
      updatedItems[existingItemIndex] = item;
      setSelectedItems(updatedItems);
    } else {
      // Add the new item
      setSelectedItems([...selectedItems, item]);
    }
  };

  const removeItem = (itemId: number) => {
    setSelectedItems(selectedItems.filter(item => item.id !== itemId));
  };

  const replaceItem = (item: ClothingItem) => {
    const updatedItems = selectedItems.filter(
      existingItem => existingItem.category !== item.category
    );
    setSelectedItems([...updatedItems, item]);
  };

  const clearOutfit = () => {
    setSelectedItems([]);
  };

  const getItemByCategory = (category: string) => {
    return selectedItems.find(item => item.category === category);
  };

  return (
    <OutfitContext.Provider
      value={{
        selectedItems,
        addItem,
        removeItem,
        replaceItem,
        clearOutfit,
        getItemByCategory
      }}
    >
      {children}
    </OutfitContext.Provider>
  );
}

export function useOutfit() {
  const context = useContext(OutfitContext);
  if (context === undefined) {
    throw new Error("useOutfit must be used within an OutfitProvider");
  }
  return context;
}
