import {ApiTransaction, TransactionMutation} from '../../../types';
import React, {useEffect, useState} from 'react';
import ButtonSpinner from '../Spinners/ButtonSpinner';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCategories} from '../../store/categories/categoriesSlice';
import {fetchCategories} from '../../store/categories/categoriesThunks';
import {fetchTransactions} from '../../store/transactions/transactonsThunks';
import {selectTransactions} from '../../store/transactions/transactionsSlice';

const initialState: TransactionMutation= {
  type: '',
  category: '',
  amount: '',
};

interface Props {
  onSubmit: (transaction: ApiTransaction) => void;
  existingTransaction?: TransactionMutation;
  isEdit?: boolean;
  isLoading?: boolean;
}
const TransactionForm: React.FC<Props> = ({onSubmit, existingTransaction = initialState, isEdit = false, isLoading= false}) => {
  const [transaction, setTransaction] = useState<TransactionMutation>(existingTransaction);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const transactions = useAppSelector(selectTransactions);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTransactions());
  }, [dispatch]);

  const changeTransaction = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTransaction((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(isLoading) return;

    onSubmit({
      ...transaction,
      amount: parseFloat(transaction.amount),
    });
  };

  const newCategories = categories.filter((category => category.type === transaction.type));

  return (
    <form onSubmit={onFormSubmit}>
      <h4>{isEdit ? 'Edit dish' : 'Add new transaction'}</h4>
      <div className="form-group">
        <label htmlFor="type">Type:</label>
        <select className="form-control" id="type" name="type"  required value={transaction.type} onChange={changeTransaction}>
          <option value=""> </option>
          <option value='expense'>Expense</option>
          <option value='income'>Income</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select className="form-control" id="category" name="category"  required value={transaction.category} onChange={changeTransaction}>
          {newCategories.map(newCategory => (
          <option key={newCategory.id} value={newCategory.name}>{newCategory.name} </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          name="amount"
          id="amount"
          className="form-control"
          value={transaction.amount}
          onChange={changeTransaction}
        />
        KGS
      </div>
      <button type="submit" className="btn btn-primary mt-2" disabled={isLoading}>
        {isLoading && <ButtonSpinner/>}
        {isEdit ? 'Edit' : 'Update'}
      </button>
    </form>
  );
};

export default TransactionForm;