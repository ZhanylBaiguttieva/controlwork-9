import {Transaction} from '../../../types';
import {createSlice} from '@reduxjs/toolkit';
import {createTransaction, fetchTransactions} from './transactonsThunks';
import {RootState} from '../../app/store';

interface TransactionsState {
  items: Transaction[];
  fetchLoading: boolean;
  createLoading: boolean;
  // deleteLoading: false | string;
  // fetchOneLoading: boolean;
  // updateLoading: boolean;
}

const initialState: TransactionsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  // deleteLoading: false,
  // fetchOneLoading: false,
  // updateLoading: false,
};

export const transactionsSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchTransactions.fulfilled, (state, {payload: items}) => {
      state.fetchLoading = false;
      state.items = items;
    });

    builder.addCase(fetchTransactions.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(createTransaction.pending, (state) => {
      state.createLoading = true;
    });

    builder.addCase(createTransaction.fulfilled, (state) => {
      state.createLoading = false;
    });

    builder.addCase(createTransaction.rejected, (state) => {
      state.createLoading = false;
    });
  }
});

export const transactionsReducer = transactionsSlice.reducer;

export const selectTransactions = (state: RootState) => state.transactions.items;
export const selectFetchTransactionLoading = (state: RootState) => state.transactions.fetchLoading;
export const selectCreateTransactionLoading = (state: RootState) => state.transactions.createLoading;