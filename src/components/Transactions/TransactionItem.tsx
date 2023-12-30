import {TransactionBase, TransactionUnit} from '../../../types';
import React, {useEffect} from 'react';
import ButtonSpinner from '../Spinners/ButtonSpinner';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectTransactions} from '../../store/transactions/transactionsSlice';
import {selectCategories, selectCategory} from '../../store/categories/categoriesSlice';
import {fetchCategories} from '../../store/categories/categoriesThunks';
import {fetchTransactions} from '../../store/transactions/transactonsThunks';


interface Props {
  transaction: TransactionUnit;
  deleteLoading: boolean | string;
  onDelete: React.MouseEventHandler;
}

const TransactionItem: React.FC<Props> = ({transaction, deleteLoading, onDelete}) => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const categories = useAppSelector(selectCategories);


  return (
    <div className="card mb-2">
      <div className="row no-gutters">
        <div className="col">
          <div className="d-flex">
            <p className='col-'>{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</p>
            <p className="col-2">{transaction.id}</p>
            <p className="col-3">{transaction.amount} KGS</p>
            <p className="d-flex gap-2">
              <button
                className="btn btn-danger"
                onClick={onDelete}
                disabled={deleteLoading ? deleteLoading === transaction.id : false}
              >
                {deleteLoading && deleteLoading === transaction.id && (<ButtonSpinner/>)}
                Delete</button>
              <Link to={'/edit-transaction/' + transaction.id} className="btn btn-primary ms-auto">Edit</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;

