import { SignUpFormValues } from "@/app/sign-up/page";
import { apiSlice } from "../apiSlice";
import { User } from "@/types/User";
import { AuthResponseDto } from "@/types/AuthResponseDto";
import { SignInFormValues } from "@/app/sign-in/page";
import { getAccessTkAction, signInAction, signUpAction } from "@/actions/auth-action";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      async queryFn(signUpData) {
        const res = await signUpAction(signUpData);

        if (!res.success) {
            return { error: res.error };
        }

        return { data: res.data };
      }
    }),

    signIn: builder.mutation({
      async queryFn(signInData) {
        const res = await signInAction(signInData);

        if (!res.success) {
            return { error: res.error };
        }

        return { data: res.data };
      }
    }),

    getAccessTk: builder.query({
      async queryFn() {
        const res = await getAccessTkAction();

        if (!res.success) {
          return {error: res.error};
        }

        return {data: res.data};
      }
    })
  }),
});

export const { useSignUpMutation, useSignInMutation, useGetAccessTkQuery } = authApi;
