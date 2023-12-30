import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  selectCategory,
  selectFetchOneCategoryLoading,
  selectUpdateCategoryLoading
} from '../../store/categories/categoriesSlice';
import {fetchOneCategory, updateCategory} from '../../store/categories/categoriesThunks';
import {ApiCategory} from '../../../types';
import Spinner from '../Spinners/Spinner';
import CategoryForm from '../CategoryForm/CategoryForm';

const EditCategory: React.FC = () => {
  const {id} = useParams() as {id: string};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategory);
  const fetchLoading = useAppSelector(selectFetchOneCategoryLoading);
  const updateCategoryLoading = useAppSelector(selectUpdateCategoryLoading);

  useEffect(() => {
    dispatch(fetchOneCategory(id));
  }, [dispatch, id]);

  const onSubmit = async (category: ApiCategory) => {
    await dispatch(updateCategory({id,category}));
    navigate ('/categories');
  };

  const existingCategory = category ? {
    ...category,
  } : undefined;

  let formSection = <Spinner/>;

  if(!fetchLoading) {
    if(category) {
      formSection = (
        <CategoryForm
          isEdit
          onSubmit={onSubmit}
          existingCategory={existingCategory}
          isLoading={updateCategoryLoading}/>
      );
    } else {
      formSection = <h4>Not found</h4>;
    }
  }

  return (
    <div className="row mt-2">
      <div className="col">
        {formSection}
      </div>
    </div>
  );
};

export default EditCategory;