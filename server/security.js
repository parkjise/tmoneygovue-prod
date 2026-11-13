import { randomBytes, timingSafeEqual } from 'node:crypto';
import { existsSync, lstatSync, realpathSync, readdirSync, readFileSync, chmodSync } from 'node:fs';
import { resolve, join } from 'node:path';

const SECRET_PATTERN = /\b(?:AIza[\w-]{35}|sk-(?:proj-|svcacct-)?[\w-]{20,})/;
const PRIVATE_NAMES = ['GEMINI_API_KEY', 'OPENAI_API_KEY', 'GEMINI_MODEL', 'OPENAI_MODEL'];
export function hasSecret(value, config = {}) {
  const text = typeof value === 'string' ? value : JSON.stringify(value) || '';
  return (
    SECRET_PATTERN.test(text) ||
    ['GEMINI_API_KEY', 'OPENAI_API_KEY'].some((name) => {
      const key = config[name]?.trim();
      return key && key.length >= 8 && text.includes(key);
    })
  );
}
export function selectPrivateConfig(allEnv) {
  const config = Object.fromEntries(
    PRIVATE_NAMES.map((name) => [name, allEnv[name]?.trim() || ''])
  );
  // Even accidentally renamed or copied keys must not become import.meta.env.VITE_* values.
  for (const [name, value] of Object.entries(allEnv)) {
    if (
      name.startsWith('VITE_') &&
      ((value && /(?:API_?KEY|SECRET|PASSWORD|PRIVATE_?KEY|TOKEN)/i.test(name)) ||
        hasSecret(String(value), config))
    )
      throw new Error(
        '클라이언트용 VITE_ 환경변수에 비밀값을 설정할 수 없습니다. 서버 전용 환경변수로 옮겨주세요.'
      );
  }
  for (const name of ['GEMINI_MODEL', 'OPENAI_MODEL']) {
    if (
      config[name] &&
      (hasSecret(config[name], config) || !/^[a-zA-Z0-9._-]{1,100}$/.test(config[name]))
    )
      throw new Error(`${name}에는 API 키가 아닌 유효한 모델 ID만 설정하세요.`);
  }
  return Object.freeze(config);
}
export function protectLocalEnvFiles(root) {
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!/^\.env(?:\..+)?\.local$/.test(entry.name)) continue;
    const file = join(root, entry.name);
    if (entry.isSymbolicLink())
      throw new Error(
        '개인 환경변수 파일은 심볼릭 링크 대신 프로젝트 내부의 일반 파일로 저장하세요.'
      );
    if (entry.isFile() && process.platform !== 'win32') chmodSync(file, 0o600);
  }
}
export function sensitivePath(raw) {
  let path = String(raw).split('?')[0].split('#')[0];
  try {
    for (let n = 0; n < 3; n++) {
      const next = decodeURIComponent(path);
      if (next === path) break;
      path = next;
    }
  } catch {
    return true;
  }
  path = path.replaceAll('\\', '/');
  return (
    path.includes('\0') ||
    path
      .split('/')
      .some(
        (part) =>
          /^\.env(?:\.|$)/i.test(part) ||
          ['.git', '.aws', '.ssh', '.codex', '.agents', '.npmrc', '.yarnrc.yml', 'server'].includes(
            part.toLowerCase()
          ) ||
          /\.(?:pem|key|crt|p12|pfx|cer|der)$/i.test(part)
      )
  );
}
export function sensitiveFile(file) {
  const clean = String(file).split('?')[0];
  return sensitivePath(clean) || (existsSync(clean) && sensitivePath(realpathSync(clean)));
}
export function assertSafePublicFiles(directory, config = {}) {
  if (!existsSync(directory)) return;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isSymbolicLink() || sensitivePath(entry.name))
      throw new Error('공개 디렉터리에 비공개 파일 또는 심볼릭 링크를 둘 수 없습니다.');
    if (entry.isDirectory()) assertSafePublicFiles(file, config);
    else if (entry.isFile() && hasSecret(readFileSync(file).toString('utf8'), config))
      throw new Error('공개 파일에서 API 키로 의심되는 값이 발견되었습니다. 비밀값을 제거하세요.');
  }
}
export function assertSafeBundle(bundle, config = {}) {
  for (const asset of Object.values(bundle)) {
    const value =
      asset.type === 'chunk'
        ? asset.code
        : typeof asset.source === 'string'
          ? asset.source
          : Buffer.from(asset.source || []).toString('utf8');
    if (hasSecret(value, config))
      throw new Error('빌드 산출물에서 API 키로 의심되는 값이 발견되어 빌드를 중단했습니다.');
  }
}
export function isLocalRequest(req, { allowNoCors = false } = {}) {
  if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(req.socket.remoteAddress)) return false;
  if (
    req.headers['sec-fetch-site'] === 'cross-site' ||
    (!allowNoCors && req.headers['sec-fetch-mode'] === 'no-cors')
  )
    return false;
  try {
    const base = new URL((req.socket.encrypted ? 'https' : 'http') + '://' + req.headers.host);
    if (!['localhost', '127.0.0.1', '[::1]'].includes(base.hostname)) return false;
    return !req.headers.origin || new URL(req.headers.origin).origin === base.origin;
  } catch {
    return false;
  }
}
export function createCsrfToken() {
  return randomBytes(32).toString('hex');
}
export function validCsrfToken(actual, expected) {
  return (
    typeof actual === 'string' &&
    actual.length === expected.length &&
    Buffer.byteLength(actual) === Buffer.byteLength(expected) &&
    timingSafeEqual(Buffer.from(actual), Buffer.from(expected))
  );
}
export function securityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader(
    'Content-Security-Policy',
    "frame-ancestors 'none'; base-uri 'self'; object-src 'none'"
  );
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
}
export function localFileGuard(root, publicDir) {
  return (req, res, next) => {
    securityHeaders(res);
    let blocked = !isLocalRequest(req, { allowNoCors: true }) || sensitivePath(req.url);
    try {
      const path = decodeURIComponent(req.url?.split('?')[0] || '/');
      const file = path.startsWith('/@fs/') ? path.slice(5) : resolve(root, '.' + path);
      blocked ||=
        sensitiveFile(file) || (publicDir && sensitiveFile(resolve(publicDir, '.' + path)));
    } catch {
      blocked = true;
    }
    if (blocked) {
      res.writeHead(403, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store'
      });
      res.end('비공개 리소스에 접근할 수 없습니다.');
      return;
    }
    next();
  };
}
