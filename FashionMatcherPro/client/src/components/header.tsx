import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Heart, ShoppingBag, User, Search, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-primary font-bold text-2xl">
                Style<span className="text-rose-500">Match</span>
              </span>
            </Link>
          </div>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:block w-1/3">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for items..."
                className="w-full pl-10 pr-4 py-2 rounded-full"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Search size={16} />
              </div>
            </div>
          </div>
          
          {/* Mobile Search */}
          {showSearch && (
            <div className="absolute inset-0 bg-white p-4 flex items-center z-50 md:hidden">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search for items..."
                  className="w-full pl-10 pr-4 py-2 rounded-full"
                  autoFocus
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Search size={16} />
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="ml-2"
                onClick={() => setShowSearch(false)}
              >
                <X size={20} />
              </Button>
            </div>
          )}
          
          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Link href="/favorites" className="hidden md:flex items-center text-gray-600 hover:text-primary">
              <Heart size={20} />
              <span className="ml-1">Favorites</span>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden md:flex items-center text-gray-600 hover:text-primary">
                    <User size={20} />
                    <span className="ml-1">{user.username}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/favorites" className="cursor-pointer">
                      Favorites
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/saved-outfits" className="cursor-pointer">
                      Saved Outfits
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isPending}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth" className="hidden md:flex items-center text-gray-600 hover:text-primary">
                <User size={20} />
                <span className="ml-1">Login</span>
              </Link>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowSearch(true)}
            >
              <Search size={20} />
            </Button>
            
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
            </Button>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <SheetClose asChild>
                    <Link href="/" className={`flex items-center px-4 py-2 rounded-md ${location === '/' ? 'bg-gray-100 text-primary' : 'text-gray-600'}`}>
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/category/tops" className={`flex items-center px-4 py-2 rounded-md ${location.startsWith('/category/tops') ? 'bg-gray-100 text-primary' : 'text-gray-600'}`}>
                      Tops & Shirts
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/category/pants" className={`flex items-center px-4 py-2 rounded-md ${location.startsWith('/category/pants') ? 'bg-gray-100 text-primary' : 'text-gray-600'}`}>
                      Pants & Jeans
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/category/dresses" className={`flex items-center px-4 py-2 rounded-md ${location.startsWith('/category/dresses') ? 'bg-gray-100 text-primary' : 'text-gray-600'}`}>
                      Dresses
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/category/ethnic" className={`flex items-center px-4 py-2 rounded-md ${location.startsWith('/category/ethnic') ? 'bg-gray-100 text-primary' : 'text-gray-600'}`}>
                      Ethnic Wear
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/category/sportswear" className={`flex items-center px-4 py-2 rounded-md ${location.startsWith('/category/sportswear') ? 'bg-gray-100 text-primary' : 'text-gray-600'}`}>
                      Sportswear
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/category/winter" className={`flex items-center px-4 py-2 rounded-md ${location.startsWith('/category/winter') ? 'bg-gray-100 text-primary' : 'text-gray-600'}`}>
                      Winter Wear
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/category/kids" className={`flex items-center px-4 py-2 rounded-md ${location.startsWith('/category/kids') ? 'bg-gray-100 text-primary' : 'text-gray-600'}`}>
                      Kids Wear
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/category/outerwear" className={`flex items-center px-4 py-2 rounded-md ${location.startsWith('/category/outerwear') ? 'bg-gray-100 text-primary' : 'text-gray-600'}`}>
                      Outerwear
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/category/sleepwear" className={`flex items-center px-4 py-2 rounded-md ${location.startsWith('/category/sleepwear') ? 'bg-gray-100 text-primary' : 'text-gray-600'}`}>
                      Sleepwear
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/category/footwear" className={`flex items-center px-4 py-2 rounded-md ${location.startsWith('/category/footwear') ? 'bg-gray-100 text-primary' : 'text-gray-600'}`}>
                      Footwear
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/category/accessories" className={`flex items-center px-4 py-2 rounded-md ${location.startsWith('/category/accessories') ? 'bg-gray-100 text-primary' : 'text-gray-600'}`}>
                      Accessories
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/favorites" className={`flex items-center px-4 py-2 rounded-md ${location === '/favorites' ? 'bg-gray-100 text-primary' : 'text-gray-600'}`}>
                      <Heart size={20} className="mr-2" />
                      Favorites
                    </Link>
                  </SheetClose>
                  {user ? (
                    <>
                      <div className="flex items-center px-4 py-2 rounded-md bg-gray-50">
                        <User size={20} className="mr-2 text-primary" />
                        <span className="font-medium">{user.username}</span>
                      </div>
                      <SheetClose asChild>
                        <button 
                          className="flex items-center px-4 py-2 rounded-md text-destructive"
                          onClick={() => logoutMutation.mutate()}
                          disabled={logoutMutation.isPending}
                        >
                          <LogOut size={20} className="mr-2" />
                          {logoutMutation.isPending ? "Logging out..." : "Log out"}
                        </button>
                      </SheetClose>
                    </>
                  ) : (
                    <SheetClose asChild>
                      <Link href="/auth" className="flex items-center px-4 py-2 rounded-md text-gray-600">
                        <User size={20} className="mr-2" />
                        Login / Register
                      </Link>
                    </SheetClose>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  );
}
