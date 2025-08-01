import { categories } from '../data/categories';

const ExpenseForm = () => {
  return (
    <form
      className='space-y-5'>
      <legend className="uppercase text-center, text-2xl font-black boder-b-4 border-blue-500 py-2"
      >Nuevo Gasto
      </legend>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="expenseName"
          className="text-xl"
        >Nombre Gasto:</label>

        <input
          type="text"
          className="bg-slate-100 p-2"
          id="expenseName"
          placeholder="Añade el nombre del gasto"
          name="expenseName"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="amount"
          className="text-xl"
        >Cantidad:</label>

        <input
          type="number"
          className="bg-slate-100 p-2"
          id="amount"
          placeholder="Añade la cantidad del gasto ejemplo: 1000"
          name="amount"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="category"
          className="text-xl"
        >Categoria:</label>

        <select
          id="category"
          aria-placeholder="Añade la cantidad del gasto ejemplo: 1000"
          className="bg-slate-100 p-2"
          name="category"
        >
          <option value=''>Selecciona una categoria</option>
          {categories.map(category => (
            <option
              key={category.id}
              value={category.id}
            >{category.name}</option>
          ))}
        </select>
      </div>

      <input 
        type="submit"
        className='bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg'
        value={'Registrar Gasto'} 
      />
    </form>
  )
}

export default ExpenseForm