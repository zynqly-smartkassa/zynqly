"use server";

import { SignInFormValues } from "@/app/sign-in/page";
import { SignUpFormValues } from "@/app/sign-up/page";
import axios from "axios";
import { cookies } from "next/headers";

const authFetch = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth`,
  headers: {
    Accept: "application/json",
  },
});

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

export const deleteRefreshCookie = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("refresh_tk");
};
