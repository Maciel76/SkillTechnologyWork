// authService.d.ts
export declare const login: (username: string, password: string) => Promise<any>;
export declare const logout: () => void;
export declare const isAuthenticated: () => boolean;
export declare const getCurrentUser: () => any | null;
export declare const isAdmin: () => boolean;