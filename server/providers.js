// Server-only provider metadata; no credentials are exported to browser code.
export const DEFAULT_MODEL = 'gemini-3.5-flash-lite';
export const DEFAULT_OPENAI_MODEL = 'gpt-5.6-terra';
export function providerConfig(env, provider) {
  return provider === 'openai'
    ? {
        label: 'OpenAI',
        keyName: 'OPENAI_API_KEY',
        modelName: 'OPENAI_MODEL',
        apiKey: env.OPENAI_API_KEY,
        model: env.OPENAI_MODEL || DEFAULT_OPENAI_MODEL
      }
    : {
        label: 'Gemini',
        keyName: 'GEMINI_API_KEY',
        modelName: 'GEMINI_MODEL',
        apiKey: env.GEMINI_API_KEY,
        model: env.GEMINI_MODEL || DEFAULT_MODEL
      };
}
