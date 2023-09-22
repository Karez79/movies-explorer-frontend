import Cookies from "js-cookie";

export const useSetCookie = (token) => {
  Cookies.set("accessToken", token, {
    expires: 1,
    secure: true,
    sameSite: "None",
    path: "/",
  });
};
