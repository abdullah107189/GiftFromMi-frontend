export const useAuth = () => {
  const authLoading = false;
  const user = { name: "Test User", role: "admin" };

  return { authLoading, user };
};

export default useAuth;
