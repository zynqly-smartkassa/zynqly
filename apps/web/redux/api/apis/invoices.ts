import { apiSlice } from '../apiSlice';
import type { InvoicesResponse, CreateInvoiceRequest, Invoice } from '@/types/Invoice';

const invoicesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query<InvoicesResponse, void>({
      query: () => '/invoices',
      providesTags: ['Invoices'],
    }),
    createInvoice: builder.mutation<Invoice, CreateInvoiceRequest>({
      query: (body) => ({
        url: '/invoices',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Invoices'],
    }),
  }),
});

export const { useGetInvoicesQuery, useCreateInvoiceMutation } = invoicesApi;
