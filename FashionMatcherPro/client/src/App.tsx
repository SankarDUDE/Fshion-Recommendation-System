import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { OutfitProvider } from "@/contexts/outfit-context";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import Home from "@/pages/home";
import CategoryPage from "@/pages/category";
import ItemDetailPage from "@/pages/item-detail";
import FavoritesPage from "@/pages/favorites";
import AuthPage from "@/pages/auth-page";
import AdminPage from "@/pages/admin-page";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={Home}/>
      <ProtectedRoute path="/category/:category" component={CategoryPage}/>
      <ProtectedRoute path="/item/:id" component={ItemDetailPage}/>
      <ProtectedRoute path="/favorites" component={FavoritesPage}/>
      <Route path="/auth" component={AuthPage}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OutfitProvider>
          <Router />
          <Toaster />
        </OutfitProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
