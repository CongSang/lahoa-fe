import { ChartLine, FileCog, Flower, LayoutDashboard, Package, Rows2, ScanFace, Settings, ShoppingCart, Tickets, Users } from "lucide-react";
import { StatusCommon } from "../types";

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
      icon: ScanFace,
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

export const statusDropdown = [
  { value: "ALL", label: "Tất cả" },
  { value: StatusCommon.ACTIVE, label: "Hoạt động" },
  { value: StatusCommon.INACTIVE, label: "Tạm ngưng" },
]
