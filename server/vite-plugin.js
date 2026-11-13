import { loadEnv } from 'vite';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createBemHandler } from './bem.js';
import {
  hasSecret,
  selectPrivateConfig,
  protectLocalEnvFiles,
  localFileGuard,
  sensitiveFile,
  assertSafePublicFiles,
  assertSafeBundle
} from './security.js';
// Secrets remain in this Node closure; never return them from a client module or API response.
export function bemApiPlugin() {
  let env, root, publicDir;
  return {
    name: 'personal-bem-api',
    enforce: 'pre',
    configResolved(config) {
      root = config.root;
      publicDir = config.publicDir;
      protectLocalEnvFiles(config.envDir);
      env = selectPrivateConfig({ ...loadEnv(config.mode, config.envDir, ''), ...process.env });
      const example = join(root, '.env.example');
      if (existsSync(example) && hasSecret(readFileSync(example, 'utf8'), env))
        throw new Error(
          '예시 환경변수 파일에서 비밀값이 발견되었습니다. 실행용 키는 .env.local에만 저장하세요.'
        );
      if (publicDir) assertSafePublicFiles(publicDir, env);
    },
    load(id, options) {
      if (id.startsWith('\0')) return; // Vite's trusted virtual modules have no filesystem path.
      if (!options?.ssr && sensitiveFile(id))
        throw new Error('서버 파일과 비밀 설정은 클라이언트 모듈로 가져올 수 없습니다.');
    },
    generateBundle(_options, bundle) {
      assertSafeBundle(bundle, env);
    },
    configureServer(server) {
      server.middlewares.use(localFileGuard(root, publicDir));
      server.middlewares.use(createBemHandler({ env }));
    },
    configurePreviewServer(server) {
      server.middlewares.use(localFileGuard(root, publicDir));
      server.middlewares.use(createBemHandler({ env }));
    }
  };
}
