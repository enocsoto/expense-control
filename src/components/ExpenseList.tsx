import { useMemo } from 'react';
import { useBudget } from '../hooks/useBudget';
import ExpenseDetails from './ExpenseDetails';

const ExpenseList = () => {
  const { state } = useBudget();
  const isEmpty = useMemo(() => !state.expenses.length, [state.expenses]);

  return (
    <div className="mt-10">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold">No hay gastos para mostrar</p>
      ) : (
        <>
          <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>
          {state.expenses.map(expense => (
            <ExpenseDetails key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
};

export default ExpenseList;
