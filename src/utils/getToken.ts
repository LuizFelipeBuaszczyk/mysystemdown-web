"use server";

import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

export async function getToken() {
  const cookieStore: Promise<ReadonlyRequestCookies> = cookies();

  return cookieStore
    .then(store => store.get("auth_token"))
    .then(cookie => cookie ? cookie.value : null)
    .catch(() => null);
}

export async function getRefreshToken() {
  const cookieStore: Promise<ReadonlyRequestCookies> = cookies();

  return cookieStore
    .then(store => store.get("refresh_token"))
    .then(cookie => cookie ? cookie.value : null)
    .catch(() => null);
}