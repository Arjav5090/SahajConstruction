/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * API origin for inbox routes (e.g. `https://api.example.com`).
   * Leave empty in development to use the Vite proxy (`/api/...` → backend).
   */
  readonly VITE_API_BASE_URL?: string
  /** Set to `true` to use mailto fallback only (no backend). */
  readonly VITE_INBOX_API_DISABLED?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
