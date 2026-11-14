function a(t,r,e=!1){return`<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; form-action 'none'; base-uri 'none'"><style>
:root { ${e?"--surface:#1a1e2e;--text:#f1f5f9;--muted:#b7c0d2;--border:#30364c;--soft:#29284c;--primary:#a5b4fc;":"--surface:#ffffff;--text:#0f172a;--muted:#475569;--border:#e2e8f0;--soft:#eef2ff;--primary:#6366f1;"} color-scheme:${e?"dark":"light"}; }
* { box-sizing:border-box; }
body { margin:0; padding:16px; font:14px/1.7 system-ui,sans-serif; color:var(--text); background:var(--surface); }
h3,p { margin:0; } form { display:grid; gap:14px; }
button,input,select,textarea { font:inherit; color:inherit; border:1px solid var(--border); border-radius:7px; padding:8px 12px; background:var(--surface); }
button { background:var(--soft); } button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible { outline:2px solid var(--primary); outline-offset:2px; }
input[type=checkbox] { accent-color:var(--primary); } textarea { width:100%; }
${r}
</style></head><body>${t}</body></html>`}export{a as c};
