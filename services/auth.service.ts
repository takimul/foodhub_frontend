import { api } from "@/lib/api";
import { User } from "@/types/user";

export const AuthService = {
  getMe: () => api<{ data: User }>("/api/v1/auth/me"),

  becomeProvider: () =>
    api("/api/v1/auth/become-provider", {
      method: "PATCH"
    })
};