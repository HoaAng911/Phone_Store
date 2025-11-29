import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/store";   // hoặc đường dẫn đúng của bạn

const ProtectedRoute = () => {
  const user = useUserStore((state) => state.user); // điều chỉnh theo store của bạn

  // NẾU CHƯA LOGIN HOẶC KHÔNG PHẢI ADMIN → ĐẨY VỀ LOGIN
  if (!user || user.role !== "admin") {
    console.log("BỊ CHẶN BỞI PROTECTED ROUTE → ĐẨY VỀ LOGIN");
    return <Navigate to="/login" replace />;
  }

  // NẾU ĐÚNG ADMIN → CHO QUA, HIỆN TOÀN BỘ ADMIN
  console.log("ADMIN ĐÃ ĐƯỢC PHÉP VÀO → HIỆN DASHBOARD");
  return <Outlet />;
};

export default ProtectedRoute;