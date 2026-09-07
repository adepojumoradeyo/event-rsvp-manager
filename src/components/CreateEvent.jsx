import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import useCreateEvent from "../hooks/useCreateEvent";
import { useUpdateEvents } from "../hooks/useUpdateEvents";

function CreateEvent({ onClose, eventToEdit }) {
  const { user } = useAuth();
  const CreateEvent = useCreateEvent();
  const updateEvent = useUpdateEvents();

  const [title, setTitle] = useState(eventToEdit?.title || "");
  const [date, setDate] = useState(eventToEdit?.date || "");
  const [description, setDescription] = useState(
    eventToEdit?.description || "",
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !date || !description.trim) {
      return;
    }

    if (eventToEdit) {
      await updateEvent.mutateAsync({
        eventId: eventToEdit.id,
        updates: {
          title,
          date,
          description,
        },
      });
    } else {
      await CreateEvent.mutateAsync({
        title,
        date,
        description,
        hostId: user.uid,
      });
    }

    setTitle("");
    setDate("");
    setDescription("");

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="event title"
        required
        className="w-full rounded-lg border border-gray-300 p-3 text-black outline-none focus:border-violet-500"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="w-full rounded-lg border border-gray-300 p-3 text-black outline-none focus:border-violet-500"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="About the event"
        rows="3"
        className="w-full resize-none rounded-lg border border-gray-300 p-3 text-black outline-none focus:border-violet-500"
        required
      ></textarea>

      <button
        type="submit"
        className="text-lg p-1 rounded-lg text-gray-300 bg-red-600 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring"
      >
        {eventToEdit ? "Save Changes" : "Create Event"}
      </button>
    </form>
  );
}

export default CreateEvent;
