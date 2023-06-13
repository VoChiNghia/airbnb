import axios from "axios";
export const ACCESS_TOKEN = "accessToken";
export const USER_LOGIN = "userLogin";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgMjkiLCJIZXRIYW5TdHJpbmciOiIxOS8wOS8yMDIzIiwiSGV0SGFuVGltZSI6IjE2OTUwODE2MDAwMDAiLCJuYmYiOjE2Nzc2MDM2MDAsImV4cCI6MTY5NTIyOTIwMH0.ZLLpdVZKDiSaVmcqW8ABNFiLYlwLSlO9t0GVSWuFka4";

export const { saveStore, saveStoreJson, getStore, getStoreJson, removeStore } =
  {
    saveStore: (name: string, stringValue: any) => {
      localStorage.setItem(name, stringValue);
      return stringValue;
    },
    saveStoreJson: (name: string, value: any) => {
      localStorage.setItem(name, JSON.stringify(value));
      return value;
    },
    getStore: (name: string) => {
      if (localStorage.getItem(name)) {
        return localStorage.getItem(name);
      }
      return null;
    },
    getStoreJson: (name: any) => {
      if (localStorage.getItem(name)) {
        const dataStore = localStorage.getItem(name);
        if (typeof dataStore === "string") {
          return JSON.parse(dataStore);
        }
      }
      return null;
    },
    removeStore: (name: string) => {
      if (localStorage.getItem(name)) {
        localStorage.removeItem(name);
      }
    },
  };

export const http = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn",
  headers: {
    common: {
      Accept: "application/json",
    },
    patch: {
      "Content-Type": "application/merge-patch+json",
    },
  },
});

http.interceptors.request.use(
  (config: any) => {
    config.headers = {
      ...config.headers,
      token: getStore(ACCESS_TOKEN),
      tokenCybersoft: TOKEN_CYBERSOFT,
    };
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
