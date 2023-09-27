import Cookies from "js-cookie";

export const useRemoveCookie = () => {
  Cookies.remove("accessToken");
};
