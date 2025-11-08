import React, { useEffect, useState } from 'react';
import useUserStore from '../store/useUserStore';

const AddUserModal = ({ open, setOpen, selectedUser, setSelectedUser }) => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const [errors, setErrors] = useState({}); 
  const createUser = useUserStore((state) => state.createUser);
  const updateUser = useUserStore((state) => state.updateUser);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const isEdit = !!selectedUser;

  useEffect(() => {
    if (selectedUser) {
      setForm({
        username: selectedUser.username || '',
        email: selectedUser.email || '',
        password: '',
        role: selectedUser.role || '',
      });
    } else {
      setForm({ username: '', email: '', password: '', role: '' });
    }
    setErrors({}); 
  }, [selectedUser, open]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
   
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validate = () => {
    const errs = {};

    if (!form.username.trim()) errs.username = 'Tên là bắt buộc';
    if (!form.email.trim()) errs.email = 'Email là bắt buộc';
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = 'Email không hợp lệ';

    
    if (!isEdit && !form.password) {
      errs.password = 'Mật khẩu là bắt buộc';
    } else if (form.password && form.password.length < 6) {
      errs.password = 'Mật khẩu phải từ 6 ký tự trở lên';
    }

    if (form.role && !['user', 'admin'].includes(form.role))
      errs.role = 'Vai trò không hợp lệ';

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs); 
      return;
    }

    try {
      const dataToSend = {
        username: form.username,
        email: form.email,
        role: form.role || 'user', // ← SỬA: mặc định 'user'
      };

      if (form.password) {
        dataToSend.password = form.password; // ← SỬA: chỉ gửi nếu có
      }

      if (isEdit) {
        await updateUser(selectedUser.id, dataToSend);
        alert('Cập nhật user thành công!');
      } else {
        await createUser(dataToSend);
        alert('Thêm user thành công!');
      }

      await fetchUsers();
      handleClose();
    } catch (err) { // ← SỬA: errors → err
      console.error('Lỗi khi lưu user:', err);
      alert(err?.response?.data?.message || 'Có lỗi xảy ra!');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({}); // ← SỬA: setErorr → setErrors
    setForm({ username: '', email: '', password: '', role: '' });
    setSelectedUser(null);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 animate-in fade-in slide-in-from-bottom-8 ease-out duration-300">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {isEdit ? 'Chỉnh sửa User' : 'Thêm User'}
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <input
              name="username" // ← SỬA: name → username
              value={form.username}
              onChange={handleChange}
              type="text"
              placeholder="Nhập tên"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition w-full"
            />
            {errors.username && ( // ← SỬA: errors.name → errors.username
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Nhập email"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder={isEdit ? 'Để trống nếu không đổi' : 'Nhập mật khẩu'}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition w-full"
            >
              <option value="">Chọn vai trò</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              onClick={handleClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition"
            >
              {isEdit ? 'Cập nhật' : 'Lưu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;