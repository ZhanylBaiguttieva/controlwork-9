import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  selectCategories, selectCreateCategoryLoading,
  selectDeleteCategoryLoading,
  selectFetchCategoryLoading
} from '../../store/categories/categoriesSlice';
import {createCategory, deleteCategory, fetchCategories} from '../../store/categories/categoriesThunks';
import Spinner from '../Spinners/Spinner';
import CategoryItem from './CategoryItem';
import Modal from '../Modal/Modal';
import CategoryForm from '../CategoryForm/CategoryForm';
import {ApiCategory} from '../../../types';


const Categories: React.FC= () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const deleteLoading = useAppSelector(selectDeleteCategoryLoading);
  const categoriesLoading = useAppSelector(selectFetchCategoryLoading);
  const createLoading = useAppSelector(selectCreateCategoryLoading);

  const removeCategory = async (id: string) => {
    await dispatch(deleteCategory(id));
    await dispatch(fetchCategories());
  };

  const onSubmit = (category:ApiCategory) => {
    dispatch(createCategory(category));
    setShowModal(false);
    dispatch(fetchCategories());
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <>
      <div className="d-flex m-3">
        <h4>Categories</h4>
        <button className="btn btn-success ms-auto" onClick={()=> setShowModal(true)}>Add</button>
      </div>
      {categoriesLoading ? <Spinner/> : categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          deleteLoading = {deleteLoading}
          onDelete={() => removeCategory(category.id)}
        />
      ))}
      <Modal show={showModal} title="New category" onClose={() => setShowModal(false)}>
        <div className="modal-body">
          <CategoryForm onSubmit={onSubmit} isLoading={createLoading}/>
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </Modal>
    </>
  );
};

export default Categories;