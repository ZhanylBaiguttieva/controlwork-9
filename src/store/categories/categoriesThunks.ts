import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiCategory, CategoriesList, Category} from '../../../types';
import axiosApi from '../../../axiosApi';
import {AppDispatch} from '../../app/store';

export const fetchCategories = createAsyncThunk<Category[], undefined, {dispatch: AppDispatch}>(
  'categories/fetchAll',
  async () => {
    const categoriesResponse = await axiosApi.get<CategoriesList | null>('/categories.json');
    const categories = categoriesResponse.data;

    let newCategories: Category[] = [];
    if(categories) {
      newCategories = Object.keys(categories).map(key => {
        const category = categories[key];
        return {
          ...category,
          id: key,
        };
      });
    }
    return newCategories;
  }
);
export const deleteCategory = createAsyncThunk<void, string>(
  'categories/delete',
  async (categoryId) => {
    await axiosApi.delete('/categories/' + categoryId + '.json');
  }
);

export const createCategory = createAsyncThunk<void, ApiCategory>(
  'categories/create',
  async(category) => {
    await axiosApi.post('/categories.json', category);
  }
);

export const fetchOneCategory = createAsyncThunk<ApiCategory, string>(
  'categories/fetchOne',
  async(categoryId) => {
    const response = await axiosApi.get<ApiCategory | null>('/categories/' + categoryId + '.json');
    const category = response.data;

    if(category === null) {
      throw new Error('Not found');
    }

    return category;
  }
);

interface UpdateCategoryParams {
  id: string,
  category: ApiCategory,
}
export const updateCategory = createAsyncThunk<void,UpdateCategoryParams>(
  'categories/update',
  async({id, category}) => {
    await axiosApi.put('/categories/' + id + '.json', category);
  }
);