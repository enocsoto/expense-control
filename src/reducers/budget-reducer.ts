import type { Expense, DraftExpense } from '../types';
import { v4 as uuid } from 'uuid';

export type BudgetActions =
  | { type: 'add-budget'; payload: { budget: number } }
  | { type: 'show-modal' }
  | { type: 'hide-modal' }
  | { type: 'add-expense'; payload: { expense: DraftExpense } }
  | { type: 'delete-expense'; payload: { id: Expense['id'] } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
};

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expenses: [],
};

export const budgetReducer = (state: BudgetState, action: BudgetActions) => {
  if (action.type === 'add-budget') {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }

  if (action.type === 'show-modal') {
    return {
      ...state,
      modal: true,
    };
  }
  if (action.type === 'hide-modal') {
    return {
      ...state,
      modal: false,
    };
  }

  if (action.type === 'add-expense') {
    const newexpense: Expense = { ...action.payload.expense, id: uuid() };
    return {
      ...state,
      expenses: [...state.expenses, newexpense],
      modal: false,
    };
  }

  if (action.type === 'delete-expense') {
    const newexpenses = state.expenses.filter(expense => expense.id !== action.payload.id);
    return {
      ...state,
      expenses: newexpenses,
    };
  }

  return state;
};
