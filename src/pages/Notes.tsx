import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import Loading from "../components/Loading";
import { Button } from "../components/Button";
//@ts-ignore
import Back from "../assets/back.svg?react";
//@ts-ignore
import Delete from "../assets/trash.svg?react";
//@ts-ignore
import Edit from "../assets/pencil.svg?react";

type noteType = {
  id: string;
  title: string;
  text: string;
  dateTime: string;
};

export const Notes = () => {
  const [notes, setNotes] = useState<Array<noteType>>([
    {
      id: "asd",
      title: "smol titel",
      text: "odiasnsoaind",
      dateTime: new Date(Timestamp.now().toDate()).toLocaleString(),
    },
    {
      id: "asd",
      title: "Long ass title something something something",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, temporibus reprehenderit. Distinctio mollitia quis fuga, ex exercitationem libero perferendis ea. Cupiditate ut dolore quos assumenda expedita totam eaque maxime officiis?",
      dateTime: new Date(Timestamp.now().toDate()).toLocaleString(),
    },
  ]);
  const [note, setNote] = useState<noteType>();
  const [editor, setEditor] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(false);

  return fetching && notes.length === 0 ? (
    <Loading />
  ) : (
    <div className="flex">
      <div
        className={`flex flex-col gap-3 md:flex md:w-1/2 md:pr-2 transition-all 
        ${(note || editor) && "hidden"}`}
      >
        <Button
          onClick={() => {
            setEditor(true);
            setNote(undefined);
          }}
          text="Create a new note"
          style=""
        />
        <div className="flex flex-col gap-3">
          {notes.map((note, i) => (
            <div
              key={i}
              onClick={() => {
                setNote(notes[i]);
                setInputTitle("");
                setInputText("");
                setEditor(false);
              }}
              className="p-3 gap-1 border-2 border-neutral-900 shadow-md flex flex-col rounded-md cursor-pointer select-none transition-all"
            >
              <h1 className="text-lg font-bold leading-5 line-clamp-1">
                {note.title}
              </h1>
              <p className="text-sm font-bold opacity-80 line-clamp-1 leading-4">
                {note.text ? note.text : "No additional text"}
              </p>
              <p className="text-xs font-bold opacity-80 leading-3">
                {note.dateTime}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`flex flex-col w-full gap-3 md:w-1/2 md:pl-2 transition-all 
        ${!note && !editor && "hidden"}`}
      >
        {note ? (
          <>
            <div className="h-10 flex items-center justify-between">
              <Back
                onClick={() => {
                  setNote(undefined);
                  setEditor(false);
                }}
                className="w-10 h-10 p-0.5 shadow-md cursor-pointer border-2 border-neutral-900 rounded-md"
              />
              <div className="flex gap-2">
                <Edit
                  onClick={() => {
                    setInputTitle(note.title);
                    setInputText(note.text);
                    setNote(undefined);
                    setEditor(true);
                  }}
                  className="w-10 h-10 p-2 shadow-md cursor-pointer border-2 border-neutral-900 rounded-md"
                />
                <Delete className="w-10 h-10 p-2 shadow-md cursor-pointer border-2 border-neutral-900 rounded-md hover:fill-red-600 transition-all" />
              </div>
            </div>
            <div className="p-5 border-2 border-neutral-900 shadow-md flex flex-col gap-2 rounded-md transition-all">
              <h1 className="text-2xl sm:text-3xl font-bold">{note?.title}</h1>
              <p className="text-lg font-semibold leading-6">{note?.text}</p>
            </div>
          </>
        ) : (
          editor && (
            <div>
              <div className="p-5 border-2 border-neutral-900 shadow-md flex flex-col gap-2 rounded-md transition-all">
                <input
                  value={inputTitle}
                  onChange={(e: any) => setInputTitle(e.target.value)}
                  placeholder="Title"
                  className="text-2xl sm:text-3xl sm:leading-5 font-bold"
                />
                <textarea
                  maxLength={1000}
                  value={inputText}
                  onChange={(e: any) => setInputText(e.target.value)}
                  placeholder="Write note here"
                  className="text-lg font-semibold leading-6 w-full outline-none resize-none h-96"
                />
              </div>
              <div className="flex gap-2 mt-3">
                <Button
                  onClick={() => {
                    setInputTitle("");
                    setInputText("");
                    setEditor(false);
                  }}
                  text="Cancel"
                  style="w-1/2"
                />
                <Button onClick={() => {}} text="Save" style="w-1/2" />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
