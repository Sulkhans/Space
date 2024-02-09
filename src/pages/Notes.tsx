import { useEffect, useState } from "react";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import useAuthLoad from "../hooks/useAuthLoad";
import { db } from "../config/firebase";
import { Button } from "../components/Button";
import Loading from "../components/Loading";
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
  dateTime: Timestamp;
};

export const Notes = () => {
  const [notes, setNotes] = useState<Array<noteType>>([]);
  const [note, setNote] = useState<noteType>();
  const [editor, setEditor] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(true);
  const { user, loading } = useAuthLoad();

  useEffect(() => {
    const fetchNotes = async () => {
      const notesRef = collection(db, "users", user!.uid, "notes");
      const q = query(notesRef, orderBy("dateTime"));
      const res = await getDocs(q);
      const fetchedNotes = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(fetchedNotes as noteType[]);
      setFetching(false);
    };
    if (!loading) fetchNotes();
  }, [user, fetching]);

  const format = (t: Timestamp) =>
    new Date(t.toDate()).toLocaleString("de-DE", {
      day: "numeric",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  const closeEditor = () => {
    setInputTitle("");
    setInputText("");
    setEditor(false);
  };
  const handleNew = async () => {
    if (
      inputTitle.replace(/ /g, "") != "" &&
      inputText.replace(/ /g, "") != ""
    ) {
      const notesRef = collection(db, "users", user!.uid, "notes");
      await addDoc(notesRef, {
        title: inputTitle,
        text: inputText,
        dateTime: Timestamp.now(),
      });
      setFetching(true);
      closeEditor();
    }
  };
  const handleDelete = async () => {
    const notesRef = collection(db, "users", user!.uid, "notes");
    await deleteDoc(doc(notesRef, note?.id));
    setFetching(true);
    setNote(undefined);
  };
  const handleEdit = async () => {
    const notesRef = collection(db, "users", user!.uid, "notes");
    const noteRef = doc(notesRef, note?.id);
    await updateDoc(noteRef, { title: inputTitle, text: inputText });
    setFetching(true);
    closeEditor();
  };

  return fetching && notes.length === 0 ? (
    <Loading />
  ) : (
    <div className="flex">
      <div
        className={`flex flex-col gap-3 w-full md:flex md:w-1/2 md:pr-2 transition-all 
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
              className={`p-3 gap-1 border-2 border-neutral-900 shadow-md flex flex-col rounded-md cursor-pointer select-none transition-all
              ${fetching && "pointer-events-none opacity-70"}`}
            >
              <h1 className="text-lg font-bold leading-5 line-clamp-1">
                {note.title}
              </h1>
              <p className="text-sm font-bold opacity-80 line-clamp-1 leading-4">
                {note.text}
              </p>
              <p className="text-xs font-bold opacity-80 leading-4">
                {format(note.dateTime)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`flex flex-col w-full gap-3 md:w-1/2 md:pl-2 transition-all 
        ${!note && !editor && "hidden"}`}
      >
        {editor ? (
          <div>
            <div className="p-5 border-2 border-neutral-900 shadow-md flex flex-col gap-2 rounded-md transition-all">
              <input
                maxLength={30}
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
              <Button onClick={closeEditor} text="Cancel" style="w-1/2" />
              <Button
                onClick={note ? handleEdit : handleNew}
                text="Save"
                style="w-1/2"
              />
            </div>
          </div>
        ) : (
          note && (
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
                      setEditor(true);
                    }}
                    className="w-10 h-10 p-2 shadow-md cursor-pointer border-2 border-neutral-900 rounded-md"
                  />
                  <Delete
                    onClick={handleDelete}
                    className="w-10 h-10 p-2 shadow-md cursor-pointer border-2 border-neutral-900 rounded-md hover:fill-red-600 transition-all"
                  />
                </div>
              </div>
              <div className="p-5 border-2 border-neutral-900 shadow-md flex flex-col gap-2 rounded-md transition-all">
                <h1 className="text-2xl sm:text-3xl font-bold break-all">
                  {note.title}
                </h1>
                <p className="text-lg font-semibold leading-6 break-all">
                  {note.text}
                </p>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};
