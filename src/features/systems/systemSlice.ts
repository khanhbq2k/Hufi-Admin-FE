import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  getAirlines,
  getAllCountries as getCountries,
  getUserInfo,
  getAirports,
} from '~/apis/system';
import { some } from '~/utils/constants/constant';

export interface AllowAgentType {
  code: string;
  id: number;
  name: string;
}
export interface AirlinesType {
  code: string;
  id: number;
  name: string;
  logoUrl: string;
}

export interface AirportType {
  code: string;
  name: string;
}

export interface SystemState {
  locale: string;
  isLoading: boolean;
  userInfo: some;
  airlines: AirlinesType[];
  airports: AirportType[];
  countries: some[];
}

const initialState: SystemState = {
  locale: 'vi',
  isLoading: false,
  userInfo: {},
  airlines: [],
  airports: [],
  countries: [],
};

export const fetUserInfoAsync = createAsyncThunk('system/fetUser', async () => {
  const { data } = await getUserInfo();
  return await data.data;
});

export const fetAirlines = createAsyncThunk('system/fetAirlines', async () => {
  try {
    const { data } = await getAirlines();
    return await data.data.items;
  } catch (error) {
    console.log(error);
  }
});

export const fetAirports = createAsyncThunk('system/fetAirports', async () => {
  try {
    const { data } = await getAirports();
    return await data.data.items;
  } catch (error) {
    console.log(error);
  }
});

export const fetCountries = createAsyncThunk('system/fetCountries', async () => {
  try {
    const { data } = await getCountries();
    return await data.data.items;
  } catch (error) {
    console.log(error);
  }
});

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    visibleLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<object>) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetUserInfoAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetUserInfoAsync.fulfilled, (state, action: PayloadAction<object>) => {
      state.isLoading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(fetUserInfoAsync.rejected, (state, action) => {
      if (action.payload) {
        state.isLoading = false;
      } else {
        state.isLoading = false;
      }
    });
    builder.addCase(fetAirlines.fulfilled, (state, action: PayloadAction<AirlinesType[]>) => {
      state.airlines = action.payload;
    });
    builder.addCase(fetAirports.fulfilled, (state, action: PayloadAction<AirportType[]>) => {
      state.airports = action.payload;
    });
    builder.addCase(fetCountries.fulfilled, (state, action: PayloadAction<some[]>) => {
      state.countries = action.payload;
    });
  },
});

export const { visibleLoading, setUserInfo } = systemSlice.actions;

export default systemSlice.reducer;
