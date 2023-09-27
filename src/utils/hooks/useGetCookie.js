import Cookies from "js-cookie";

export const useGetCookie = () => {
  return Cookies.get("accessToken");
};
