import { Address } from "@/types/index";

export interface User {
  id: string;
  email: string;
  password?: string;
  phone?: string;
  fullName: string;
  userImageUrl?: string;
  addresses: Address[] | []
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
}

export interface UserRequest {
  fullName: string;
  userImageUrl: string;
  email: string;
  password: string;
}
