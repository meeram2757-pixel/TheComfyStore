import { useState } from "react";

const FormRange = ({ label, name, size, price, onChange }) => {
  const step = 1000;
  const maxPrice = 100000;
  const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);

  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span>
          {(selectedPrice / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </label>
      <input
        type="range"
        name={name}
        min={0}
        max={maxPrice}
        value={selectedPrice}
        onChange={(e) => {
          setSelectedPrice(e.target.value);
          onChange && onChange(e);
        }}
        className={`range range-primary ${size}`}
        step={step}
      />
      <div className="w-full flex justify-between text-xs px-2 mt-2">
        <span className="font-bold text-xs">0</span>
        <span className="font-bold text-xs">
          Max :{" "}
          {(maxPrice / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
    </div>
  );
};
export default FormRange;
