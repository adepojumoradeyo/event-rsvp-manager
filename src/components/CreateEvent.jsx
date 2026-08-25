import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import useCreateEvent from "../hooks/useCreateEvent";

function CreateEvent() {
  const { user } = useAuth();
  const CreateEvent = useCreateEvent();

  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    await CreateEvent.mutateAsync({
      title,
      hostId: user.uid,
    });

    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center gap-3 "
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="event title"
        required
        className="p-2 rounded-lg w-2/5 text-black outline-blue-300"
      />

      <button
        type="submit"
        className="text-lg p-1 rounded-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 "
      >
        Create Event
      </button>
    </form>
  );
}

export default CreateEvent;
