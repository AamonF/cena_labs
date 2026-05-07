/**
 * Lightweight logger that only fires in development. Used by the auth
 * provider + signup helpers so production console output stays clean and
 * we never accidentally leak emails, tokens, or session ids to end users.
 */
const isDev =
  typeof process !== "undefined" && process.env.NODE_ENV !== "production";

export function devLog(message: string, ...rest: unknown[]): void {
  if (!isDev) return;
  // eslint-disable-next-line no-console
  console.log(`[auth] ${message}`, ...rest);
}

export function devWarn(message: string, ...rest: unknown[]): void {
  if (!isDev) return;
  // eslint-disable-next-line no-console
  console.warn(`[auth] ${message}`, ...rest);
}
