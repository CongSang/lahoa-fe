import { ChartLine, FileCog, Flower, LayoutDashboard, Notebook, Package, Rows2, Settings, ShoppingCart, Tickets, UserKey, Users } from "lucide-react";

export const dataNavbar = {
  navMain: [
    {
      title: "Bảng điều khiển",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Danh mục",
      url: "/admin/categories",
      icon: Rows2,
    },
    {
      title: "Sản phẩm",
      url: "/admin/products",
      icon: Flower,
    },
    {
      title: "Kho & Vật liệu",
      url: "/admin/materials",
      icon: Package,
      items: [
        {
          title: "Danh mục vật liệu",
          url: "/admin/material-categories",
        },
        {
          title: "Vật liệu & Phụ kiện",
          url: "/admin/materials",
        },
        {
          title: "Nhập kho (GRN)",
          url: "/admin/inventory-receipts", // 3. TRANG TẠO MỚI: Quản lý phiếu nhập hàng từ nhà cung cấp
        },
        {
          title: "Phiếu kiểm kê",
          url: "/admin/stocktakes",
        },
        {
          title: "Lịch sử kho",
          url: "/admin/inventory-logs",
        },
        {
          title: "Danh sách kho",
          url: "/admin/warehouses",
        },
      ]
    },
    {
      title: "Đơn hàng",
      url: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      title: "Khách hàng",
      url: "/admin/customers",
      icon: Users,
    },
    {
      title: "Khuyến mãi",
      url: "/admin/promotions",
      icon: Tickets,
    },
    {
      title: "Báo cáo",
      url: "/admin/report",
      icon: ChartLine,
    },
    {
      title: "Phân quyền",
      url: "/admin/authorize",
      icon: UserKey,
    },
    {
      title: "Nhật kí thay đổi",
      url: "/admin/audit-logs",
      icon: Notebook,
    },
    {
      title: "Trang thông tin",
      url: "/admin/settings/about",
      icon: FileCog,
      items: [
        {
          title: "Giới thiệu",
          url: "/admin/settings/about",
        },
        {
          title: "Chính sách",
          url: "/admin/settings/policy",
        },
      ],
    },
    {
      title: "Hệ thống",
      url: "/admin/settings/shop",
      icon: Settings,
      items: [
        {
          title: "Cửa hàng",
          url: "/admin/settings/shop",
        },
        {
          title: "Phương thức thanh toán",
          url: "/admin/settings/payment",
        },
        {
          title: "Phương thức thông báo",
          url: "/admin/settings/notification",
        },
        {
          title: "Thuế",
          url: "/admin/settings/tax",
        },
      ],
    },
  ],
}

export const breadcrumbLabels: Record<string, string> = {
  admin: "Dashboard",
  products: "Sản phẩm",
  categories: "Danh mục",
  materials: "Vật liệu",
  "material-categories": "Danh mục vật liệu",
  "inventory-receipts": "Nhập kho",
  stocktakes: "Kiểm kê",
  orders: "Đơn hàng",
  customers: "Khách hàng",
  promotions: "Khuyến mãi",
  settings: "Cấu hình",
  authorize: "Phân quyền",
  "audit-logs": "Nhật kí thay đổi",
  profile: "Hồ sơ",

  new: "Thêm mới",
};
