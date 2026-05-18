'use client'

import { getApiErrorMessage } from "@/lib/index";
import { registerApi } from "@/services/index";
import { UserRequest } from "@/types/index";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FormSection, Button, Spinner, Alert, AlertTitle } from "@/components/index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldConfig, RegisterFormValues, registerSchema } from "@/schema/index";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { AlertCircleIcon } from "lucide-react";

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
      form.setError("root", {
        type: "server",
        message: getApiErrorMessage(
          error,
          "Đăng kí thất bại"
        )
      })
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
      form.clearErrors("root")
      mutation.mutate(data)
    }

  return (
    <>
      {
        form.formState.errors.root && (
          <Alert className="w-full border-destructive/80 bg-destructive/5 text-destructive mb-2">
            <AlertCircleIcon />
            <AlertTitle>
              {form.formState.errors.root.message}
            </AlertTitle>
          </Alert>
        )
      }

      <form 
        id='form-register' 
        className="w-full space-y-2 text-left"
        onSubmit={handleSubmit(onSubmit)}
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

      <p className="text-xs text-[#9CA3AF] mt-4">
        By signing up, you agree to our {" "}
        
        <Button
          type="button"
          disabled={mutation.isPending}
          variant="link"
          className='p-0 h-auto text-xs font-semibold'
        >
          <Link href="#" className="text-gray-500">Terms of Service.</Link>
        </Button>
      </p>

      <div className="w-full border-t border-[#F3F4F6] mt-4 pt-4">
        <p className="text-sm text-gray-500">
          Bạn đã có tài khoản? {" "}
          
          <Button
            type="button"
            disabled={mutation.isPending}
            variant="link"
            className='p-0 h-auto font-bold'
          >
            <Link href="/login" className="text-secondary-ec">Đăng nhập</Link>
          </Button>
        </p>
      </div>
    </>
  )
}
