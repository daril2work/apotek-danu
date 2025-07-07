
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard,
  ShoppingCart,
  Package,
  Stethoscope,
  BarChart3,
  Settings,
  Users,
  Building2,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar = ({ isOpen, activeTab, onTabChange }: SidebarProps) => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: "transactions",
      label: "Transaksi",
      icon: ShoppingCart,
      badge: "2"
    },
    {
      id: "stock",
      label: "Manajemen Stok",
      icon: Package,
      badge: null
    },
    {
      id: "ai-consultation",
      label: "Konsultasi AI",
      icon: Stethoscope,
      badge: "NEW"
    },
    {
      id: "reports",
      label: "Laporan",
      icon: BarChart3,
      badge: null
    },
    {
      id: "branches",
      label: "Cabang",
      icon: Building2,
      badge: null
    },
    {
      id: "users",
      label: "Pengguna",
      icon: Users,
      badge: null
    },
    {
      id: "settings",
      label: "Pengaturan",
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside className={cn(
      "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/90 backdrop-blur-sm border-r border-gray-200 transition-all duration-300 z-40",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-12 transition-all duration-200",
                  isActive 
                    ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg" 
                    : "hover:bg-gray-100 text-gray-700",
                  !isOpen && "px-2"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className={cn("w-5 h-5", !isOpen && "mx-auto")} />
                {isOpen && (
                  <>
                    <span className="flex-1 text-left text-sm font-medium">
                      {item.label}
                    </span>
                    {item.badge && (
                      <Badge 
                        variant={isActive ? "secondary" : "outline"}
                        className={cn(
                          "text-xs px-2 py-0.5",
                          isActive 
                            ? "bg-white/20 text-white border-white/30" 
                            : "bg-green-100 text-green-700 border-green-300",
                          item.badge === "NEW" && "bg-orange-100 text-orange-700 border-orange-300"
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {isActive && (
                      <ChevronRight className="w-4 h-4 opacity-70" />
                    )}
                  </>
                )}
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
