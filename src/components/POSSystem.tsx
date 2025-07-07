
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Package, 
  Plus, 
  Minus, 
  Search, 
  Trash2,
  CreditCard,
  Banknote,
  Printer,
  Calculator
} from "lucide-react";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
}

const mockProducts = [
  { id: "1", name: "Paracetamol 500mg", price: 7500, stock: 50 },
  { id: "2", name: "Amoxicillin 250mg", price: 15000, stock: 30 },
  { id: "3", name: "Vitamin C 1000mg", price: 25000, stock: 20 },
  { id: "4", name: "Ibuprofen 400mg", price: 12000, stock: 25 },
  { id: "5", name: "Antasida 500mg", price: 8000, stock: 40 },
  { id: "6", name: "Betadine 15ml", price: 18000, stock: 15 },
];

export const POSSystem = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customerMoney, setCustomerMoney] = useState("");

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: typeof mockProducts[0]) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        toast.error("Stok tidak mencukupi");
      }
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        stock: product.stock
      }]);
    }
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id);
      return;
    }

    const item = cart.find(item => item.id === id);
    if (item && newQuantity <= item.stock) {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    } else {
      toast.error("Stok tidak mencukupi");
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setCustomerMoney("");
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.1); // 10% tax
  const total = subtotal + tax;
  const change = customerMoney ? Math.max(0, parseInt(customerMoney) - total) : 0;

  const printReceipt = () => {
    const receiptContent = `
      ============================================
                 APOTEK MINI POS
            Jl. Contoh No. 123, Jakarta
               Tel: (021) 12345678
      ============================================
      
      Tanggal: ${new Date().toLocaleString('id-ID')}
      Kasir: Staff Apotek
      
      ============================================
      DETAIL PEMBELIAN:
      ============================================
      ${cart.map(item => 
        `${item.name}\n${item.quantity} x Rp ${item.price.toLocaleString()} = Rp ${(item.quantity * item.price).toLocaleString()}\n`
      ).join('')}
      ============================================
      Subtotal:     Rp ${subtotal.toLocaleString()}
      Pajak (10%):  Rp ${tax.toLocaleString()}
      --------------------------------------------
      TOTAL:        Rp ${total.toLocaleString()}
      
      Bayar:        Rp ${parseInt(customerMoney || '0').toLocaleString()}
      Kembalian:    Rp ${change.toLocaleString()}
      
      ============================================
            Terima kasih atas kunjungan Anda!
               Semoga lekas sembuh
      ============================================
    `;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Nota Pembelian</title>
            <style>
              body { font-family: 'Courier New', monospace; margin: 20px; font-size: 12px; }
              pre { white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <pre>${receiptContent}</pre>
            <script>
              window.onload = function() {
                window.print();
                window.close();
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const processPayment = () => {
    if (!customerMoney || parseInt(customerMoney) < total) {
      toast.error("Uang pembayaran tidak mencukupi");
      return;
    }

    if (cart.length === 0) {
      toast.error("Keranjang kosong");
      return;
    }

    // Process the payment
    toast.success(`Transaksi berhasil! Kembalian: Rp ${change.toLocaleString()}`);
    
    // Print receipt
    printReceipt();
    
    // Clear cart after successful payment
    clearCart();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Sistem POS
          </h2>
          <p className="text-gray-600">Point of Sale - Transaksi Penjualan</p>
        </div>
        <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
          Cabang Utama
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - POS Interface */}
        <div className="space-y-4">
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Package className="w-5 h-5" />
                Pilih Produk
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Cari produk..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => addToCart(product)}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-green-600 font-bold">Rp {product.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Stok: {product.stock}</p>
                    </div>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Cart & Checkout */}
        <div className="space-y-4">
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <ShoppingCart className="w-5 h-5" />
                  Keranjang Belanja
                </CardTitle>
                {cart.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCart}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Keranjang kosong</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-green-600 text-sm">Rp {item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 p-0 text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>Rp {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Pajak (10%):</span>
                      <span>Rp {tax.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">Rp {total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="customerMoney">Uang Pelanggan</Label>
                      <Input
                        id="customerMoney"
                        type="number"
                        placeholder="0"
                        value={customerMoney}
                        onChange={(e) => setCustomerMoney(e.target.value)}
                      />
                    </div>

                    {customerMoney && parseInt(customerMoney) >= total && (
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-green-800">Kembalian:</span>
                          <span className="text-lg font-bold text-green-600">
                            Rp {change.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={processPayment}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                        disabled={!customerMoney || parseInt(customerMoney) < total}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Bayar
                      </Button>
                      <Button
                        variant="outline"
                        onClick={printReceipt}
                        disabled={cart.length === 0}
                        className="border-blue-300 text-blue-600 hover:bg-blue-50"
                      >
                        <Printer className="w-4 h-4 mr-2" />
                        Cetak Nota
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
