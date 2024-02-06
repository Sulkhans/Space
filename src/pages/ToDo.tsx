import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
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
import Loading from "../components/Loading";
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
  const [input, setInput] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(true);
  const [edit, setEdit] = useState<number>();
  const { user, loading } = useAuthLoad();
  const ref = useRef<HTMLInputElement | null>(null);

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
      setFetching(false);
    };
    if (!loading) fetchTodos();
  }, [user, fetching]);

  const handleNew = async () => {
    if (input.replace(/ /g, "") != "") {
      const todosRef = collection(db, "users", user!.uid, "todos");
      await addDoc(todosRef, {
        text: input,
        check: false,
        dateTime: Timestamp.now(),
      });
      setFetching(true);
      setInput("");
    }
  };
  const handleDelete = async (i: number) => {
    const todosRef = collection(db, "users", user!.uid, "todos");
    await deleteDoc(doc(todosRef, todos[i].id));
    setFetching(true);
  };
  const handleCheck = async (i: number) => {
    const todosRef = collection(db, "users", user!.uid, "todos");
    const todo = doc(todosRef, todos[i].id);
    await updateDoc(todo, { check: !todos[i].check });
    setFetching(true);
  };
  const handleEdit = async (i: number) => {
    const todosRef = collection(db, "users", user!.uid, "todos");
    const todo = doc(todosRef, todos[i].id);
    await updateDoc(todo, { text: input });
    setFetching(true);
    setInput("");
    setEdit(undefined);
  };
  const handleEditMode = (i: number) => {
    setEdit(i);
    setInput(todos[i].text);
    ref.current?.focus();
  };
  const handleCancelEdit = () => {
    setEdit(undefined);
    setInput("");
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
          placeholder="Write a new To-Do"
          className="w-full p-2 border-2 border-neutral-900 hover:border-neutral-950 shadow-md rounded-md font-bold placeholder:text-neutral-900"
          maxLength={100}
          ref={ref}
        />
        {edit ? (
          <>
            <Button onClick={handleCancelEdit} text="Cancel" style="w-36" />
            <Button
              onClick={() => handleEdit(edit)}
              text="Confirm"
              style="w-36"
            />
          </>
        ) : (
          <Button onClick={handleNew} text="Add to list" style="w-36" />
        )}
      </div>
      <div className="flex flex-col my-4 gap-3">
        {fetching && todos.length == 0 ? (
          <Loading />
        ) : todos.length == 0 ? (
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/5 font-bold text-xl text-neutral-600 select-none text-center text-nowrap">
            Your to-do list is empty
          </p>
        ) : (
          todos.map((item, i) => (
            <div
              key={i}
              className={`p-2 border-2 border-neutral-900 shadow-md flex items-center justify-between rounded-md transition-all
              ${(edit || fetching) && "pointer-events-none opacity-70"}`}
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
                className={`pl-7 pr-16 font-bold break-all select-none
                ${item.check && "line-through"} `}
              >
                {item.text}
              </p>
              <div className="absolute right-7 flex gap-2">
                {!item.check && (
                  <Edit
                    className="w-5 h-5 fill-neutral-900 cursor-pointer"
                    onClick={() => handleEditMode(i)}
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
