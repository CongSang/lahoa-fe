import { jwtDecode } from "jwt-decode";

interface MyTokenPayload {
  sub: string;
  roles: string[];
  permissions: string[];
  exp: number;
}

export const decodeToken = (token: string): MyTokenPayload | null => {
  try {
    return jwtDecode<MyTokenPayload>(token);
  } catch (error) {
    console.error("Token không hợp lệ:", error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return true;

  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};