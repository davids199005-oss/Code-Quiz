/**
 * App configuration. API key is read from env (VITE_CHATGPT_API_KEY).
 */
class AppConfig {
    public readonly chatGptApiKey = import.meta.env.VITE_CHATGPT_API_KEY;
}

export const appConfig = new AppConfig();
