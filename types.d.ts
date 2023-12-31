export interface Category {
  id: string;
  type: string;
  name: string;
}

export type ApiCategory = Omit<Category, 'id'>;

export interface CategoriesList {
  [id:string]: ApiCategory;
}

 export interface Transaction {
  id: string;
  type: string;
  category: string;
  amount: number;
 }

export interface TransactionMutation {
  type: string;
  category: string;
  amount: string;
}

export type ApiTransaction = Omit<Transaction, 'id'>;

export interface TransactionsList {
  [id:string]: ApiTransaction;
}

export interface TransactionBase {
  category: string;
  amount: number;
  createdAt: string;
}
export interface TransactionUnit {
  id: string;
  category:  string;
  amount: number;
  createdAt: string;
}