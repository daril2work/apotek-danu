
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Stethoscope, 
  MessageSquare, 
  Pill, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Send,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

export const AIConsultation = () => {
  const [interactionQuery, setInteractionQuery] = useState("");
  const [doseQuery, setDoseQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInteractionCheck = async () => {
    if (!interactionQuery.trim()) {
      toast.error("Mohon masukkan nama obat yang ingin dicek");
      return;
    }

    setLoading(true);
    
    // Simulate AI API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Konsultasi berhasil! Lihat hasil di bawah.");
    }, 2000);
  };

  const handleDoseCheck = async () => {
    if (!doseQuery.trim()) {
      toast.error("Mohon masukkan pertanyaan tentang dosis");
      return;
    }

    setLoading(true);
    
    // Simulate AI API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Konsultasi berhasil! Lihat hasil di bawah.");
    }, 2000);
  };

  const consultationHistory = [
    {
      id: 1,
      type: "interaction",
      query: "Interaksi antara Paracetamol dan Ibuprofen",
      response: "Tidak ada interaksi signifikan antara Paracetamol dan Ibuprofen. Keduanya dapat digunakan bersamaan dengan aman.",
      timestamp: "2 jam yang lalu",
      status: "safe"
    },
    {
      id: 2,
      type: "dose",
      query: "Dosis Amoxicillin untuk anak 5 tahun",
      response: "Dosis Amoxicillin untuk anak 5 tahun (berat ~18kg) adalah 250mg setiap 8 jam. Konsultasikan dengan dokter untuk dosis yang tepat.",
      timestamp: "1 hari yang lalu",
      status: "warning"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Konsultasi AI
          </h2>
          <p className="text-gray-600">Cek interaksi obat dan dosis dengan AI</p>
        </div>
        <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">
          <Sparkles className="w-4 h-4 mr-1" />
          Powered by AI
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consultation Form */}
        <div className="space-y-6">
          <Tabs defaultValue="interaction" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger value="interaction" className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Cek Interaksi
              </TabsTrigger>
              <TabsTrigger value="dose" className="flex items-center gap-2">
                <Pill className="w-4 h-4" />
                Cek Dosis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="interaction">
              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <AlertTriangle className="w-5 h-5" />
                    Cek Interaksi Obat
                  </CardTitle>
                  <CardDescription>
                    Masukkan nama obat untuk mengecek potensi interaksi
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="interaction-input">Nama Obat</Label>
                    <Input
                      id="interaction-input"
                      placeholder="Contoh: Paracetamol + Ibuprofen"
                      value={interactionQuery}
                      onChange={(e) => setInteractionQuery(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleInteractionCheck}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    {loading ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Menganalisis...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Cek Interaksi
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dose">
              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-600">
                    <Pill className="w-5 h-5" />
                    Cek Dosis Obat
                  </CardTitle>
                  <CardDescription>
                    Tanyakan tentang dosis obat yang tepat
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="dose-input">Pertanyaan</Label>
                    <Textarea
                      id="dose-input"
                      placeholder="Contoh: Berapa dosis Paracetamol untuk anak 3 tahun?"
                      value={doseQuery}
                      onChange={(e) => setDoseQuery(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <Button 
                    onClick={handleDoseCheck}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {loading ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Menganalisis...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Cek Dosis
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* History */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-600" />
              Riwayat Konsultasi
            </CardTitle>
            <CardDescription>
              Konsultasi AI yang pernah dilakukan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultationHistory.map((consultation) => (
                <div 
                  key={consultation.id} 
                  className="p-4 rounded-lg border bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {consultation.type === 'interaction' ? (
                        <AlertTriangle className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Pill className="w-4 h-4 text-purple-600" />
                      )}
                      <span className="font-medium text-sm">
                        {consultation.type === 'interaction' ? 'Interaksi' : 'Dosis'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {consultation.status === 'safe' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                      )}
                      <span className="text-xs text-gray-500">{consultation.timestamp}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-800">{consultation.query}</p>
                    <p className="text-sm text-gray-600">{consultation.response}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
