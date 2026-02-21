/* ─── Admin credentials from environment variables ─── */

export function getAdminEmail() {
  return process.env.ADMIN_EMAIL ?? "";
}
export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}
export function getAuthToken() {
  return process.env.AUTH_TOKEN ?? "";
}
