import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import useAuthLoad from "../hooks/useAuthLoad";
//@ts-ignore
import Delete from "../assets/trash.svg?react";
//@ts-ignore
import Edit from "../assets/pencil.svg?react";
//@ts-ignore
import Check from "../assets/check.svg?react";

type todoType = {
  id: string;
  text: string;
  check: boolean;
  dateTime: Timestamp;
};

export const ToDo = () => {
  const [todos, setTodos] = useState<Array<todoType>>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [fetchTrigger, setFetchTrigger] = useState<boolean>(true);
  const { user, loading } = useAuthLoad();

  useEffect(() => {
    const fetchTodos = async () => {
      const todosRef = collection(db, "users", user!.uid, "todos");
      const q = query(todosRef, orderBy("dateTime"));
      const res = await getDocs(q);
      const fetchedTodos = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(fetchedTodos as todoType[]);
      setFetchTrigger(false);
    };
    if (!loading) fetchTodos();
  }, [user, fetchTrigger]);

  const handleNew = async () => {
    if (inputValue.replace(/ /g, "") != "") {
      const todosRef = collection(db, "users", user!.uid, "todos");
      await addDoc(todosRef, {
        text: inputValue,
        check: false,
        dateTime: Timestamp.now(),
      });
      setFetchTrigger(true);
      setInputValue("");
    }
  };
  const handleDelete = async (i: number) => {
    const todosRef = collection(db, "users", user!.uid, "todos");
    await deleteDoc(doc(todosRef, todos[i].id));
    setFetchTrigger(true);
  };
  const handleEdit = async (i: number) => {
    setInputValue(todos[i].text);
    await handleDelete(i);
  };
  const handleCheck = async (i: number) => {
    const todosRef = collection(db, "users", user!.uid, "todos");
    const todo = doc(todosRef, todos[i].id);
    await updateDoc(todo, { check: !todos[i].check });
    setFetchTrigger(true);
  };
  return (
    <div>
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={setInputValue}
          placeholder="Write a new To-Do"
          maxLength={100}
          style="w-full"
        />
        <Button onClick={handleNew} text="Add to list" style="w-48" />
      </div>
      <div className="flex flex-col mt-4 gap-3">
        {todos.length == 0 && !fetchTrigger ? (
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/5 font-bold text-xl text-neutral-600 select-none text-center text-nowrap">
            Your to-do list is empty
          </p>
        ) : (
          todos.map((item, i) => (
            <div
              key={i}
              className={`${
                fetchTrigger && "opacity-75"
              } p-2 border-2 border-neutral-900 shadow-md flex items-center justify-between rounded-md transition-all`}
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
                {!item.check && (
                  <Edit
                    className="w-5 h-5 fill-neutral-900 cursor-pointer"
                    onClick={() => handleEdit(i)}
                  />
                )}
                <Delete
                  className="w-5 h-5 fill-neutral-900 hover:fill-red-600 cursor-pointer transition-all"
                  onClick={() => handleDelete(i)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
