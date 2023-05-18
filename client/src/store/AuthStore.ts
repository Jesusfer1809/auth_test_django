/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { create } from "zustand";
import jwt_decode from "jwt-decode";

interface User {
  username: string;
  user_id: string | number;
}

interface AuthTokens {
  refresh: string;
  access: string;
}

interface AuthStoreState {
  user: User | null;
  authTokens: AuthTokens | null;
  setNewUserInfo: (newInfo: User | null) => void;
  setAuthTokens: (newTokens: AuthTokens | null) => void;
  logInUser: (body: { username: string; password: string }) => void;
  logOutUser:()=>void;
  updateToken: (authTokens:AuthTokens) => void;
}

const initialToken = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens") as string) : null ;
const initialUser = initialToken ? jwt_decode(initialToken.access) : null ;

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: initialUser as User,
  authTokens: initialToken,

  setNewUserInfo: (newInfo) => set((state) => ({ ...state, user: newInfo })),

  setAuthTokens: (newTokens) =>
    set((state) => ({ ...state, authTokens: newTokens })),

  logInUser: async (body) => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/token/", {
        username: body.username,
        password: body.password,
      });

      const decodedJWT = jwt_decode(res.data.access);

      
      set((state) => ({
        ...state,
        authTokens: res.data,
        //@ts-ignore
        user: { username: decodedJWT.username, user_id: decodedJWT.user_id },
      }));

      localStorage.setItem("authTokens", JSON.stringify(res.data));
      return
    } catch (err) {
      console.error("BIG ERROR!!!", err);
      set((state) => ({ ...state, authTokens: null }));
      throw err;
    }
  },

  logOutUser: ()=>{
    
    set((state) => ({
      ...state,
      authTokens: null,
      user: null,
    }));

    localStorage.removeItem("authTokens");
    return
  },

  updateToken: async (authTokens: AuthTokens) => {
    try {
      console.log("UPDATE TOKEN CALLED")
      const res = await axios.post("http://localhost:8000/api/v1/token/refresh/", {
        refresh: authTokens.refresh
      });

      const decodedJWT = jwt_decode(res.data.access);

      
      set((state) => ({
        ...state,
        authTokens: res.data,
        //@ts-ignore
        user: { username: decodedJWT.username, user_id: decodedJWT.user_id },
      }));

      localStorage.setItem("authTokens", JSON.stringify(res.data));
      return
    } catch (err) {
      console.error("BIG ERROR!!!", err);
      set((state) => ({
        ...state,
        authTokens: null,
        user: null,
      }));
  
      localStorage.removeItem("authTokens");
      throw err;
    }
  },
}));
