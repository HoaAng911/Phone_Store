
import { useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import AddUserModal from "../components/AddUserModal";

/**
 * 🧩 Component: UserList
 * Quản lý hiển thị danh sách người dùng + thêm/sửa/xóa người dùng.
 * Sử dụng Zustand để quản lý dữ liệu người dùng toàn cục.
 */
export default function UserList() {
  // 📦 Lấy state & action từ Zustand store
  const { users, fetchUsers, loading, deleteUser } = useUserStore();

  // 🧠 Quản lý trạng thái modal và người dùng được chọn
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  /**
   *  useEffect: Gọi API fetch danh sách người dùng khi component mount
   *  - Chạy 1 lần đầu tiên khi trang load
   */
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  /**
   *  Xử lý xóa người dùng
   *  - Hiện hộp thoại xác nhận
   *  - Sau khi xóa thành công thì fetch lại danh sách
   */
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      await deleteUser(id);
      fetchUsers(); // reload danh sách
    }
  };

  /**
   *  Mở modal sửa người dùng
   *  - Gán `selectedUser` để modal hiển thị thông tin hiện tại
   */
  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  /**
   * Mở modal thêm người dùng
   *  - Xóa `selectedUser` để modal hiển thị form rỗng
   */
  const handleAdd = () => {
    setSelectedUser(null);
    setOpen(true);
  };

  //  Hiển thị trạng thái loading
  if (loading) {
    return <p className="text-center mt-4">Đang tải...</p>;
  }

  return (
    <div className=" ">
      {/*  Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Danh sách người dùng
        </h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors"
        >
          Thêm
        </button>
      </div>

      {/*  Modal thêm/sửa người dùng */}
      <AddUserModal
        open={open}
        setOpen={setOpen}
        selectedUser={selectedUser}
        fetchUsers={fetchUsers}
        setSelectedUser={setSelectedUser}
      />

      {/*  Bảng hiển thị danh sách người dùng */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-blue-950 text-white uppercase text-sm">
            <tr className="text-center">
              <th className="p-3">ID</th>
              <th className="p-3">Tên</th>
              <th className="p-3">Email</th>
              <th className="p-3">Vai trò</th>
              <th className="p-3">Hành động</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {users.map((user) => (
              <tr
                key={user.id}
                className="text-center hover:bg-gray-100 transition-colors"
              >
                <td className="p-3">{user.id}</td>
                <td className="p-3 font-medium text-gray-800">{user.name}</td>
                <td className="p-3 text-gray-600">{user.email}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user.role === "admin"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md transition"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md transition"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Trường hợp không có người dùng */}
        {users.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            Không có người dùng nào.
          </p>
        )}
      </div>
    </div>
  );
}
