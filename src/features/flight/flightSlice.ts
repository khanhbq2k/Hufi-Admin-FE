import { getFlightBookingsDetail } from './../../apis/flight';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFlightBookings } from '~/apis/flight';
import { BookingsOnlineType, PagingOnline } from '~/features/flight/online/Modal';
import { some } from '~/utils/constants/constant';
import { adapterQueryFlight } from '~/utils/helpers/helpers';

export interface SystemState {
  isLoading: boolean;
  bookingsOnline: BookingsOnlineType[];
  pagingOnline: PagingOnline;
  filterOnline: some;
  flightOnlineDetail: some;
  total: number;
  salesList: some[];
  totalBookingsOnline: number;
}

const initialState: SystemState = {
  isLoading: false,
  bookingsOnline: [],
  totalBookingsOnline: 0,
  filterOnline: {},
  pagingOnline: {
    page: 0,
    size: 10,
  },
  flightOnlineDetail: {},
  total: 0,
  salesList: [],
};

export const fetFlightBookings = createAsyncThunk(
  'system/fetFlightBookings',
  async (query: some = {}) => {
    try {
      const { formData = {}, isFilter = true, paging = { page: 0, size: 10 } } = query;
      const dataQuery = adapterQueryFlight(formData, paging);
      const { data } = await getFlightBookings(dataQuery);
      if (data.code === 200) {
        return await {
          total: data?.data?.total,
          bookings: data.data.items,
          pagingOnline: isFilter
            ? {
                page: 0,
                size: 10,
              }
            : paging,
          filterOnline: formData,
        };
      }
      return [];
    } catch (error) {
      console.log(error);
    }
  },
);

export const fetFlightBookingsDetail = createAsyncThunk(
  'system/fetFlightBookingsDetail',
  async (query: some = {}) => {
    try {
      const { data } = await getFlightBookingsDetail(query);
      if (data.code === 200) {
        return await data.data;
      }
      return [];
    } catch (error) {
      console.log(error);
    }
  },
);

export const flightSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    visibleLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetFlightBookings.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetFlightBookings.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.bookingsOnline = action.payload.bookings;
      state.pagingOnline = action.payload.pagingOnline;
      state.filterOnline = action.payload.filterOnline;
      state.totalBookingsOnline = action.payload.total;
    });
    builder.addCase(fetFlightBookingsDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetFlightBookingsDetail.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.flightOnlineDetail = action.payload;
    });
  },
});

export const { visibleLoading } = flightSlice.actions;

export default flightSlice.reducer;
