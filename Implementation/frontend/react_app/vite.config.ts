import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
const env = loadEnv(process.env.MODE, process.cwd(), '');

console.log(`env.BACKEND_WEB_API_URL: ${env.BACKEND_WEB_API_URL}`);
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  define:{
    // __BACKEND_WEB_API_URL__ : `${process.env.BACKEND_WEB_API_URL}`
     __TEST__: JSON.stringify("TEST FROM DEFINE CONFIG"),
    //__TEST__: "TEST FROM DEFINE CONFIG",
    // BACKEND_WEB_API_URL : JSON.stringify(env.BACKEND_WEB_API_URL),
    BACKEND_WEB_API_URL : `"${process.env.BACKEND_WEB_API_URL}"`,
  },
  plugins: [react()],
  server: {
    watch: {usePolling:true}, // Enable file watching
    // You can also specify additional watch options here
  },
});


console.log("Define config reuslt:");
// console.log(JSON.stringify(defineConfig));
