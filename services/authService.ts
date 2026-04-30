import { axiosInstance } from '@/lib/index';
import { AuthRequest, UserRequest } from '@/types/index';
import axios from 'axios';

export const loginApi = async (request: AuthRequest) => {
  const response = await axiosInstance.post('/auth/login', request);
  return response.data;
};

export const registerApi = async (request: UserRequest) => {
  const response = await axiosInstance.post('auth/register', request);
  return response.data;
};

export const getAccountInfoApi = async () => {
  const response = await axiosInstance.get('/auth/account-info');
  return response.data;
};

export const refreshTokenApi = async (refreshToken: string | undefined) => {
  const response = await axiosInstance.post(`/auth/refresh?refreshToken=${refreshToken}`);
  return response.data;
};

export const logoutApi = async () => {
  const response = await axiosInstance.post(`/auth/logout`);
  return response.data;
};

export const uploadImageApi = async (formData: FormData, cloudName: string) => {
  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  return response.data;
}
