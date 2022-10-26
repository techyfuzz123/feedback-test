
import useSessionStorage from "./useSessionStorage";

export const fetchUser = () => {
  const userData = useSessionStorage("user");
  const user = JSON.parse(userData);
  return user;
};




