
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { POSSystem } from "@/components/POSSystem";
import { StockManagement } from "@/components/StockManagement";
import { AIConsultation } from "@/components/AIConsultation";
import { ReportsView } from "@/components/ReportsView";
import { UserProvider } from "@/contexts/UserContext";

const BranchDashboard = () => {
  const [activeTab, setActiveTab] = useState("transactions");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} p-6`}>
          <div className="max-w-7xl mx-auto">
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

const BranchPage = () => {
  return (
    <UserProvider>
      <BranchDashboard />
    </UserProvider>
  );
};

export default BranchPage;
