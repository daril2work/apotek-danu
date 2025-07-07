
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  className?: string;
}

export const StatsCard = ({ title, value, icon, trend, className }: StatsCardProps) => {
  const isPositive = trend?.startsWith('+');
  
  return (
    <Card className={cn("border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium opacity-90">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
              <div className="flex items-center gap-1">
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{trend}</span>
              </div>
            )}
          </div>
          <div className="opacity-80">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
