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
      title: "Nguyên vật liệu - tồn kho",
      url: "/admin/materials",
      icon: Package,
      items: [
        {
          title: "Danh mục nguyên liệu",
          url: "/admin/material-categories",
        },
        {
          title: "Nguyên liệu",
          url: "/admin/materials",
        },
        {
          title: "Kho",
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
  materials: "Nguyên liệu",
  "material-categories": "Danh mục nguyên liệu",
  orders: "Đơn hàng",
  customers: "Khách hàng",
  promotions: "Khuyến mãi",
  settings: "Cấu hình",
  authorize: "Phân quyền",
  "audit-logs": "Nhật kí thay đổi",
  profile: "Hồ sơ",

  new: "Thêm mới",
  edit: "Cập nhật",
};
