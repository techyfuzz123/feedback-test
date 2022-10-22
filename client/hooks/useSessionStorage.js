// since we can't directly access sessionstorage in ssr
// since  in ssr storage wont be mounted at start
const useSessionStorage = (name) => {
  let value;

  value = sessionStorage.getItem(name);

  return value;
};

export default useSessionStorage;
