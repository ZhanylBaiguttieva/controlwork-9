import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCreateTransactionLoading, selectTransactions} from '../../store/transactions/transactionsSlice';
import {ApiTransaction, Transaction, TransactionBase} from '../../../types';
import {createTransaction, fetchTransactions} from '../../store/transactions/transactonsThunks';
import TransactionForm from './TransactionForm';
import React, {useEffect} from 'react';
import {selectCategories} from '../../store/categories/categoriesSlice';
import {fetchCategories} from '../../store/categories/categoriesThunks';
import categories from '../Categories/Categories';
import transactions from '../Transactions/Transactions';

const NewTransaction: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectCreateTransactionLoading);
  const transactions = useAppSelector(selectTransactions);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTransactions());
  }, [dispatch]);

  const onSubmit = async () => {
    const newTransactions: TransactionBase = transactions.reduce((acc, transaction: Transaction) => {
      const now = new Date();
      const amount = transaction.amount;
      const createdAt = now.toISOString();
      const categoryId = transaction.id;

      return {
        ...acc,
        amount,
        categoryId,
        createdAt,
      };
    },{});

    await dispatch(createTransaction(newTransactions));
    navigate('/');
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <TransactionForm onSubmit={onSubmit} isLoading={createLoading}/>
      </div>
    </div>
  );
};

export default NewTransaction;