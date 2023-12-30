import React, {useState} from 'react';
import ButtonSpinner from '../Spinners/ButtonSpinner';
import {ApiCategory} from '../../../types';

const initialState: ApiCategory = {
  type: '',
  name: '',
};
interface Props {
  onSubmit: (category: ApiCategory) => void;
  existingCategory?: ApiCategory;
  isEdit?: boolean;
  isLoading?: boolean;
}

const CategoryForm: React.FC<Props> = ({onSubmit, existingCategory = initialState, isEdit = false, isLoading= false}) => {
  const [category, setCategory] = useState<ApiCategory>(existingCategory);

  const changeCategory = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCategory((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(isLoading) return;

    onSubmit({
      ...category,
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4>{isEdit ? 'Edit category' : 'Add new category'}</h4>
      <div className="form-group">
        <label htmlFor="type">Type:</label>
        <input
          type="text"
          name="type"
          id="type"
          className="form-control"
          value={category.type}
          onChange={changeCategory}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          value={category.name}
          onChange={changeCategory}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2" disabled={isLoading}>
        {isLoading && <ButtonSpinner/>}
        {isEdit ? 'Edit' : 'Save'}
      </button>
    </form>
  );
};
export default CategoryForm;