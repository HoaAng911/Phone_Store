import React, { useEffect, useState } from 'react'
import useUserStore from '../store/userStore'

const AddUserModal = ({ open, setOpen, selectedUser, setSelectedUser }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
  const [errors, setErorr] = useState({})
  const createUser = useUserStore(state => state.createUser)
  const updateUser = useUserStore(state => state.updateUser)
  const fetchUsers = useUserStore(state => state.fetchUsers)
  // Kiem tra co phai la edit hay ko
  const isEdit = !!selectedUser

  useEffect(() => {
    if (selectedUser) {
      setForm({
        name: selectedUser.name,
        email: selectedUser.email,
        password: "",
        role: selectedUser.role || ""
      })
    } else {
      setForm({ name: "", email: "", password: "", role: "" });
    }
  }, [selectedUser])
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }



  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = "Name là bắt buộc"
    if (!form.email.trim()) errs.email = "Email là bắt buộc"
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email không hợp lệ";
    if (form.password && form.password.length < 6) errs.password = "Password phải lớn hơn = 6 ký tự "
    return errs
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErorr(errs)
      return
    }
    try {
      const dataToSend = { ...form }
      if (!dataToSend.password) delete dataToSend.password
      if (isEdit) {
        await updateUser(selectedUser.id, dataToSend)
        alert("Cập nhật user thành công!");
      } else {
        await createUser(form)
        alert("Thêm user thành công!");
      }
      await fetchUsers()

    } catch (errors) {
      console.error("Lỗi khi lưu user:", err);
    }
  }
  const handleClose = () => {
    setOpen(false)
    setErorr({})
    setForm({ name: "", email: "", password: "", role: "" });
    setSelectedUser(null);
  }


  if (!open) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 animate-in fade-in slide-in-from-bottom-8 ease-out duration-300">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className='text-xl font-semibold mb-4 text-center'>  {isEdit ? "Chỉnh sửa User" : "Thêm User"}</h2>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>   <input name="name" value={form.name} onChange={handleChange}
            type="text" placeholder='Nhập tên'
            className="border border-gray-300 p-3 rounded-lg
           focus:outline-none focus:ring-2 focus:ring-blue-40
           0 focus:border-blue-500 transition w-full"/>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <input name="email" value={form.email} onChange={handleChange} type="email" placeholder='Nhập email' className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition w-full" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div><input name="password" value={form.password} onChange={handleChange} type="password" placeholder='Nhập mật khẩu' className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition w-full" />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition w-full"
            >
              <option value="">Select Role (Optional)</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

          </div>
          <div className='flex justify-end gap-3 mt-4'>
            <button type='button' className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition" onClick={() => setOpen(false)}>Hủy</button>
            <button type='submit' className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition">  {isEdit ? "Cập nhật" : "Lưu"}</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddUserModal