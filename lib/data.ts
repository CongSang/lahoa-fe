import { FileCog, LayoutDashboard, Package, Rows2, ScanFace, Settings, ShoppingCart, Tickets, Users } from "lucide-react";

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
      title: "Nguyên liệu (tồn kho)",
      url: "/admin/materials",
      icon: Package,
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
      title: "Phân quyền",
      url: "/admin/authorize",
      icon: ScanFace,
    },
  ],
  navSetting: [
    {
      title: "Trang thông tin",
      url: "/admin/settings/about",
      icon: FileCog,
      items: [
        {
          title: "Trang giới thiệu",
          url: "/admin/settings/about",
        },
        {
          title: "Trang liên hệ",
          url: "/admin/settings/contact",
        },
        {
          title: "Trang chính sách",
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
          title: "Thông tin cửa hàng",
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
  ]
}

export const breadcrumbLabels: Record<string, string> = {
  admin: "Bảng điều khiển",
  products: "Quản lý sản phẩm",
  categories: "Quản lý danh mục",
  materials: "Quản lý nguyên liệu",
  orders: "Quản lý đơn hàng",
  customers: "Quản lý khách hàng",
  promotions: "Quản lý khuyến mãi",
  settings: "Cấu hình",
  authorize: "Phân quyền",
  profile: "Trang cá nhân",
};