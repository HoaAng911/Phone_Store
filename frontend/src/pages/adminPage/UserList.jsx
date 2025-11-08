// src/pages/UserList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import useUserStore from "../store/useUserStore";
import AddUserModal from "../components/AddUserModal";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Edit, Trash2, AlertCircle } from "lucide-react";

export default function UserList() {
  const navigate = useNavigate();
  const { user } = useAuthStore();                     // <-- role
  const { users, loading, error, fetchUsers, deleteUser } = useUserStore();

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // ---- 1. Kiểm tra quyền -------------------------------------------------
  useEffect(() => {
    if (!user) return;                     // chưa login → sẽ bị ProtectedRoute đẩy về login
    if (user.role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
      fetchUsers();
  }, [user, fetchUsers]);

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa người dùng này?")) return;
    await deleteUser(id);
  };
  const handleEdit = (u) => {
    setSelectedUser(u); setOpen(true);
  };
  const handleAdd = () => {
    setSelectedUser(null); setOpen(true);
  };

  // ------------------------------------------------------------------------
  if (!user) return <p className="p-6">Đang tải...</p>;

  // ------------------------------------------------------------------------
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý người dùng</h1>
          <p className="text-muted-foreground mt-1">
            Thêm, sửa, xóa người dùng hệ thống
          </p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="w-4 h-4" /> Thêm người dùng
        </Button>
      </div>

      {/* Modal */}
      <AddUserModal
        open={open}
        setOpen={setOpen}
        selectedUser={selectedUser}
        fetchUsers={fetchUsers}
        setSelectedUser={setSelectedUser}
      />

      {/* Lỗi API */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <Card>
            <CardContent className="p-0">
              <div className="space-y-4 p-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Table */}
      {!loading && (
        <Card>
          <CardHeader>
            <CardTitle>Danh sách người dùng</CardTitle>
            <CardDescription>Tổng: {users.length} người dùng</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16 text-center">ID</TableHead>
                    <TableHead>Tên</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-center">Vai trò</TableHead>
                    <TableHead className="text-center">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id} className="hover:bg-muted/50">
                      <TableCell className="text-center font-medium">{u.id}</TableCell>
                      <TableCell className="font-medium">{u.username ??  "—"}</TableCell>
                      <TableCell className="text-muted-foreground">{u.email}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={u.role === "admin" ? "default" : "secondary"}
                          className={
                            u.role === "admin"
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          }
                        >
                          {u.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-1">
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(u)} title="Sửa">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(u.id)}
                            title="Xóa"
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

            {users.length === 0 && !error && (
              <div className="text-center py-8 text-muted-foreground">
                <p>Chưa có người dùng nào.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}