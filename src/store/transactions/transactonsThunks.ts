import {createAsyncThunk} from '@reduxjs/toolkit';
import {Transaction, TransactionBase, TransactionsList} from '../../../types';
import {AppDispatch} from '../../app/store';
import axiosApi from '../../../axiosApi';

export const fetchTransactions = createAsyncThunk<Transaction[], undefined, {dispatch: AppDispatch}>(
  'transactions/fetchAll',
  async () => {
    const transactionsResponse = await axiosApi.get<TransactionsList | null>('/categories.json');
    const transactions = transactionsResponse.data;

    let newTransactions: Transaction[] = [];
    if(transactions) {
      newTransactions = Object.keys(transactions).map(key => {
        const transaction = transactions[key];
        return {
          ...transaction,
          id: key,
        };
      });
    }
    return newTransactions;
  }
);

export const createTransaction = createAsyncThunk<void, TransactionBase>(
  'transactions/create',
  async(transaction) => {
    await axiosApi.post('/transactions.json', transaction);
  }
);
