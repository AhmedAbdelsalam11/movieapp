import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    fetchTrending: builder.query({
      query: ({ mediaType, page }) => `/trending/${mediaType}/week?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&page=${page}`,
    }),
    fetchDetails: builder.query({
      query: (id) => `/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
    }),
  }),
});


export const {
  useFetchTrendingQuery,
  useFetchDetailsQuery
} = apiSlice;