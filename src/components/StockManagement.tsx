import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package, Search, AlertTriangle, Plus, Edit, Eye, PackagePlus, Building2, Upload } from "lucide-react";
import { StockReceiving } from "./StockReceiving";
import { SupplierManagement } from "./SupplierManagement";
import { ImportMasterData } from "./ImportMasterData";

export const StockManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [stockData, setStockData] = useState([
    { 
      id: 1, 
      name: "Paracetamol 500mg", 
      sku: "PCM001", 
      stock: 150, 
      minStock: 50, 
      price: 7500, 
      status: "normal",
      expiryDate: "2025-12-15",
      batchNumber: "BCH001-2024"
    },
    { 
      id: 2, 
      name: "Amoxicillin 250mg", 
      sku: "AMX001", 
      stock: 25, 
      minStock: 30, 
      price: 2500, 
      status: "low",
      expiryDate: "2025-08-20",
      batchNumber: "BCH002-2024"
    },
    { 
      id: 3, 
      name: "Vitamin C 1000mg", 
      sku: "VTC001", 
      stock: 80, 
      minStock: 40, 
      price: 25000, 
      status: "normal",
      expiryDate: "2026-03-10",
      batchNumber: "BCH003-2024"
    },
    { 
      id: 4, 
      name: "Ibuprofen 400mg", 
      sku: "IBU001", 
      stock: 5, 
      minStock: 20, 
      price: 12000, 
      status: "critical",
      expiryDate: "2025-06-30",
      batchNumber: "BCH004-2024"
    },
    { 
      id: 5, 
      name: "Cetirizine 10mg", 
      sku: "CTZ001", 
      stock: 45, 
      minStock: 25, 
      price: 8000, 
      status: "normal",
      expiryDate: "2025-11-25",
      batchNumber: "BCH005-2024"
    },
  ]);

  const handleStockUpdate = (productId: string, addedQuantity: number) => {
    setStockData(prevData => 
      prevData.map(item => {
        if (item.id.toString() === productId) {
          const newStock = item.stock + addedQuantity;
          let newStatus = "normal";
          
          if (newStock <= item.minStock * 0.5) {
            newStatus = "critical";
          } else if (newStock <= item.minStock) {
            newStatus = "low";
          }
          
          return {
            ...item,
            stock: newStock,
            status: newStatus
          };
        }
        return item;
      })
    );
  };

  const handleDataImport = (importedData: any[]) => {
    setStockData(prevData => [...prevData, ...importedData]);
  };

  const filteredStock = stockData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string, stock: number) => {
    switch (status) {
      case "critical":
        return <Badge variant="destructive" className="gap-1"><AlertTriangle className="w-3 h-3" />Kritis</Badge>;
      case "low":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-300">Rendah</Badge>;
      default:
        return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">Normal</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const isExpiringSoon = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 90; // Consider expiring if within 90 days
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Manajemen Stok
          </h2>
          <p className="text-gray-600">Kelola stok obat per cabang</p>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Produk
        </Button>
      </div>

      <Tabs defaultValue="stock-list" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="stock-list" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Daftar Stok
          </TabsTrigger>
          <TabsTrigger value="receiving" className="flex items-center gap-2">
            <PackagePlus className="w-4 h-4" />
            Penerimaan Barang
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Kelola Supplier
          </TabsTrigger>
          <TabsTrigger value="import" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import Data
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stock-list" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Produk</p>
                    <p className="text-xl font-bold">{stockData.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Stok Normal</p>
                    <p className="text-xl font-bold">{stockData.filter(item => item.status === 'normal').length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Stok Rendah</p>
                    <p className="text-xl font-bold">{stockData.filter(item => item.status === 'low').length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Akan Kadaluarsa</p>
                    <p className="text-xl font-bold">{stockData.filter(item => isExpiringSoon(item.expiryDate)).length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Daftar Stok Produk</CardTitle>
              <CardDescription>Monitoring stok obat di cabang ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari produk, SKU, atau nomor batch..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Produk</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>No. Batch</TableHead>
                      <TableHead>Stok</TableHead>
                      <TableHead>Min. Stok</TableHead>
                      <TableHead>Tanggal Kadaluarsa</TableHead>
                      <TableHead>Harga</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStock.map((item) => (
                      <TableRow key={item.id} className="hover:bg-gray-50/50">
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="text-gray-600">{item.sku}</TableCell>
                        <TableCell className="text-gray-600 font-mono text-sm">{item.batchNumber}</TableCell>
                        <TableCell>
                          <span className={`font-medium ${
                            item.status === 'critical' ? 'text-red-600' : 
                            item.status === 'low' ? 'text-orange-600' : 'text-green-600'
                          }`}>
                            {item.stock}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-600">{item.minStock}</TableCell>
                        <TableCell>
                          <span className={`text-sm ${
                            isExpiringSoon(item.expiryDate) ? 'text-orange-600 font-medium' : 'text-gray-600'
                          }`}>
                            {formatDate(item.expiryDate)}
                          </span>
                          {isExpiringSoon(item.expiryDate) && (
                            <Badge variant="outline" className="ml-2 bg-orange-100 text-orange-700 border-orange-300 text-xs">
                              Segera Kadaluarsa
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>Rp {item.price.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(item.status, item.stock)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receiving">
          <StockReceiving onStockUpdate={handleStockUpdate} />
        </TabsContent>

        <TabsContent value="suppliers">
          <SupplierManagement />
        </TabsContent>

        <TabsContent value="import">
          <ImportMasterData onDataImport={handleDataImport} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
