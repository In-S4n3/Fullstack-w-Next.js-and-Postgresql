import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import InputField from "../components/InputField";
import TextAreaField from "../components/TextAreaField";
import { useState } from "react";
import { Data, Notes } from "../types";

const Home = ({ notes }: Notes) => {
  const [editButton, setEditbutton] = useState(false);
  const [formData, setFormData] = useState<Data>({
    title: "",
    content: "",
  });
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const formSubmitHandler = async (e: any) => {
    e.preventDefault();
    try {
      await fetch("/api/createNotes", {
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      refreshData();
      setFormData({ title: "", content: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (formData: Data) => {
    try {
      await fetch(`/api/note/${formData.id}`, {
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });
      refreshData();
      setEditbutton(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/note/${id}`, {
        body: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  const populateForm = (data: Data) => {
    setFormData(data);
    setEditbutton(true);
  };

  return (
    <div>
      <h1 className="text-center font-bold text-2xl my-4 font-mono">Notes</h1>
      <form className="w-auto min-w-[33%] max-w-min mx-auto space-y-6 flex flex-col">
        <InputField setFormData={setFormData} formData={formData} />
        <TextAreaField setFormData={setFormData} formData={formData} />
        {editButton ? (
          <button
            className="bg-blue-500 text-white rounded-md"
            onClick={() => handleEdit(formData)}
          >
            Update
          </button>
        ) : (
          <button
            onClick={(e) => formSubmitHandler(e)}
            className="bg-blue-500 text-white rounded-md"
          >
            Add
          </button>
        )}
      </form>

      <div className="w-auto min-w-[33%] max-w-min mx-auto space-y-6 flex flex-col mt-10">
        <ul>
          {notes.map((note) => {
            return (
              <li
                key={note.id}
                className="border-b border-gray-600 p-2 flex items-center"
              >
                <div className="flex-1">
                  <h2 className="font-bold">{note.title}</h2>
                  <p className="text-sm">{note.content}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => populateForm(note)}
                    className="bg-green-600 px-4 rounded-md text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="bg-red-600 px-4 rounded-md text-white"
                  >
                    X
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/getNotes");
  const notes = await res.json();

  return {
    props: {
      notes,
    },
  };
};
