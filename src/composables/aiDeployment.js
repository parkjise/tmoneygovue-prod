// Public Pages has no Node API. Never request or embed personal API keys in that build.
export const staticDeployment = import.meta.env.VITE_STATIC_DEPLOY === 'true';
export function staticAiStatus() {
  return {
    deployment: 'static',
    configured: false,
    csrfToken: '',
    providers: {
      gemini: { configured: false, model: '로컬 서버 연결 필요' },
      openai: { configured: false, model: '로컬 서버 연결 필요' }
    }
  };
}
