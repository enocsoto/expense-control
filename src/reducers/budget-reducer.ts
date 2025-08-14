import type { Expense, DraftExpense } from '../types';
import { v4 as uuid } from 'uuid';

export type BudgetActions =
  | { type: 'add-budget'; payload: { budget: number } }
  | { type: 'show-modal' }
  | { type: 'hide-modal' }
  | { type: 'add-expense'; payload: { expense: DraftExpense } }
  | { type: 'delete-expense'; payload: { id: Expense['id'] } }
  | { type: 'edit-expense'; payload: { id: Expense['id'] } }
  | { type: 'update-expense'; payload: { expense: Expense } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense['id'];
};

const initialBudget = (): number => {
  const localStorageBudget = localStorage.getItem('budget');
  return localStorageBudget ? +localStorageBudget : 0;
}

const localStorageExpenses = (): Expense[] => {
  const localStorageExpenses = localStorage.getItem('expenses');
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
}

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses:localStorageExpenses(),
  editingId: '',
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
      editingId: '',
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

  if (action.type === 'edit-expense') {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true,
    };
  }

  if (action.type === 'update-expense') {
    const newexpenses = state.expenses.map(expense =>
      expense.id === action.payload.expense.id ? action.payload.expense : expense,
    );
    return {
      ...state,
      expenses: newexpenses,
      editingId: '',
      modal: false,
    };
  }

  return state;
};
