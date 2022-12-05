// since we can't directly access localstorage in ssr
// since  in ssr storage wont be mounted at start
const useLocalStorage = (name) => {
  let value;

  value = localStorage.getItem(name);

  return value;
};

export default useLocalStorage;
