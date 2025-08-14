import { categories } from '../data/categories';
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import type { DraftExpense, Value } from '../types';
import { useEffect, useState, type ChangeEvent } from 'react';
import ErrorMessage from './ErrorMessage';
import { useBudget } from '../hooks/useBudget';

const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date(),
  });
  const [error, setError] = useState('');

  const { state, dispatch } = useBudget();

  useEffect(() =>{
    if(state.editingId){
      const editingExpense = state.expenses.find(expense => expense.id === state.editingId);
      if(editingExpense){
        setExpense(editingExpense);
      }
    }
  }, [state.editingId]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isAmountField = ['amount'].includes(name);
    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value,
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //validar
    if (Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios');
      return;
    }
    // agregar o actualizar un nuevo gasto
    if(state.editingId){
      dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense} } })
    } else {
    dispatch({
      type: 'add-expense',
      payload: {
        expense,
      },
    });
  }
    // limpiar formulario
    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date(),
    });
  };
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center, text-2xl font-black boder-b-4 border-blue-500 py-2">
        {state.editingId ? 'Editar gasto' : 'Añadir gasto'}
      </legend>
      {error && <ErrorMessage>{error} </ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>

        <input
          type="text"
          className="bg-slate-100 p-2"
          id="expenseName"
          placeholder="Añade el nombre del gasto"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>

        <input
          type="number"
          className="bg-slate-100 p-2"
          id="amount"
          placeholder="Añade la cantidad del gasto ejemplo: 1000"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoria:
        </label>

        <select
          id="category"
          aria-placeholder="Añade la cantidad del gasto ejemplo: 1000"
          className="bg-slate-100 p-2"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">Selecciona una categoria</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Fecha Gastos:
        </label>
        <DatePicker
          className="bg-slate-100 p-2 border-0"
          name="date"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value={state.editingId ? 'Editar Gasto' : 'Añadir Gasto'}
      />
    </form>
  );
};

export default ExpenseForm;
