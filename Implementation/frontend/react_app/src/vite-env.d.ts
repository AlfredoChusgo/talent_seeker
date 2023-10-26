/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_BACKEND_WEB_API_URL: string;
    readonly VITE_APP_DEBUG: boolean;
    readonly VITE_APP_MODE: string;
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }