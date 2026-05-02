import { SignUpFormValues } from '@/app/sign-up/page';
import { apiSlice } from '../apiSlice';
import { User } from '@/types/User';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<User, SignUpFormValues>({
      query: (signUpData) => ({
	url: "/auth/sign-up",
	method: "POST",
	body: signUpData
	}),
    }),
  })
})

export const {useCreateUserMutation} = authApi;
