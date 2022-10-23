import useSessionStorage from "./useSessionStorage";

export const loadUser = () => {
  const userData = useSessionStorage("user");
  const user = JSON.parse(userData);
  return user;
};
