
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  Filter,
  Eye,
  DollarSign,
  ShoppingCart,
  Package
} from "lucide-react";

export const ReportsView = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [selectedBranch, setSelectedBranch] = useState("all");

  const salesData = [
    { id: 1, date: "2024-01-07", product: "Paracetamol 500mg", quantity: 15, revenue: 112500, type: "sale" },
    { id: 2, date: "2024-01-07", product: "Vitamin C 1000mg", quantity: 8, revenue: 200000, type: "sale" },
    { id: 3, date: "2024-01-07", product: "Amoxicillin 250mg", quantity: 12, revenue: 30000, type: "sale" },
    { id: 4, date: "2024-01-06", product: "Ibuprofen 400mg", quantity: 20, revenue: 240000, type: "sale" },
  ];

  const purchaseData = [
    { id: 1, date: "2024-01-05", product: "Paracetamol 500mg", quantity: 100, cost: 500000, supplier: "PT. Pharma A" },
    { id: 2, date: "2024-01-04", product: "Vitamin C 1000mg", quantity: 50, cost: 750000, supplier: "PT. Health B" },
  ];

  const summaryStats = {
    totalRevenue: 582500,
    totalSales: 55,
    totalPurchases: 150,
    totalCost: 1250000,
    profit: 582500 - 200000 // estimasi cost of goods sold
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Laporan
          </h2>
          <p className="text-gray-600">Analisis transaksi dan performa apotek</p>
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Pilih cabang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Cabang</SelectItem>
              <SelectItem value="main">Cabang Utama</SelectItem>
              <SelectItem value="branch2">Cabang Kedua</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hari Ini</SelectItem>
              <SelectItem value="week">Minggu Ini</SelectItem>
              <SelectItem value="month">Bulan Ini</SelectItem>
              <SelectItem value="year">Tahun Ini</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-lg font-bold">Rp {summaryStats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Penjualan</p>
                <p className="text-lg font-bold">{summaryStats.totalSales}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pembelian</p>
                <p className="text-lg font-bold">{summaryStats.totalPurchases}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Cost</p>
                <p className="text-lg font-bold">Rp {summaryStats.totalCost.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Profit</p>
                <p className="text-lg font-bold text-green-600">Rp {summaryStats.profit.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100">
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Laporan Penjualan
          </TabsTrigger>
          <TabsTrigger value="purchase" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Laporan Pembelian
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <ShoppingCart className="w-5 h-5" />
                Transaksi Penjualan
              </CardTitle>
              <CardDescription>
                Detail transaksi penjualan periode {selectedPeriod}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Produk</TableHead>
                      <TableHead>Jumlah</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesData.map((item) => (
                      <TableRow key={item.id} className="hover:bg-gray-50/50">
                        <TableCell>{item.date}</TableCell>
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell className="font-medium text-green-600">
                          Rp {item.revenue.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                            Selesai
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
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
                Detail transaksi pembelian periode {selectedPeriod}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Produk</TableHead>
                      <TableHead>Jumlah</TableHead>
                      <TableHead>Biaya</TableHead>
                      <TableHead>Supplier</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchaseData.map((item) => (
                      <TableRow key={item.id} className="hover:bg-gray-50/50">
                        <TableCell>{item.date}</TableCell>
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell className="font-medium text-blue-600">
                          Rp {item.cost.toLocaleString()}
                        </TableCell>
                        <TableCell>{item.supplier}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
