
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { PackagePlus, Calendar, Truck } from "lucide-react";
import { toast } from "sonner";

interface StockReceivingProps {
  onStockUpdate: (productId: string, quantity: number) => void;
}

export const StockReceiving = ({ onStockUpdate }: StockReceivingProps) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [supplier, setSupplier] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [notes, setNotes] = useState("");

  const products = [
    { id: "1", name: "Paracetamol 500mg", sku: "PCM001" },
    { id: "2", name: "Amoxicillin 250mg", sku: "AMX001" },
    { id: "3", name: "Vitamin C 1000mg", sku: "VTC001" },
    { id: "4", name: "Ibuprofen 400mg", sku: "IBU001" },
    { id: "5", name: "Cetirizine 10mg", sku: "CTZ001" },
  ];

  const suppliers = [
    "PT Kimia Farma",
    "PT Kalbe Farma",
    "PT Sanbe Farma",
    "PT Dexa Medica",
    "PT Guardian Pharmatama"
  ];

  const handleSubmit = () => {
    if (!selectedProduct || !quantity || !purchasePrice || !sellingPrice || !supplier || !expiryDate || !batchNumber) {
      toast.error("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    const quantityNum = parseInt(quantity);
    const purchasePriceNum = parseInt(purchasePrice);
    const totalCost = quantityNum * purchasePriceNum;

    // Update stock
    onStockUpdate(selectedProduct, quantityNum);

    toast.success(`Penerimaan barang berhasil dicatat! 
      ${quantityNum} unit ditambahkan ke stok.
      Total biaya: Rp ${totalCost.toLocaleString()}`);

    // Reset form
    setSelectedProduct("");
    setQuantity("");
    setPurchasePrice("");
    setSellingPrice("");
    setSupplier("");
    setExpiryDate("");
    setBatchNumber("");
    setNotes("");
  };

  const selectedProductData = products.find(p => p.id === selectedProduct);

  return (
    <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-600">
          <PackagePlus className="w-5 h-5" />
          Penerimaan Barang
        </CardTitle>
        <CardDescription>
          Catat penerimaan stok baru dari supplier
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="product">Produk *</Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih produk" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} ({product.sku})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier">Supplier *</Label>
            <Select value={supplier} onValueChange={setSupplier}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((sup) => (
                  <SelectItem key={sup} value={sup}>
                    {sup}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Jumlah *</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="purchase-price">Harga Beli (per unit) *</Label>
            <Input
              id="purchase-price"
              type="number"
              placeholder="0"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              min="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="selling-price">Harga Jual (per unit) *</Label>
            <Input
              id="selling-price"
              type="number"
              placeholder="0"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry-date">Tanggal Kadaluarsa *</Label>
            <Input
              id="expiry-date"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="batch-number">Nomor Batch *</Label>
            <Input
              id="batch-number"
              placeholder="Contoh: BCH001-2024"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Catatan</Label>
          <Textarea
            id="notes"
            placeholder="Catatan tambahan (opsional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        {selectedProductData && quantity && purchasePrice && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-blue-800">Produk:</span>
                <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                  {selectedProductData.name}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-blue-800">Total Biaya:</span>
                <span className="text-xl font-bold text-blue-600">
                  Rp {(parseInt(quantity) * parseInt(purchasePrice)).toLocaleString()}
                </span>
              </div>
              {sellingPrice && (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-blue-800">Estimasi Keuntungan per Unit:</span>
                  <span className="text-lg font-semibold text-green-600">
                    Rp {(parseInt(sellingPrice) - parseInt(purchasePrice)).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <Button 
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          size="lg"
        >
          <Truck className="w-4 h-4 mr-2" />
          Catat Penerimaan Barang
        </Button>
      </CardContent>
    </Card>
  );
};
