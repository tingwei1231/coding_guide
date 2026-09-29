import { cp, mkdir } from 'node:fs/promises';

await mkdir('.snippet-check/pages-host/coding_guide', { recursive: true });
await cp('dist', '.snippet-check/pages-host/coding_guide', { recursive: true });
