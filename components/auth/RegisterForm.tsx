'use client'

import { toastApiError } from "@/lib/index";
import { registerApi } from "@/services/index";
import { UserRequest } from "@/types/index";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FormSection, Button, Spinner } from "@/components/index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldConfig, RegisterFormValues, registerSchema } from "@/schema/index";
import { useMutation } from "@tanstack/react-query";

export const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
    },
  });

  const { handleSubmit } = form;
  
  const sectionFormConfig: FieldConfig<RegisterFormValues>[] = [
    { name: "fullName", type: "text", placeholder: "Họ & tên" },
    { name: "email", type: "text", placeholder: "Địa chỉ email" },
    { name: "phone", type: "text", placeholder: "Số điện thoại" },
    { name: "password", type: "password", placeholder: "Mật khẩu" },
  ];

  const mutation = useMutation({
    mutationFn: (request: UserRequest) => registerApi(request),
    onSuccess: () => {
      toast.success("Đăng kí thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.")
      router.push('/login');
    },
    onError: (error) => {
      console.error("Registration failed:", error)
      toastApiError(error, "Đang kí thất bại. Vui lòng thử lại.")
    },
  });

  return (
    <>
      <form 
        id='form-register' 
        className="w-full space-y-2 text-left"
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
      >
        <FormSection<RegisterFormValues>
          form={form}
          config={sectionFormConfig}
          disabledAll={mutation.isPending}
        />

        <Button 
          type="submit"
          disabled={mutation.isPending}
          className="w-full btn-ec uppercase"
          size="lg"
        >
          {mutation.isPending ? <Spinner /> : 'Tạo tài khoản'}  
        </Button>
      </form> 
    </>
  )
}
