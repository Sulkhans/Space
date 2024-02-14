import { useState } from "react";

type expenseType = {
  name: string;
  price: string;
  quantity: string;
};

export const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Array<expenseType>>([
    { name: "", price: "", quantity: "1" },
  ]);

  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpenses((prev) => {
      const updated = [...prev];
      updated[i] = { ...updated[i], [name]: value };
      return updated;
    });
  };
  const handlePrice = (i: number, e: any) => {
    const key = e.key;
    if (!/^\d+$/.test(key) && key !== "." && key !== "Backspace") {
      e.preventDefault();
      return;
    }
    if (expenses[i].price.includes(".") && key === ".") {
      e.preventDefault();
      return;
    }
    if (expenses[i].price.split(".")[1]?.length === 2 && key !== "Backspace") {
      e.preventDefault();
      return;
    }
  };
  const handleQuantity = (i: number, e: any) => {
    const key = e.key;
    if (!/^\d+$/.test(key) && key !== "Backspace") {
      e.preventDefault();
      return;
    }
    if (expenses[i].quantity.length == 0 && key === "0") {
      e.preventDefault();
      return;
    }
  };
  const handleNew = () => {
    setExpenses((prev) => {
      const updated = [...prev];
      updated.push({ name: "", price: "", quantity: "1" });
      return updated;
    });
  };
  const total = () => {
    const prices = expenses.map((i) => Number(i.price) * Number(i.quantity));
    const total = prices.reduce((sum, current) => sum + current, 0);
    return total.toFixed(2);
  };

  return (
    <div>
      <div className="font-bold p-3 gap-4 border-2 border-neutral-900 shadow-md flex flex-col rounded-md select-none transition-all">
        {expenses.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-[0.4fr_0.4fr_0.2fr] sm:grid-cols-[0.4fr_0.4fr_0.2fr_0.4fr] sm:px-2 place-items-center text-nowrap"
          >
            <input
              name="name"
              placeholder="Name"
              value={item.name}
              onChange={(e) => handleChange(i, e)}
              maxLength={30}
              className="w-full pr-2"
            />
            <div>
              <span>$ </span>
              <input
                name="price"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleChange(i, e)}
                onKeyDown={(e) => handlePrice(i, e)}
                maxLength={10}
                className="w-4/5"
              />
            </div>
            <div>
              <span>x </span>
              <input
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleChange(i, e)}
                onKeyDown={(e) => handleQuantity(i, e)}
                maxLength={3}
                className="w-8"
              />
            </div>
            <span className="hidden sm:flex sm:gap-1 sm:place-self-end">
              = $ {(Number(item.price) * Number(item.quantity)).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="flex justify-between sm:mx-2">
          <button
            onClick={handleNew}
            className="opacity-80 hover:opacity-100 transition-all"
          >
            + Add more
          </button>
          <span className="select-text">Total: $ {total()}</span>
        </div>
      </div>
    </div>
  );
};
