
interface AppConfig {
  isProduction: boolean,
  backendWebApiUrl: string,
  debug: boolean
}

export const appConfig: AppConfig = {
  isProduction: parseBoolean(import.meta.env.PROD, false),
  backendWebApiUrl: import.meta.env.VITE_APP_BACKEND_WEB_API_URL?.toString() ?? "",
  debug: parseBoolean(import.meta.env.VITE_APP_DEBUG, false)
}

console.log(appConfig);


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