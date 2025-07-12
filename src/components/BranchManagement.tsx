
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Building2, 
  Plus, 
  MapPin, 
  Phone, 
  Edit2, 
  Trash2, 
  Eye,
  Calendar,
  Users,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  manager: string;
  email: string;
  status: 'active' | 'inactive';
  openingDate: string;
  totalStaff: number;
  monthlySales: number;
}

export const BranchManagement = () => {
  const { toast } = useToast();
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: '1',
      name: 'Apotek Sehat Utama',
      address: 'Jl. Sudirman No. 123',
      city: 'Jakarta Pusat',
      phone: '021-12345678',
      manager: 'Dr. Ahmad Santoso',
      email: 'utama@apoteksehat.com',
      status: 'active',
      openingDate: '2023-01-15',
      totalStaff: 8,
      monthlySales: 45000000
    },
    {
      id: '2',
      name: 'Apotek Sehat Kemang',
      address: 'Jl. Kemang Raya No. 456',
      city: 'Jakarta Selatan',
      phone: '021-87654321',
      manager: 'dr. Siti Nurhaliza',
      email: 'kemang@apoteksehat.com',
      status: 'active',
      openingDate: '2023-06-10',
      totalStaff: 6,
      monthlySales: 32000000
    },
    {
      id: '3',
      name: 'Apotek Sehat Bekasi',
      address: 'Jl. Ahmad Yani No. 789',
      city: 'Bekasi',
      phone: '021-11223344',
      manager: 'dr. Budi Hartono',
      email: 'bekasi@apoteksehat.com',
      status: 'inactive',
      openingDate: '2023-11-01',
      totalStaff: 4,
      monthlySales: 18000000
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    phone: '',
    manager: '',
    email: '',
    status: 'active' as 'active' | 'inactive'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      city: '',
      phone: '',
      manager: '',
      email: '',
      status: 'active'
    });
    setEditingBranch(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBranch) {
      // Update existing branch
      setBranches(prev => prev.map(branch => 
        branch.id === editingBranch.id 
          ? { ...branch, ...formData }
          : branch
      ));
      toast({
        title: "Cabang berhasil diperbarui",
        description: `${formData.name} telah diperbarui.`,
      });
    } else {
      // Add new branch
      const newBranch: Branch = {
        id: Date.now().toString(),
        ...formData,
        openingDate: new Date().toISOString().split('T')[0],
        totalStaff: 0,
        monthlySales: 0
      };
      setBranches(prev => [...prev, newBranch]);
      toast({
        title: "Cabang baru berhasil ditambahkan",
        description: `${formData.name} telah ditambahkan ke sistem.`,
      });
    }

    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEdit = (branch: Branch) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name,
      address: branch.address,
      city: branch.city,
      phone: branch.phone,
      manager: branch.manager,
      email: branch.email,
      status: branch.status
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (branchId: string) => {
    setBranches(prev => prev.filter(branch => branch.id !== branchId));
    toast({
      title: "Cabang berhasil dihapus",
      description: "Cabang telah dihapus dari sistem.",
      variant: "destructive"
    });
  };

  const toggleStatus = (branchId: string) => {
    setBranches(prev => prev.map(branch => 
      branch.id === branchId 
        ? { ...branch, status: branch.status === 'active' ? 'inactive' : 'active' }
        : branch
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Manajemen Cabang
          </h1>
          <p className="text-gray-600 mt-2">Kelola semua cabang apotek Anda</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Cabang
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingBranch ? 'Edit Cabang' : 'Tambah Cabang Baru'}
              </DialogTitle>
              <DialogDescription>
                {editingBranch ? 'Perbarui informasi cabang' : 'Masukkan informasi cabang baru'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Cabang *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Apotek Sehat Cabang..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Kota *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Jakarta"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Alamat Lengkap *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Jl. Contoh No. 123, Kelurahan, Kecamatan"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="021-12345678"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="cabang@apoteksehat.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manager">Manager/Penanggung Jawab</Label>
                <Input
                  id="manager"
                  value={formData.manager}
                  onChange={(e) => setFormData(prev => ({ ...prev, manager: e.target.value }))}
                  placeholder="dr. Nama Manager"
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit">
                  {editingBranch ? 'Perbarui' : 'Tambah'} Cabang
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cabang</p>
                <p className="text-2xl font-bold text-green-600">{branches.length}</p>
              </div>
              <Building2 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cabang Aktif</p>
                <p className="text-2xl font-bold text-blue-600">
                  {branches.filter(b => b.status === 'active').length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold text-purple-600">
                  {branches.reduce((sum, branch) => sum + branch.totalStaff, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Penjualan Bulan Ini</p>
                <p className="text-2xl font-bold text-orange-600">
                  Rp {(branches.reduce((sum, branch) => sum + branch.monthlySales, 0) / 1000000).toFixed(1)}M
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Branches Table */}
      <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-green-600" />
            Daftar Cabang
          </CardTitle>
          <CardDescription>Kelola semua informasi cabang apotek</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Cabang</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Kontak</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Staff</TableHead>
                <TableHead>Penjualan/Bulan</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{branch.name}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Dibuka: {new Date(branch.openingDate).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-1">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm">{branch.address}</p>
                        <p className="text-xs text-gray-500">{branch.city}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{branch.manager || '-'}</p>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {branch.phone}
                      </p>
                      {branch.email && (
                        <p className="text-gray-500">{branch.email}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={branch.status === 'active' ? 'default' : 'secondary'}
                      className={branch.status === 'active' 
                        ? 'bg-green-100 text-green-700 border-green-300' 
                        : 'bg-gray-100 text-gray-700 border-gray-300'
                      }
                    >
                      {branch.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{branch.totalStaff} orang</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">
                      Rp {(branch.monthlySales / 1000000).toFixed(1)}M
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(branch)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleStatus(branch.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(branch.id)}
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
        </CardContent>
      </Card>
    </div>
  );
};
