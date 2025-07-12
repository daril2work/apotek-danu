import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Package, 
  TrendingUp,
  Stethoscope,
  Plus,
  Eye,
  Building2,
  Pill,
  DollarSign
} from "lucide-react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { StatsCard } from "@/components/StatsCard";
import { POSSystem } from "@/components/POSSystem";
import { StockManagement } from "@/components/StockManagement";
import { AIConsultation } from "@/components/AIConsultation";
import { ReportsView } from "@/components/ReportsView";
import { BranchManagement } from "@/components/BranchManagement";
import { UserProvider } from "@/contexts/UserContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock data untuk demo
  const branchStats = {
    totalSales: 12500000,
    totalTransactions: 156,
    totalProducts: 89,
    lowStockItems: 12
  };

  const recentTransactions = [
    { id: 1, type: "sale", product: "Paracetamol 500mg", quantity: 2, total: 15000, time: "10:30" },
    { id: 2, type: "purchase", product: "Amoxicillin 250mg", quantity: 50, total: 125000, time: "09:15" },
    { id: 3, type: "sale", product: "Vitamin C 1000mg", quantity: 1, total: 25000, time: "08:45" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} p-6`}>
          <div className="max-w-7xl mx-auto">
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      Dashboard Owner - Multi Cabang
                    </h1>
                    <p className="text-gray-600 mt-2">Pantau seluruh cabang dari satu dashboard</p>
                  </div>
                  <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">
                    <Building2 className="w-4 h-4 mr-1" />
                    Semua Cabang (3)
                  </Badge>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatsCard
                    title="Total Penjualan Global"
                    value={`Rp ${(branchStats.totalSales * 3).toLocaleString()}`}
                    icon={<DollarSign className="w-6 h-6" />}
                    trend="+15%"
                    className="bg-gradient-to-br from-green-500 to-green-600 text-white"
                  />
                  <StatsCard
                    title="Total Transaksi"
                    value={(branchStats.totalTransactions * 3).toString()}
                    icon={<ShoppingCart className="w-6 h-6" />}
                    trend="+12%"
                    className="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                  />
                  <StatsCard
                    title="Cabang Aktif"
                    value="3"
                    icon={<Building2 className="w-6 h-6" />}
                    trend="Semua online"
                    className="bg-gradient-to-br from-purple-500 to-purple-600 text-white"
                  />
                  <StatsCard
                    title="Total Produk"
                    value={(branchStats.totalProducts * 3).toString()}
                    icon={<Package className="w-6 h-6" />}
                    trend="Semua cabang"
                    className="bg-gradient-to-br from-orange-500 to-orange-600 text-white"
                  />
                </div>

                {/* Recent Transactions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        Transaksi Terbaru
                      </CardTitle>
                      <CardDescription>Aktivitas transaksi hari ini</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentTransactions.map((transaction) => (
                          <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${
                                transaction.type === 'sale' ? 'bg-green-500' : 'bg-blue-500'
                              }`} />
                              <div>
                                <p className="font-medium text-sm">{transaction.product}</p>
                                <p className="text-xs text-gray-500">
                                  {transaction.type === 'sale' ? 'Penjualan' : 'Pembelian'} • {transaction.time}
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

                  <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Stethoscope className="w-5 h-5 text-blue-600" />
                        Konsultasi AI
                      </CardTitle>
                      <CardDescription>Cek interaksi obat dan dosis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Pill className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-sm">Konsultasi Terakhir</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            "Interaksi antara Paracetamol dan Ibuprofen"
                          </p>
                          <p className="text-xs text-gray-500 mt-2">2 jam yang lalu</p>
                        </div>
                        <Button 
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          onClick={() => setActiveTab("ai-consultation")}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Konsultasi Baru
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle>Aksi Cepat</CardTitle>
                    <CardDescription>Shortcut untuk tugas-tugas umum</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button 
                        variant="outline" 
                        className="h-16 flex-col gap-2 hover:bg-green-50 hover:border-green-300"
                        onClick={() => setActiveTab("transactions")}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span className="text-xs">Transaksi Global</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-16 flex-col gap-2 hover:bg-blue-50 hover:border-blue-300"
                        onClick={() => setActiveTab("stock")}
                      >
                        <Package className="w-5 h-5" />
                        <span className="text-xs">Kelola Stok</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-16 flex-col gap-2 hover:bg-purple-50 hover:border-purple-300"
                        onClick={() => setActiveTab("reports")}
                      >
                        <Eye className="w-5 h-5" />
                        <span className="text-xs">Lihat Laporan</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-16 flex-col gap-2 hover:bg-orange-50 hover:border-orange-300"
                        onClick={() => setActiveTab("ai-consultation")}
                      >
                        <Stethoscope className="w-5 h-5" />
                        <span className="text-xs">Konsultasi AI</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "branches" && <BranchManagement />}
            {activeTab === "transactions" && <POSSystem />}
            {activeTab === "stock" && <StockManagement />}
            {activeTab === "ai-consultation" && <AIConsultation />}
            {activeTab === "reports" && <ReportsView />}
          </div>
        </main>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <UserProvider>
      <Dashboard />
    </UserProvider>
  );
};

export default Index;
