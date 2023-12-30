import React from 'react';
import ButtonSpinner from '../Spinners/ButtonSpinner';
import {Link} from 'react-router-dom';
import {Category} from '../../../types';


interface Props {
  category: Category;
  deleteLoading: boolean | string;
  onDelete: React.MouseEventHandler;
}

const DishItem: React.FC<Props> = ({category, deleteLoading, onDelete}) => {

  return (
    <div className="card mb-2">
      <div className="row no-gutters">
        <div className="col">
          <div className="d-flex">
            <h4 className='col-3'>{category.name}</h4>
            <p className="col-5">{category.type}</p>
            <p className="d-flex gap-2">
              <button
                className="btn btn-danger"
                onClick={onDelete}
                disabled={deleteLoading ? deleteLoading === category.id : false}
              >
                {deleteLoading && deleteLoading === category.id && (<ButtonSpinner/>)}
                Delete</button>
              <Link to={'/edit-category/' + category.id} className="btn btn-primary ms-auto">Edit</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishItem;