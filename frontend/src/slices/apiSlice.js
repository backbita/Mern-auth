import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQ = fetchBaseQuery({
  baseUrl: ''
})

export const apiSlice = createApi({
  baseQuery: baseQ,
  tagTypes: ['User'],
  endpoints: (builder) => ({})
})




