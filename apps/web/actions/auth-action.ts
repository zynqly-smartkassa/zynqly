"use server";

import { SignInFormValues } from "@/app/sign-in/page";
import { SignUpFormValues } from "@/app/sign-up/page";
import axios from "axios";
import { cookies } from "next/headers";

/**
 * Pre-configured axios instance for the backend auth API.
 *
 * The base URL is read from `NEXT_PUBLIC_BACKEND_URL` and combined with the
 * Spring servlet context path so every call hits `/api/v1/auth/*`.
 */
const authFetch = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth`,
  headers: {
    Accept: "application/json",
  },
});

/**
 * Server action that registers a new account against the backend.
 *
 * Forwards the form payload to `POST /auth/sign-up`, persists the returned
 * refresh-token cookie via Next.js' cookie store (so it is HTTP-only and
 * never exposed to client JS), and returns a discriminated result the RTK
 * mutation can branch on.
 *
 * @return `{ success: true, data }` on success, otherwise `{ success: false, error }`.
 */
export const signUpAction = async (signUpData: SignUpFormValues) => {
  try {
    const res = await authFetch.post("sign-up", signUpData);

    const setCookieHeader = res.headers["set-cookie"];

    if (setCookieHeader) {
      await setRefreshCookie(setCookieHeader);
    }

    return { success: true, data: res.data };
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        error: error.response.data,
      };
    }
    return {
      success: false,
      error: { status: 500, message: "Internal Server error" },
    };
  }
};

/**
 * Server action that authenticates an existing user.
 *
 * Mirrors `signUpAction` but targets `POST /auth/sign-in`. The refresh-token
 * cookie returned by the backend is rewritten into the Next.js cookie store
 * so subsequent server requests can read it from `cookies()`.
 *
 * @return `{ success: true, data }` on success, otherwise `{ success: false, error }`.
 */
export const signInAction = async (signInData: SignInFormValues) => {
  try {
    const res = await authFetch.post("sign-in", signInData);

    const setCookieHeader = res.headers["set-cookie"];

    if (setCookieHeader) {
      await setRefreshCookie(setCookieHeader);
    }

    return { success: true, data: res.data };
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        error: error.response.data,
      };
    }
    return {
      success: false,
      error: { status: 500, message: "Internal Server error" },
    };
  }
};

/**
 * Server action that exchanges the refresh-token cookie for a fresh access
 * token.
 *
 * Reads the HTTP-only `refresh_tk` cookie from the Next.js cookie store and
 * forwards it manually as a `Cookie` header because server-action axios calls
 * do not share the browser's cookie jar. The endpoint hit is
 * `GET /auth/access-tk`.
 *
 * @return `{ success: true, data }` carrying the new {@link AuthResponseDto},
 *         or `{ success: false, error }` when the cookie is missing or the
 *         backend rejects it.
 */
export const getAccessTkAction = async () => {
  try {
    const cookieStore = await cookies();
    const refreshTk = cookieStore.get("refresh_tk");

    if (!refreshTk) {
      return { success: false, error: "No refresh token found" };
    }

    const res = await authFetch.get(`access-tk`, {
      headers: {
        Cookie: `refresh_tk=${refreshTk.value}`,
      },
      withCredentials: true,
    });

    console.log(res);

    return { success: true, data: res.data };
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        error: error.response.data,
      };
    }
    return {
      success: false,
      error: { status: 500, message: "Internal Server error" },
    };
  }
};

/**
 * Parses the backend's `Set-Cookie` header and re-emits the `refresh_tk`
 * cookie through the Next.js cookie store with explicit security attributes.
 *
 * Doing the re-emit ourselves lets us guarantee the cookie ends up HTTP-only,
 * scoped to `/`, and with the 30-day lifetime that matches the JWT expiry,
 * independent of what proxies in front of Next.js might strip.
 */
async function setRefreshCookie(setCookieHeader: string[]) {
  const cookieStore = await cookies();

  // find this cookie: Set-Cookie: refresh_tk=abc123...; HttpOnly; Path=/
  const refreshTokenCookie = Array.isArray(setCookieHeader)
    ? setCookieHeader.find((c) => c.startsWith("refresh_tk="))
    : setCookieHeader;

  if (refreshTokenCookie) {
    const [nameValue] = refreshTokenCookie.split(";");
    const [, value] = nameValue.split("=");

    cookieStore.set({
      name: "refresh_tk",
      value,
      httpOnly: true,
      secure: false,
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
      sameSite: "lax",
    });
  }
}

/**
 * Removes the refresh-token cookie from the browser.
 *
 * Used by the sign-out flow in the header; because the backend keeps no
 * server-side session, deleting the cookie is sufficient to terminate the
 * user's authenticated state.
 */
export const deleteRefreshCookie = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("refresh_tk");
};
