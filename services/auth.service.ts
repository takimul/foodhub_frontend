import { api } from "@/lib/api";
import { User } from "@/types/user";

export const AuthService = {
  getMe: () =>
    fetch("/api/v1/auth/me", {
      credentials: "include"
    }).then(res => res.json()),

  becomeProvider: () =>
    fetch("/api/v1/auth/become-provider", {
      method: "PATCH",
      credentials: "include"
    }).then(res => res.json())
};