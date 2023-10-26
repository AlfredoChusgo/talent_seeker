import  {defineConfig}  from 'vite';

interface AppConfig {
  isProduction: boolean,
  backendWebApiUrl: string,
  debug: boolean
}

let isProduction:boolean = import.meta.env.VITE_APP_MODE === 'PRODUCTION';
export const appConfig: AppConfig = {
  isProduction: isProduction,
  backendWebApiUrl: import.meta.env.VITE_APP_BACKEND_WEB_API_URL?.toString() ?? "test",
  // backendWebApiUrl: window.BACKEND_WEB_API_URL ?? "test",
  // backendWebApiUrl: BACKEND_WEB_API_URL ?? "test",
  debug: parseBoolean(import.meta.env.VITE_APP_DEBUG, false)
}
// console.log(`EnvVariablesReactApp : ${JSON.stringify(env)}`);

function parseBoolean(value: string | boolean | undefined, defaultValue: boolean = false): boolean {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const lowerCaseValue = value.toLowerCase().trim();
    if (lowerCaseValue === 'true') {
      return true;
    }
    if (lowerCaseValue === 'false') {
      return false;
    }
  }

  return defaultValue;
}