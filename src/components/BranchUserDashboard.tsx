
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  Clock,
  Target,
  AlertTriangle,
  Plus,
  Eye
} from "lucide-react";
import { StatsCard } from "@/components/StatsCard";

export const BranchUserDashboard = () => {
  // Mock data for branch-specific stats
  const branchStats = {
    todaysSales: 1250000,
    todaysTransactions: 23,
    currentStock: 156,
    lowStockItems: 5,
    dailyTarget: 1500000,
    completionRate: 83
  };

  const recentTransactions = [
    { id: 1, product: "Paracetamol 500mg", quantity: 2, total: 15000, time: "14:30", customer: "Walk-in" },
    { id: 2, product: "Vitamin C 1000mg", quantity: 1, total: 25000, time: "14:15", customer: "Ibu Sari" },
    { id: 3, product: "Amoxicillin 250mg", quantity: 3, total: 45000, time: "13:45", customer: "Bpk Ahmad" },
  ];

  const lowStockItems = [
    { name: "Paracetamol 500mg", current: 8, minimum: 20 },
    { name: "Ibuprofen 400mg", current: 5, minimum: 15 },
    { name: "Vitamin D3", current: 12, minimum: 25 },
  ];

  const completionPercentage = (branchStats.todaysSales / branchStats.dailyTarget) * 100;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Dashboard Cabang
          </h1>
          <p className="text-gray-600 mt-2">Selamat datang di POS Apotek Anda</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
            <Clock className="w-4 h-4 mr-1" />
            Shift: 08:00 - 20:00
          </Badge>
        </div>
      </div>

      {/* Today's Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Penjualan Hari Ini"
          value={`Rp ${branchStats.todaysSales.toLocaleString()}`}
          icon={<ShoppingCart className="w-6 h-6" />}
          trend={`${completionPercentage.toFixed(0)}% dari target`}
          className="bg-gradient-to-br from-green-500 to-green-600 text-white"
        />
        <StatsCard
          title="Transaksi Hari Ini"
          value={branchStats.todaysTransactions.toString()}
          icon={<TrendingUp className="w-6 h-6" />}
          trend="+5 dari kemarin"
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
        />
        <StatsCard
          title="Total Produk"
          value={branchStats.currentStock.toString()}
          icon={<Package className="w-6 h-6" />}
          trend="Update stok"
          className="bg-gradient-to-br from-purple-500 to-purple-600 text-white"
        />
        <StatsCard
          title="Stok Menipis"
          value={branchStats.lowStockItems.toString()}
          icon={<AlertTriangle className="w-6 h-6" />}
          trend="Perlu restock"
          className="bg-gradient-to-br from-orange-500 to-red-500 text-white"
        />
      </div>

      {/* Daily Target Progress */}
      <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Target Harian
          </CardTitle>
          <CardDescription>Progress pencapaian target penjualan hari ini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-lg font-bold text-green-600">
                {completionPercentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(completionPercentage, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Rp {branchStats.todaysSales.toLocaleString()}</span>
              <span>Target: Rp {branchStats.dailyTarget.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Transaksi Terbaru
            </CardTitle>
            <CardDescription>Aktivitas penjualan hari ini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <div>
                      <p className="font-medium text-sm">{transaction.product}</p>
                      <p className="text-xs text-gray-500">
                        {transaction.customer} • {transaction.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">Rp {transaction.total.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Qty: {transaction.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Peringatan Stok
            </CardTitle>
            <CardDescription>Produk yang perlu segera direstock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-orange-50/50 border border-orange-200">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Minimum: {item.minimum} unit
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                      {item.current} tersisa
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions for Branch Users */}
      <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
          <CardDescription>Shortcut untuk tugas harian</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-green-50 hover:border-green-300"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="text-sm">Transaksi Baru</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-blue-50 hover:border-blue-300"
            >
              <Package className="w-6 h-6" />
              <span className="text-sm">Cek Stok</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 hover:bg-purple-50 hover:border-purple-300"
            >
              <Eye className="w-6 h-6" />
              <span className="text-sm">Laporan Harian</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
