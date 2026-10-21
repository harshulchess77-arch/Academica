import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../lib/authService';
import { useAuthStore } from '../store/authStore';

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);
  const setProfile = useAuthStore((state) => state.setProfile);

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return await authService.signIn(email, password);
    },
    onSuccess: ({ user, profile }) => {
      setSession(user);
      setProfile(profile);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);
  const setProfile = useAuthStore((state) => state.setProfile);

  return useMutation({
    mutationFn: async ({
      email,
      password,
      displayName,
    }: {
      email: string;
      password: string;
      displayName: string;
    }) => {
      return await authService.signUp(email, password, displayName);
    },
    onSuccess: ({ user, profile }) => {
      setSession(user);
      setProfile(profile);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const signOut = useAuthStore((state) => state.signOut);

  return useMutation({
    mutationFn: async () => {
      await authService.signOut();
    },
    onSuccess: () => {
      signOut();
      queryClient.clear();
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      await authService.resetPassword(email);
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (newPassword: string) => {
      await authService.updatePassword(newPassword);
    },
  });
};

export const useCheckRole = (role: string) => {
  return useMutation({
    mutationFn: async (userId: string) => {
      return await authService.checkRole(userId, role);
    },
  });
};
