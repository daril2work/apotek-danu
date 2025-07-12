
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building2, Plus, Edit, Trash2, Search, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  status: "active" | "inactive";
  createdAt: string;
  totalOrders: number;
}

export const SupplierManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: ""
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: "1",
      name: "PT Kimia Farma",
      contactPerson: "Budi Santoso",
      phone: "021-5551234",
      email: "budi@kimiafarma.co.id",
      address: "Jl. Veteran No. 9, Jakarta Pusat",
      status: "active",
      createdAt: "2024-01-15",
      totalOrders: 25
    },
    {
      id: "2", 
      name: "PT Kalbe Farma",
      contactPerson: "Siti Nurhaliza",
      phone: "021-5557890",
      email: "siti@kalbe.co.id",
      address: "Jl. Letjen Suprapto Kav. 4, Jakarta Pusat",
      status: "active",
      createdAt: "2024-01-20",
      totalOrders: 18
    },
    {
      id: "3",
      name: "PT Sanbe Farma",
      contactPerson: "Ahmad Rahman",
      phone: "022-5554567",
      email: "ahmad@sanbe.co.id",
      address: "Jl. Raya Bandung-Garut Km. 11, Bandung",
      status: "inactive",
      createdAt: "2024-02-01",
      totalOrders: 8
    }
  ]);

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.phone.includes(searchTerm)
  );

  const handleSubmit = () => {
    if (!formData.name || !formData.contactPerson || !formData.phone) {
      toast.error("Mohon lengkapi data wajib (nama, kontak person, telepon)");
      return;
    }

    if (editingSupplier) {
      // Update existing supplier
      setSuppliers(prev => prev.map(supplier => 
        supplier.id === editingSupplier.id 
          ? { ...supplier, ...formData }
          : supplier
      ));
      toast.success("Data supplier berhasil diperbarui!");
    } else {
      // Add new supplier
      const newSupplier: Supplier = {
        id: Date.now().toString(),
        ...formData,
        status: "active",
        createdAt: new Date().toISOString().split('T')[0],
        totalOrders: 0
      };
      setSuppliers(prev => [...prev, newSupplier]);
      toast.success("Supplier baru berhasil ditambahkan!");
    }

    // Reset form
    setFormData({
      name: "",
      contactPerson: "",
      phone: "",
      email: "",
      address: ""
    });
    setEditingSupplier(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      name: supplier.name,
      contactPerson: supplier.contactPerson,
      phone: supplier.phone,
      email: supplier.email,
      address: supplier.address
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (supplierId: string) => {
    setSuppliers(prev => prev.filter(supplier => supplier.id !== supplierId));
    toast.success("Supplier berhasil dihapus!");
  };

  const toggleStatus = (supplierId: string) => {
    setSuppliers(prev => prev.map(supplier => 
      supplier.id === supplierId 
        ? { ...supplier, status: supplier.status === "active" ? "inactive" : "active" }
        : supplier
    ));
    toast.success("Status supplier berhasil diubah!");
  };

  const getStatusBadge = (status: string) => {
    return status === "active" 
      ? <Badge className="bg-green-100 text-green-700 border-green-300">Aktif</Badge>
      : <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-300">Tidak Aktif</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Supplier</p>
                <p className="text-xl font-bold">{suppliers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Supplier Aktif</p>
                <p className="text-xl font-bold">{suppliers.filter(s => s.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Pesanan</p>
                <p className="text-xl font-bold">{suppliers.reduce((total, s) => total + s.totalOrders, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Supplier List */}
      <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Manajemen Supplier</CardTitle>
              <CardDescription>Kelola data supplier/penyedia obat</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Supplier
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingSupplier ? 'Edit Supplier' : 'Tambah Supplier Baru'}</DialogTitle>
                  <DialogDescription>
                    {editingSupplier ? 'Perbarui informasi supplier' : 'Masukkan informasi supplier baru'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Supplier *</Label>
                    <Input
                      id="name"
                      placeholder="PT. Contoh Farma"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-person">Kontak Person *</Label>
                    <Input
                      id="contact-person"
                      placeholder="Nama kontak person"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telepon *</Label>
                    <Input
                      id="phone"
                      placeholder="021-1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@supplier.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat</Label>
                    <Input
                      id="address"
                      placeholder="Alamat lengkap"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                  <Button onClick={handleSubmit} className="w-full">
                    {editingSupplier ? 'Perbarui' : 'Tambah'} Supplier
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari supplier..."
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
                  <TableHead>Supplier</TableHead>
                  <TableHead>Kontak</TableHead>
                  <TableHead>Telepon</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Total Pesanan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id} className="hover:bg-gray-50/50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{supplier.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {supplier.address || "Alamat tidak tersedia"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{supplier.contactPerson}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {supplier.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      {supplier.email ? (
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          {supplier.email}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">{supplier.totalOrders}</TableCell>
                    <TableCell>
                      <button onClick={() => toggleStatus(supplier.id)}>
                        {getStatusBadge(supplier.status)}
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(supplier)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDelete(supplier.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
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
    </div>
  );
};
