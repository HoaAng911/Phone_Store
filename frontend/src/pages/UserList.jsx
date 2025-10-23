import { useEffect, useState } from 'react';
import useUserStore from '../store/userStore';
import AddUserModal from '../components/AddUserModal';
export default function UserList() {
  const { users, fetchUsers, loading ,deleteUser} = useUserStore();
  const [open, setOpen] = useState(false)
  const[selectedUser,setSelectedUser]=useState(null)
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  const handleDelete = async (id)=>{
    if(window.confirm("Bạn có chắc muốn xóa người dùng này?")){
      await deleteUser(id)
      fetchUsers()
    }
  }
  const handleEdit = (user)=>{
    setSelectedUser(user)
    setOpen(true)
  }
  return (
    <div className="bg-gray-50 shadow-md p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách User</h1>
      <div className="flex justify-end mt-4 mb-5">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium 
      py-2 px-4 rounded-lg shadow-md transition-colors" onClick={() =>{setSelectedUser(null);setOpen(true)}}>
          Thêm
        </button>
      </div>
      {/* Box / Model */}
  
      <AddUserModal open={open}setOpen={setOpen} selectedUser={selectedUser} fetchUsers={fetchUsers} setSelectedUser={setSelectedUser} />

      {/* Bang  */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-950">
            <tr className="text-center text-white uppercase text-sm">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className='p-3'>Action</th>
            </tr>
          </thead>
          {/* Map data */}
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr
                key={u.id}
                className="text-center hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">{u.id}</td>
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className='p-3 space-x-2'>
                    {/* Nut sua */}
                    <button   className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md"
                    onClick={()=>handleEdit(u)}>
                       Sửa
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md" 
                    onClick={()=>handleDelete(u.id)}
                    >
                      Xóa

                    </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
