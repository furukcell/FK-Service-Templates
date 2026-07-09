import { useEffect, useState } from "react";
import { listenToCurrentUser } from "@fk-templates/firebase";

export type AdminGuardState = {
  isChecking: boolean;
  isAllowed: boolean;
  message: string;
};

export function useOptionalAdminGuard(): AdminGuardState {
  const [state, setState] = useState<AdminGuardState>({
    isChecking: true,
    isAllowed: true,
    message: "Demo mode: admin panel açık."
  });

  useEffect(() => {
    const requireAuth = process.env.NEXT_PUBLIC_REQUIRE_ADMIN_AUTH === "true";
    if (!requireAuth) {
      setState({ isChecking: false, isAllowed: true, message: "Demo mode: admin panel açık." });
      return undefined;
    }

    try {
      const unsubscribe = listenToCurrentUser((user) => {
        setState({
          isChecking: false,
          isAllowed: Boolean(user),
          message: user ? "Admin girişi aktif." : "Admin panel için giriş gerekli."
        });
      });
      return unsubscribe;
    } catch (error) {
      setState({
        isChecking: false,
        isAllowed: false,
        message: "Admin guard aktif ancak Firebase yapılandırması eksik."
      });
      return undefined;
    }
  }, []);

  return state;
}
