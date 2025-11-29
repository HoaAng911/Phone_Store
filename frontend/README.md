src/
├─ app/                     # React Router v6.4+ (hoặc Next.js app router)
│   ├─ routes/
│   │   ├─ admin.tsx        # <Route element={<AdminLayout />}><AdminRoutes /></Route>
│   │   └─ user.tsx         # <Route element={<UserLayout />}><UserRoutes /></Route>
│   └─ App.jsx
│
├─ features/                # THEO FEATURE – cách scale tốt nhất hiện nay
│   ├─ auth/
│   │   ├─ components/
│   │   ├─ pages/
│   │   ├─ hooks/
│   │   └─ store/ (useAuthStore.js)
│   │
│   ├─ cart/
│   ├─ products/
│   ├─ admin-products/
│   ├─ admin-orders/
│   ├─ admin-users/
│   ├─ articles/            # blog
│   └─ checkout/
│
├─ components/              # Chỉ để component chung, không thuộc feature nào
│   ├─ common/              # Button, Input, Modal, Loading…
│   ├─ layout/
│   │   ├─ UserLayout.jsx
│   │   ├─ AdminLayout.jsx
│   │   ├─ Header.jsx
│   │   └─ Footer.jsx
│   └─ ui/                  # shadcn/ui components (tên file .tsx + index.ts)
│       ├─ button.tsx
│       ├─ card.tsx
│       └─ ...
│
├─ lib/                     # axios, utils, constants
│   ├─ api/
│   │   └─ axiosClient.js
│   ├─ utils.js
│   └─ constants.js
│
├─ hooks/                   # Custom hooks chung
│   ├─ useDebounce.js
│   └─ useLocalStorage.js
│
├─ store/                   # Zustand/Pinia/Redux – chỉ để root store
│   ├─ rootStore.js         # combine tất cả slice
│   └─ slices/              # hoặc để riêng theo feature trong features/
│
├─ types/                   # TypeScript interfaces
│   └─ index.ts
│
├─ assets/
│   ├─ images/
│   └─ icons/
│
├─ styles/                  # globals, tailwind config nếu cần override
│   └─ globals.css
│
├─ routes/
│   ├─ ProtectedRoute.jsx
│   └─ AdminRoute.jsx
│
├─ pages/                   # (có thể bỏ hoàn toàn, thay bằng features/*.pages)
│   ├─ Home.jsx
│   ├─ AboutUs.jsx
│   └─ Contact.jsx
│
├─ App.css
├─ main.jsx
└─ vite.config.js / next.config.js