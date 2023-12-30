import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCreateTransactionLoading, selectTransactions} from '../../store/transactions/transactionsSlice';
import {Transaction, TransactionBase} from '../../../types';
import {createTransaction, fetchTransactions} from '../../store/transactions/transactonsThunks';
import TransactionForm from './TransactionForm';
import React, {useEffect} from 'react';
import {fetchCategories} from '../../store/categories/categoriesThunks';
import {selectCategories, selectCategory} from '../../store/categories/categoriesSlice';

const NewTransaction: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectCreateTransactionLoading);
  const transactions = useAppSelector(selectTransactions);
  const categories = useAppSelector(selectCategories);
  const category = useAppSelector(selectCategory);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTransactions());
  }, [dispatch]);

  const onSubmit = async () => {
    const newTransactions: TransactionBase = transactions.reduce((acc, transaction ) => {
      const now = new Date();
      const amount = transaction.amount;
      const createdAt = now.toISOString();
      const category = transaction.id;

      console.log(category);

      return {
        ...acc,
        amount,
        category,
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