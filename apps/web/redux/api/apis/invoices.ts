
import { Page } from '@/types/Page';
import { apiSlice } from '../apiSlice';
import { CreateInvoiceRequest, Invoice, InvoiceStats } from '@/types/Invoice';

const invoices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query<Page<Invoice>, number>({
      query: (page) => `/invoices?page=${page}`,
       providesTags: ["Invoices"]
    }),
    getInvoicesStats: builder.query<InvoiceStats, void>({
      query: () => `/invoices/stats`,
      providesTags: ["Invoices"]
    }),
    createInvoice: builder.mutation<void, CreateInvoiceRequest>({
      query: (invoiceData) => ({
        url: "/invoices/create",
        method: "POST",
        body: invoiceData
      }),
      invalidatesTags: ["Invoices"]
    }),
  })
})

export const { useGetInvoicesQuery, 
  useGetInvoicesStatsQuery,
   useCreateInvoiceMutation } = invoices;