import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useRoute, Redirect } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CategoryTabs from "@/components/category-tabs";
import ItemCarousel from "@/components/item-carousel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ShoppingBag, Database } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExternalUrls } from "@shared/schema";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const apiFormSchema = z.object({
  apiKey: z.string().min(1, {
    message: "API key is required",
  }),
  category: z.string().min(1, {
    message: "Category is required",
  }),
  limit: z.number().min(1).max(50),
});

const urlFormSchema = z.object({
  itemId: z.number().min(1, {
    message: "Item ID is required",
  }),
  externalUrls: z.object({
    amazon: z.string().url().optional(),
    flipkart: z.string().url().optional(),
    myntra: z.string().url().optional(),
    ajio: z.string().url().optional(),
    shopify: z.string().url().optional(),
    tatacliq: z.string().url().optional(),
    nykaa: z.string().url().optional(),
  }),
});

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const [, params] = useRoute("/admin");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedTab, setSelectedTab] = useState("api");

  // Fetch external items to display
  const { data: externalItems = [], isLoading: isLoadingExternal } = useQuery({
    queryKey: ["/api/external/clothing"],
  });

  // API form
  const apiForm = useForm<z.infer<typeof apiFormSchema>>({
    resolver: zodResolver(apiFormSchema),
    defaultValues: {
      apiKey: "",
      category: "tops", // Default category
      limit: 10,
    },
  });

  // URL form
  const urlForm = useForm<z.infer<typeof urlFormSchema>>({
    resolver: zodResolver(urlFormSchema),
    defaultValues: {
      itemId: 0,
      externalUrls: {
        amazon: "",
        flipkart: "",
        myntra: "",
        ajio: "",
        shopify: "",
        tatacliq: "",
        nykaa: "",
      },
    },
  });

  // Mutations
  const fetchExternalMutation = useMutation({
    mutationFn: async (values: z.infer<typeof apiFormSchema>) => {
      const res = await apiRequest("POST", "/api/external/fetch", values);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "External items fetched successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/external/clothing"] });
      apiForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch external items",
        variant: "destructive",
      });
    },
  });

  const addUrlsMutation = useMutation({
    mutationFn: async (values: z.infer<typeof urlFormSchema>) => {
      const res = await apiRequest(
        "POST",
        `/api/clothing/${values.itemId}/shopping-links`,
        { externalUrls: values.externalUrls }
      );
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Shopping links added successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/clothing"] });
      urlForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add shopping links",
        variant: "destructive",
      });
    },
  });

  // Form submit handlers
  const onApiSubmit = (values: z.infer<typeof apiFormSchema>) => {
    fetchExternalMutation.mutate(values);
  };

  const onUrlSubmit = (values: z.infer<typeof urlFormSchema>) => {
    addUrlsMutation.mutate(values);
  };

  // Loading check
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Auth check
  if (!user) {
    return <Redirect to="/auth" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <CategoryTabs />

      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Manage external API integrations and shopping links</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>External API</span>
            </TabsTrigger>
            <TabsTrigger value="urls" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span>Shopping Links</span>
            </TabsTrigger>
          </TabsList>

          {/* External API Tab */}
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>Fetch Items from External API</CardTitle>
                <CardDescription>Connect to external fashion APIs to expand your inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...apiForm}>
                  <form onSubmit={apiForm.handleSubmit(onApiSubmit)} className="space-y-4">
                    <FormField
                      control={apiForm.control}
                      name="apiKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Key</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter API key" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={apiForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="tops, pants, dresses, etc."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={apiForm.control}
                      name="limit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Limit</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              max={50}
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={fetchExternalMutation.isPending}
                    >
                      {fetchExternalMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Fetching...
                        </>
                      ) : (
                        <>Fetch Items</>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* External Items Display */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">External Items</h2>
              {isLoadingExternal ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : externalItems.length === 0 ? (
                <Alert>
                  <AlertTitle>No external items</AlertTitle>
                  <AlertDescription>
                    Use the form above to fetch items from external APIs.
                  </AlertDescription>
                </Alert>
              ) : (
                <ItemCarousel 
                  title="External Items" 
                  items={externalItems.map((item: any) => ({ item }))}
                />
              )}
            </div>
          </TabsContent>

          {/* Shopping Links Tab */}
          <TabsContent value="urls">
            <Card>
              <CardHeader>
                <CardTitle>Add Shopping Links</CardTitle>
                <CardDescription>Add links to online stores for existing items</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...urlForm}>
                  <form onSubmit={urlForm.handleSubmit(onUrlSubmit)} className="space-y-4">
                    <FormField
                      control={urlForm.control}
                      name="itemId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Item ID</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              placeholder="Enter item ID"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator className="my-4" />
                    <h3 className="text-lg font-medium mb-2">Shopping Links</h3>

                    <FormField
                      control={urlForm.control}
                      name="externalUrls.amazon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amazon</FormLabel>
                          <FormControl>
                            <Input placeholder="https://amazon.in/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={urlForm.control}
                      name="externalUrls.flipkart"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Flipkart</FormLabel>
                          <FormControl>
                            <Input placeholder="https://flipkart.com/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={urlForm.control}
                      name="externalUrls.myntra"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Myntra</FormLabel>
                          <FormControl>
                            <Input placeholder="https://myntra.com/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={urlForm.control}
                      name="externalUrls.ajio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ajio</FormLabel>
                          <FormControl>
                            <Input placeholder="https://ajio.com/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={addUrlsMutation.isPending}
                    >
                      {addUrlsMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>Add Shopping Links</>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}