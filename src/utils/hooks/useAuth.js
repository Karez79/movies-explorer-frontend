import { useContext } from "react";
import { UserContext } from "../hoc/CurrentUserContext";

export function useAuth() {
  return useContext(UserContext);
}
