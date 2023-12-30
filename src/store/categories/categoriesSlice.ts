import {ApiCategory, Category} from '../../../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createCategory, deleteCategory, fetchCategories, fetchOneCategory, updateCategory} from './categoriesThunks';
import {RootState} from '../../app/store';

interface CategoriesState {
  items: Category[];
  category: ApiCategory | null;
  fetchLoading: boolean;
  deleteLoading: false | string;
  createLoading: boolean;
  fetchOneLoading: boolean;
  updateLoading: boolean;
}

const initialState: CategoriesState = {
  items: [],
  category: null,
  fetchLoading: false,
  deleteLoading: false,
  createLoading: false,
  fetchOneLoading: false,
  updateLoading: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchCategories.fulfilled, (state, {payload: items}) => {
      state.fetchLoading = false;
      state.items = items;
    });

    builder.addCase(fetchCategories.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(deleteCategory.pending, (state, {meta}) => {
      state.deleteLoading = meta.arg;
    });

    builder.addCase(deleteCategory.fulfilled, (state) => {
      state.deleteLoading = false;
      state.fetchLoading = false;
    });

    builder.addCase(deleteCategory.rejected, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(createCategory.pending, (state) => {
      state.createLoading = true;
    });

    builder.addCase(createCategory.fulfilled, (state) => {
      state.createLoading = false;
    });

    builder.addCase(createCategory.rejected, (state) => {
      state.createLoading = false;
    });
    builder.addCase(fetchOneCategory.pending, (state) => {
      state.fetchOneLoading = true;
    });

    builder.addCase(fetchOneCategory.fulfilled, (state, {payload: category}: PayloadAction<ApiCategory | null>) => {
      state.fetchOneLoading = false;
      state.category = category;
    });

    builder.addCase(fetchOneCategory.rejected, (state) => {
      state.fetchOneLoading = false;
    });

    builder.addCase(updateCategory.pending, (state) => {
      state.updateLoading = true;
    });

    builder.addCase(updateCategory.fulfilled, (state) => {
      state.updateLoading = false;
    });

    builder.addCase(updateCategory.rejected, (state) => {
      state.updateLoading = false;
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategories = (state: RootState) => state.categories.items;
export const selectCategory = (state: RootState) => state.categories.category;
export const selectFetchCategoryLoading = (state: RootState) => state.categories.fetchLoading;
export const selectDeleteCategoryLoading = (state: RootState) => state.categories.deleteLoading;
export const selectCreateCategoryLoading = (state: RootState) => state.categories.createLoading;
export const selectFetchOneCategoryLoading = (state: RootState) => state.categories.fetchOneLoading;
export const selectUpdateCategoryLoading = (state: RootState) => state.categories.updateLoading;
