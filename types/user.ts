import { Address } from "@/types/index";

export interface User {
  id: string;
  email: string;
  password?: string;
  phone?: string;
  fullName: string;
  userImageUrl?: string;
  addresses: Address[] | []
  roles: string[]
  permissions: string[]
}

export interface UserRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}
