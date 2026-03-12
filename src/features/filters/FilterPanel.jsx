// import { Form, Link } from "react-router-dom";
import { Form } from "react-router-dom";
//
import { useState } from "react";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import FormRange from "../../components/FormRange";
import FormCheckbox from "../../components/FormCheckbox";

const Filters = ({ filters, applyFilters, meta }) => {
    const [localFilters, setLocalFilters] = useState(filters);
    const { search, category, company, order, price, shipping } = localFilters;
    const [resetKey, setResetKey] = useState(0);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    setLocalFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

    const submitButton = (e) => {
    e.preventDefault();
    applyFilters(localFilters);
  };

 
    const resetButton = (e) => {
    e.preventDefault();
    setResetKey((prev) => prev + 1);

    const defaults = {
      search: "",
      category: "all",
      company: "all",
      order: "a-z",
      price: 100000,
      shipping: false,
    };

    setLocalFilters(defaults);
    applyFilters(defaults);
  };

  return (
    <form
      key={resetKey}
      onSubmit={submitButton}
      className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'
    >
      <FormInput
        type='search'
        label='search product'
        name='search'
        size='input-sm'
        value={search}
        onChange={handleChange}

      />
      <FormSelect
        label='category'
        name='category'
        list={meta.categories}
        size='select-sm'
        value={category}
        onChange={handleChange}

      />
      <FormSelect
        label='company'
        name='company'
        list={meta.companies}
        size='select-sm'
        value={company}
        onChange={handleChange}

      />
      <FormSelect
        label='sort by'
        name='order'
        list={['a-z', 'z-a', 'high', 'low']}
        size='select-sm'
        value={order}
        onChange={handleChange}

      />
      <FormRange
        name='price'
        label='select price'
        size='range-sm'
        price={price}
        onChange={handleChange}

      />
      <FormCheckbox
        name='shipping'
        label='free shipping'
        size='checkbox-sm'
        checked={shipping}
        onChange={handleChange}

      />
      <button type='submit' className='btn btn-primary btn-sm'>
        search
      </button>
      <button type='button' onClick={resetButton} className='btn btn-accent btn-sm'>
        reset
      </button>
    </form>
  );
};
export default Filters;