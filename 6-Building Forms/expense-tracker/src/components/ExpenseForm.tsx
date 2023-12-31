import { useExpenseTracker } from "../contexts/expenseTracker";
import Input from "./Input";
import Select, { OptionTypes } from "./Select";
import { useForm } from "react-hook-form";

export type ExpenseType = {
  description: string;
  amount: string;
  category: string;
};

export type ExpenseItem = ExpenseType & {
  id: string;
};

export type ExpenseItemsType = ExpenseItem[];

export type HandleDelete = {
  handleDeleteExpense: (id: string) => void;
};

const categoryOptions: OptionTypes[] = [
  {
    name: "",
    label: "Select Your Category",
  },
  {
    name: "groceries",
    label: "Groceries",
  },
  {
    name: "utilities",
    label: "Utilities",
  },
  {
    name: "entertainment",
    label: "Entertainment",
  },
];

function ExpenseForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseType>();

  const { createExpense } = useExpenseTracker();

  function onSubmit(expense: ExpenseType) {
    createExpense({ ...expense, id: crypto.randomUUID() });
    reset();
  }

  return (
    <>
      <form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Description"
          type="text"
          name="description"
          errorMessage={errors.description?.message}
          validationSchema={{
            required: "Description text is required",
            minLength: {
              value: 2,
              message: "Please enter a minimum of 2 characters",
            },
          }}
          register={register}
        />

        <Input
          label="Amount"
          type="number"
          errorMessage={errors.amount?.message}
          name="amount"
          register={register}
          validationSchema={{
            required: "Amount text is required",
            minLength: {
              value: 1,
              message: "Please enter a minimum of 1 characters",
            },
            maxLength: {
              value: 6,
              message: "Please enter a maximum of 6 characters",
            },
          }}
        />

        <label htmlFor="form-select" className="form-label">
          Category
        </label>
        <Select
          selectOption={categoryOptions}
          register={register}
          errorMessage={errors.category?.message}
          name="category"
          validationSchema={{ required: "Please Select Your Category" }}
        />

        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </>
  );
}

export default ExpenseForm;
