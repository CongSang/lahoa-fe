import { z } from "zod";
import { REGEX } from "@/lib/index";

export const authSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email không được để trống")
    .regex(REGEX.EMAIL, "Email không hợp lệ"),

  password: z
    .string()
    .trim()
    .min(1, "Mật khẩu không được để trống")
    .regex(
      REGEX.PASSWORD,
      "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ và số"
    ),
});

export type AuthFormValues = z.infer<typeof authSchema>;

export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Tên không được để trống"),

  email: z
    .string()
    .trim()
    .min(1, "Email không được để trống")
    .regex(REGEX.EMAIL, "Email không hợp lệ"),

  password: z
    .string()
    .trim()
    .min(1, "Mật khẩu không được để trống")
    .regex(
      REGEX.PASSWORD,
      "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ và số"
    ),

  phone: z
    .string()
    .trim()
    .regex(REGEX.PHONE, "Số điện thoại không hợp lệ"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;