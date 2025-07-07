
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package, Plus, Search } from "lucide-react";
import { toast } from "sonner";

export const TransactionForm = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (type: 'sale' | 'purchase') => {
    if (!selectedProduct || !quantity || !price) {
      toast.error("Mohon lengkapi semua field");
      return;
    }

    const total = parseInt(quantity) * parseInt(price);
    toast.success(`Transaksi ${type === 'sale' ? 'penjualan' : 'pembelian'} berhasil dicatat! Total: Rp ${total.toLocaleString()}`);
    
    // Reset form
    setSelectedProduct("");
    setQuantity("");
    setPrice("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Transaksi
          </h2>
          <p className="text-gray-600">Catat transaksi penjualan dan pembelian</p>
        </div>
        <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
          Cabang Utama
        </Badge>
      </div>

      <Tabs defaultValue="sale" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100">
          <TabsTrigger value="sale" className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Penjualan
          </TabsTrigger>
          <TabsTrigger value="purchase" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Pembelian
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sale">
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <ShoppingCart className="w-5 h-5" />
                Transaksi Penjualan
              </CardTitle>
              <CardDescription>
                Catat penjualan obat kepada customer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="product-sale">Produk</Label>
                  <div className="flex gap-2">
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih produk" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paracetamol">Paracetamol 500mg</SelectItem>
                        <SelectItem value="amoxicillin">Amoxicillin 250mg</SelectItem>
                        <SelectItem value="vitamin-c">Vitamin C 1000mg</SelectItem>
                        <SelectItem value="ibuprofen">Ibuprofen 400mg</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity-sale">Jumlah</Label>
                    <Input
                      id="quantity-sale"
                      type="number"
                      placeholder="0"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price-sale">Harga per Unit</Label>
                    <Input
                      id="price-sale"
                      type="number"
                      placeholder="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>

                {quantity && price && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-green-800">Total Penjualan:</span>
                      <span className="text-xl font-bold text-green-600">
                        Rp {(parseInt(quantity) * parseInt(price)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <Button 
                onClick={() => handleSubmit('sale')}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Catat Penjualan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchase">
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Package className="w-5 h-5" />
                Transaksi Pembelian
              </CardTitle>
              <CardDescription>
                Catat pembelian stok dari supplier
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="product-purchase">Produk</Label>
                  <div className="flex gap-2">
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih produk" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paracetamol">Paracetamol 500mg</SelectItem>
                        <SelectItem value="amoxicillin">Amoxicillin 250mg</SelectItem>
                        <SelectItem value="vitamin-c">Vitamin C 1000mg</SelectItem>
                        <SelectItem value="ibuprofen">Ibuprofen 400mg</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity-purchase">Jumlah</Label>
                    <Input
                      id="quantity-purchase"
                      type="number"
                      placeholder="0"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price-purchase">Harga per Unit</Label>
                    <Input
                      id="price-purchase"
                      type="number"
                      placeholder="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>

                {quantity && price && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-blue-800">Total Pembelian:</span>
                      <span className="text-xl font-bold text-blue-600">
                        Rp {(parseInt(quantity) * parseInt(price)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <Button 
                onClick={() => handleSubmit('purchase')}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Catat Pembelian
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
