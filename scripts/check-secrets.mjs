// Local inspection only. Reports no secret values and makes no provider API calls.
import { loadEnv } from 'vite';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { selectPrivateConfig, hasSecret, assertSafePublicFiles } from '../server/security.js';
const root = process.cwd();
try {
  const config = selectPrivateConfig({ ...loadEnv('production', root, ''), ...process.env });
  if (hasSecret(readFileSync(resolve(root, '.env.example'), 'utf8'), config))
    throw new Error('예시 환경변수 파일에 비밀값을 넣을 수 없습니다.');
  for (const dir of ['src', 'public', 'dist'])
    if (existsSync(resolve(root, dir))) assertSafePublicFiles(resolve(root, dir), config);
  console.log('키 유출 검사 통과: 공개 소스·정적 파일·빌드 산출물·환경변수 예시');
} catch {
  console.error(
    '키 유출 검사 실패: 공개 파일 또는 VITE_ 환경변수의 비밀값을 제거하세요. 값은 출력하지 않습니다.'
  );
  process.exitCode = 1;
}
