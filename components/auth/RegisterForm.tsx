'use client'
import { InputCustom, UploadImage } from "@/components/index"
import { toastApiError, uploadToCloudinary, validateEmail, validatePassword } from "@/lib/index";
import { registerApi } from "@/services/index";
import { UserRequest } from "@/types/index";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useState } from "react";
import toast from "react-hot-toast";

export const RegisterForm = () => {
  const router = useRouter();
  const [avatar, setAvatar] = useState<File | null>(null)
  const [userRequest, setUserRequest] = useState<UserRequest>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    userImageUrl: '',
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserRequest(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const validations = [
      { cond: !userRequest.fullName.trim(), msg: "Vui lòng nhập Họ và tên" },
      { cond: !validateEmail(userRequest.email), msg: "Vui lòng nhập đúng định dạng email" },
      { cond: !validatePassword(userRequest.password), msg: "Mật khẩu phải có ít nhất 8 ký tự, 1 chữ cái, 1 số" }
    ];

    const error = validations.find(v => v.cond);
    if (error) return toast.error(error.msg);

    setLoading(true)
    let avatarUrl = '';

    try {
      if (avatar) {
        const imageUrl = await uploadToCloudinary(avatar);
        avatarUrl = imageUrl || "";
      }

      await registerApi({ 
        ...userRequest,
        userImageUrl: avatarUrl
      });

      toast.success("Đăng kí thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.")
      router.push('/login');
    } catch (error) {
      console.error("Registration failed:", error)
      toastApiError(error, "Đang kí thất bại. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
     {/* Profile Photo Upload */}
      <UploadImage image={avatar} setImage={setAvatar} />

      {/* Form */}
      <form className="w-full space-y-4 text-left">
        <InputCustom 
          value={userRequest.fullName}
          disabled={loading}
          onChange={(e) => handleInputChange(e)}
          placeholder="Họ & tên" 
          type="text" 
        />

        <InputCustom 
          value={userRequest.email}
          disabled={loading}
          onChange={(e) => handleInputChange(e)}
          placeholder="Địa chỉ email" 
          type="email" 
        />

        <InputCustom 
          value={userRequest.phone}
          disabled={loading}
          onChange={(e) => handleInputChange(e)}
          placeholder="Số điện thoại" 
          type="phone" 
        />

        <InputCustom
          value={userRequest.password}
          disabled={loading}
          onChange={(e) => handleInputChange(e)}
          placeholder="Mật khẩu" 
          type="password" 
        />

        <button 
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full btn-ec uppercase"
        >
          Tạo tài khoản
        </button>
      </form> 
    </>
  )
}
