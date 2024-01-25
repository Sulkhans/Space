import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
//@ts-ignore
import Delete from "../assets/trash.svg?react";
//@ts-ignore
import Edit from "../assets/pencil.svg?react";
//@ts-ignore
import Check from "../assets/check.svg?react";

type todoType = {
  text: string;
  check: boolean;
};

export const ToDo = () => {
  const [todos, setTodos] = useState<Array<todoType>>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const handleNew = () => {
    if (inputValue.replace(/ /g, "") != "") {
      const updated = [...todos];
      updated.push({ text: inputValue, check: false });
      setTodos(updated);
      setInputValue("");
    }
  };
  const handleDelete = (i: number) => {
    const updated = [...todos];
    updated.splice(i, 1);
    setTodos(updated);
  };
  const handleEdit = (i: number) => {
    setInputValue(todos[i].text);
    handleDelete(i);
  };
  const handleCheck = (i: number) => {
    const updated = [...todos];
    updated[i].check = !updated[i].check;
    setTodos(updated);
  };
  return (
    <div>
      <div className="flex gap-2">
        <Input
          value={inputValue}
          setValue={setInputValue}
          placeholder="Write a new To-Do"
          maxLength={100}
          style="w-full"
        />
        <Button onClick={handleNew} text="Add to list" style="w-48" />
      </div>
      <div className="flex flex-col mt-4 gap-3">
        {todos.map((item, i) => (
          <div
            key={i}
            className="p-2 border-2 border-neutral-900 shadow-md flex items-center justify-between rounded-md"
          >
            <div
              className="w-5 h-5 flex items-center justify-center rounded-md border-2 border-neutral-900 cursor-pointer absolute"
              onClick={() => handleCheck(i)}
            >
              <Check
                className={`w-[14px] h-[14px] transition-all
                  ${item.check ? "fill-neutral-900" : "fill-none"}`}
              />
            </div>
            <p
              className={`${
                item.check && "line-through"
              } pl-7 pr-16 font-bold break-all select-none`}
            >
              {item.text}
            </p>
            <div className="absolute right-7 flex gap-2">
              <Edit
                className="w-5 h-5 fill-neutral-900 cursor-pointer"
                onClick={() => handleEdit(i)}
              />
              <Delete
                className="w-5 h-5 fill-neutral-900 hover:fill-red-600 cursor-pointer transition-all"
                onClick={() => handleDelete(i)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
