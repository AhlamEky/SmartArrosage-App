// app/auth.ts
let estConnecte = false;

export const getAuth = () => estConnecte;
export const login = () => { estConnecte = true; };
export const logout = () => { estConnecte = false; };
