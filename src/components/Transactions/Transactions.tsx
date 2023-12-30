import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchCategories} from '../../store/categories/categoriesThunks';
import {fetchTransactions} from '../../store/transactions/transactonsThunks';
import {selectFetchTransactionLoading, selectTransactions} from '../../store/transactions/transactionsSlice';
import Spinner from '../Spinners/Spinner';
import TransactionItem from './TransactionItem';


const Transactions:React.FC = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const transactionsLoading = useAppSelector(selectFetchTransactionLoading);


  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <>
      <div className="d-flex m-3">
        <h4>Transactions</h4>
      </div>
      {transactionsLoading ? <Spinner/> : transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
        />
      ))}
    </>
  );
};

export default Transactions;