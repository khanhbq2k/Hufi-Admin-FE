import { combineReducers } from '@reduxjs/toolkit';
import systemReducer from '~/features/systems/systemSlice';
import flightReducer from '~/features/flight/flightSlice';

const rootReducer = combineReducers({
  systemReducer,
  flightReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
