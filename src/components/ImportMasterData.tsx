import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Upload, 
  Download, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  X,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImportMasterDataProps {
  onDataImport: (data: any[]) => void;
}

interface ValidationError {
  row: number;
  field: string;
  message: string;
}

export const ImportMasterData = ({ onDataImport }: ImportMasterDataProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [validData, setValidData] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const downloadTemplate = () => {
    const templateData = [
      {
        nama_produk: "Paracetamol 500mg",
        sku: "PCM001", 
        stok_awal: 100,
        stok_minimum: 50,
        harga_jual: 7500,
        tanggal_kadaluarsa: "2025-12-15",
        nomor_batch: "BCH001-2024",
        supplier: "PT Pharma Indonesia",
        kategori: "Analgesik"
      },
      {
        nama_produk: "Amoxicillin 250mg",
        sku: "AMX001",
        stok_awal: 50,
        stok_minimum: 30,
        harga_jual: 2500,
        tanggal_kadaluarsa: "2025-08-20", 
        nomor_batch: "BCH002-2024",
        supplier: "PT Antibiotik Nusantara",
        kategori: "Antibiotik"
      }
    ];

    const csvContent = [
      // Header
      Object.keys(templateData[0]).join(','),
      // Data rows
      ...templateData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'template_master_barang.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Template berhasil diunduh",
      description: "Template CSV telah diunduh ke perangkat Anda",
    });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        toast({
          variant: "destructive",
          title: "Format file tidak didukung",
          description: "Harap upload file CSV",
        });
        return;
      }
      setSelectedFile(file);
      setPreviewData([]);
      setValidationErrors([]);
      setValidData([]);
    }
  };

  const parseCSV = (csvText: string): any[] => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',').map(v => v.trim());
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        row._rowNumber = i + 1;
        data.push(row);
      }
    }

    return data;
  };

  const validateData = (data: any[]): { valid: any[], errors: ValidationError[] } => {
    const errors: ValidationError[] = [];
    const valid: any[] = [];

    const requiredFields = ['nama_produk', 'sku', 'stok_awal', 'stok_minimum', 'harga_jual'];

    data.forEach((row, index) => {
      let hasError = false;

      // Check required fields
      requiredFields.forEach(field => {
        if (!row[field] || row[field].toString().trim() === '') {
          errors.push({
            row: row._rowNumber,
            field,
            message: `Field ${field} wajib diisi`
          });
          hasError = true;
        }
      });

      // Validate numeric fields
      const numericFields = ['stok_awal', 'stok_minimum', 'harga_jual'];
      numericFields.forEach(field => {
        if (row[field] && isNaN(Number(row[field]))) {
          errors.push({
            row: row._rowNumber,
            field,
            message: `Field ${field} harus berupa angka`
          });
          hasError = true;
        }
      });

      // Validate date format
      if (row.tanggal_kadaluarsa && isNaN(Date.parse(row.tanggal_kadaluarsa))) {
        errors.push({
          row: row._rowNumber,
          field: 'tanggal_kadaluarsa',
          message: 'Format tanggal tidak valid (gunakan YYYY-MM-DD)'
        });
        hasError = true;
      }

      if (!hasError) {
        valid.push({
          id: Date.now() + index,
          name: row.nama_produk,
          sku: row.sku,
          stock: parseInt(row.stok_awal),
          minStock: parseInt(row.stok_minimum),
          price: parseInt(row.harga_jual),
          status: parseInt(row.stok_awal) <= parseInt(row.stok_minimum) ? 'low' : 'normal',
          expiryDate: row.tanggal_kadaluarsa || '2025-12-31',
          batchNumber: row.nomor_batch || 'AUTO-' + Date.now(),
          supplier: row.supplier || 'Unknown',
          category: row.kategori || 'Umum'
        });
      }
    });

    return { valid, errors };
  };

  const processFile = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const text = await selectedFile.text();
      setUploadProgress(30);

      const parsedData = parseCSV(text);
      setPreviewData(parsedData);
      setUploadProgress(60);

      const { valid, errors } = validateData(parsedData);
      setValidData(valid);
      setValidationErrors(errors);
      setUploadProgress(100);

      toast({
        title: "File berhasil diproses",
        description: `${valid.length} data valid, ${errors.length} error ditemukan`,
      });

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error memproses file",
        description: "Terjadi kesalahan saat membaca file CSV",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const importData = () => {
    if (validData.length === 0) {
      toast({
        variant: "destructive",
        title: "Tidak ada data valid",
        description: "Perbaiki error validasi terlebih dahulu",
      });
      return;
    }

    onDataImport(validData);
    
    // Reset form
    setSelectedFile(null);
    setPreviewData([]);
    setValidationErrors([]);
    setValidData([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    toast({
      title: "Data berhasil diimpor",
      description: `${validData.length} produk telah ditambahkan ke database`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Import Data Master Barang</h3>
        <p className="text-gray-600">Upload file CSV untuk menambah data produk secara massal</p>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Data</TabsTrigger>
          <TabsTrigger value="template">Template & Panduan</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* File Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload File CSV
              </CardTitle>
              <CardDescription>
                Pilih file CSV yang berisi data master barang
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="file-upload">File CSV</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".csv"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="mt-1"
                />
              </div>

              {selectedFile && (
                <Alert>
                  <FileText className="h-4 w-4" />
                  <AlertDescription>
                    File terpilih: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </AlertDescription>
                </Alert>
              )}

              {isUploading && (
                <div className="space-y-2">
                  <Label>Memproses file...</Label>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  onClick={processFile} 
                  disabled={!selectedFile || isUploading}
                  className="flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Proses File
                </Button>
                
                {validData.length > 0 && (
                  <Button 
                    onClick={importData}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Import Data ({validData.length})
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Validation Results */}
          {(validationErrors.length > 0 || validData.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Hasil Validasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-medium">{validData.length} Data Valid</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-red-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-700 font-medium">{validationErrors.length} Error</span>
                  </div>
                </div>

                {validationErrors.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-red-700">Error Ditemukan:</h4>
                    <div className="max-h-48 overflow-y-auto space-y-1">
                      {validationErrors.map((error, index) => (
                        <Alert key={index} variant="destructive" className="py-2">
                          <X className="h-4 w-4" />
                          <AlertDescription className="text-sm">
                            Baris {error.row}: {error.message} ({error.field})
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="template" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download Template
              </CardTitle>
              <CardDescription>
                Unduh template CSV untuk memudahkan import data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={downloadTemplate} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Template CSV
              </Button>

              <div className="space-y-4">
                <h4 className="font-medium">Format Template:</h4>
                <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Field</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead>Wajib</TableHead>
                        <TableHead>Format</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">nama_produk</TableCell>
                        <TableCell>Nama lengkap produk</TableCell>
                        <TableCell className="text-red-600">Ya</TableCell>
                        <TableCell>Text</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">sku</TableCell>
                        <TableCell>Kode SKU unik</TableCell>
                        <TableCell className="text-red-600">Ya</TableCell>
                        <TableCell>Text</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">stok_awal</TableCell>
                        <TableCell>Jumlah stok awal</TableCell>
                        <TableCell className="text-red-600">Ya</TableCell>
                        <TableCell>Angka</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">stok_minimum</TableCell>
                        <TableCell>Batas minimum stok</TableCell>
                        <TableCell className="text-red-600">Ya</TableCell>
                        <TableCell>Angka</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">harga_jual</TableCell>
                        <TableCell>Harga jual produk</TableCell>
                        <TableCell className="text-red-600">Ya</TableCell>
                        <TableCell>Angka</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">tanggal_kadaluarsa</TableCell>
                        <TableCell>Tanggal kadaluarsa</TableCell>
                        <TableCell className="text-gray-500">Tidak</TableCell>
                        <TableCell>YYYY-MM-DD</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">nomor_batch</TableCell>
                        <TableCell>Nomor batch produk</TableCell>
                        <TableCell className="text-gray-500">Tidak</TableCell>
                        <TableCell>Text</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">supplier</TableCell>
                        <TableCell>Nama supplier</TableCell>
                        <TableCell className="text-gray-500">Tidak</TableCell>
                        <TableCell>Text</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">kategori</TableCell>
                        <TableCell>Kategori produk</TableCell>
                        <TableCell className="text-gray-500">Tidak</TableCell>
                        <TableCell>Text</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};