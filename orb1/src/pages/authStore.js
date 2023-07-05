import create from 'zustand';

const useAuthStore = create((set) => ({
  email: '',
  password: '',
  confirmPassword: '',
  error: null,
  loginStatus: '',
  setEmail: (value) => set((state) => ({ email: value })),
  setPassword: (value) => set((state) => ({ password: value })),
  setConfirmPassword: (value) => set((state) => ({ confirmPassword: value })),
  setError: (value) => set((state) => ({ error: value })),
  setLoginStatus: (value) => set((state) => ({ loginStatus: value })),
}));

export default useAuthStore;
