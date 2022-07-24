import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import InputField from "../components/InputField";
import TextAreaField from "../components/TextAreaField";

interface Notes {
  notes: {
    id: string;
    title: string;
    content: string;
  }[];
}

interface Inputs {
  id: string;
  title: string;
  context: string;
}

const Home = ({ notes }: Notes) => {
  const router = useRouter();
  const methods = useForm<Inputs>();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleEdit = async (data: Inputs) => {
    try {
      await fetch(`/api/note/${data.id}`, {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  const formSubmitHandler: SubmitHandler<Inputs> = async (data) => {
    try {
      if (data.id) {
        handleEdit(data);
      } else {
        await fetch("/api/createNotes", {
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        refreshData();
      }
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

  return (
    <div>
      <h1 className="text-center font-bold text-2xl my-4 font-mono">Notes</h1>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(formSubmitHandler)}
          className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col"
        >
          <InputField />
          <TextAreaField />
          <input type="submit" className="bg-blue-500 text-white rounded-md" />
        </form>
      </FormProvider>

      <div className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col mt-10">
        <ul>
          {notes.map((note) => {
            return (
              <li key={note.id} className="border-b border-gray-600 p-2 flex">
                <div className="flex-1">
                  <h2 className="font-bold">{note.title}</h2>
                  <p className="text-sm">{note.content}</p>
                </div>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="bg-red-600 px-4 rounded-md text-white"
                >
                  X
                </button>
                <button className="bg-green-600 px-4 rounded-md text-white">
                  Edit
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/getNotes");
  const notes = await res.json();

  return {
    props: {
      notes,
    },
  };
};
