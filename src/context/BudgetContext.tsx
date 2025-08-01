import { createContext, useReducer, type Dispatch, type ReactNode } from 'react';
import {
  budgetReducer,
  initialState,
  type BudgetActions,
  type BudgetState,
} from '../reducers/budget-reducer';

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
};

type BudgetPrividerProps = {
  children: ReactNode;
};
export const BudgetContext = createContext<BudgetContextProps>({
  state: initialState,
  dispatch: () => {},
});
export const BudgetProvider = ({ children }: BudgetPrividerProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
