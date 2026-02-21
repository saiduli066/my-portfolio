"use client";

import {
    createContext,
    useContext,
    useState,
    useCallback,
    type ReactNode,
} from "react";

interface AuthCtx {
    isAuthenticated: boolean;
    token: string | null;
    login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthCtx>({
    isAuthenticated: false,
    token: null,
    login: async () => ({ ok: false }),
    logout: () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);

    const login = useCallback(async (email: string, password: string) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const json = await res.json();
            if (json.ok && json.token) {
                setToken(json.token);
                return { ok: true };
            }
            return { ok: false, error: json.error ?? "Login failed" };
        } catch {
            return { ok: false, error: "Network error" };
        }
    }, []);

    const logout = useCallback(() => setToken(null), []);

    return (
        <AuthContext.Provider
            value={{ isAuthenticated: !!token, token, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
