/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

type D1Database = import('@cloudflare/workers-types').D1Database
type Env = {
  DB: D1Database
  GITHUB_CLIENT_ID: string
  GITHUB_CLIENT_SECRET: string
}
type Runtime = import('@astrojs/cloudflare').Runtime<Env>

declare namespace App {
  interface Locals extends Runtime {
    session: import('lucia').Session | null
    user: import('lucia').User | null
  }
}

interface ImportMetaEnv {
  readonly SKIP_DEPENDENCY_INSTALL: string
  readonly UNSTABLE_PRE_BUILD: string
  readonly GITHUB_CLIENT_ID: string
  readonly GITHUB_CLIENT_SECRET: string
  readonly ASTRO_STUDIO_APP_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.astro' {
  const Component: React.ComponentType // or use `unknown` if more appropriate
  export default Component
}
