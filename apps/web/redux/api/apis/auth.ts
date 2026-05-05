import { SignUpFormValues } from "@/app/sign-up/page";
import { apiSlice } from "../apiSlice";
import { User } from "@/types/User";
import { AuthResponseDto } from "@/types/AuthResponseDto";
import { SignInFormValues } from "@/app/sign-in/page";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<AuthResponseDto, SignUpFormValues>({
      query: (signUpData) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: signUpData,
      }),
    }),

    signIn: builder.mutation<AuthResponseDto, SignInFormValues>({
      query: (signInData) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: signInData
      })
    }),

    getAccessTk: builder.query<AuthResponseDto, void>({
      query: () => `/auth/access-tk`
    })
  }),
});

export const { useSignUpMutation, useSignInMutation, useGetAccessTkQuery } = authApi;
