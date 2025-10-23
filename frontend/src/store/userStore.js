import axiosClient from "../api/axiosClient";
import {create} from 'zustand'
const useUserStore = create((set)=>({
  users:[],
  stats:{total:0,admim:0},
  loading:false,

  fetchUsers:async()=>{
    set({loading:true});
    const responeUsers = await axiosClient.get('/users')
    set({users:responeUsers.data,loading:false})
  },
  fetchStats:async()=>{
    const responeStat = await axiosClient.get('/users/stats')
   set({stats:responeStat.data})
   return responeStat.data
  },
  createUser:async(data)=>{
    await axiosClient.post('/users',data)
  },
  updateUser:async(id,data)=>{
    await axiosClient.put(`/users/${id}`,data)
  },
   deleteUser:async(id)=>{
    await axiosClient.delete(`/users/${id}`)
  }
}))
export default useUserStore