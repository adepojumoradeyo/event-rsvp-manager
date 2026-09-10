import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import useCreateEvent from "../hooks/useCreateEvent";
import { useUpdateEvents } from "../hooks/useUpdateEvents";
import ErrorMessage from "./ErrorMessage";

function CreateEvent({ onClose, eventToEdit }) {
  const { user } = useAuth();
  const CreateEvent = useCreateEvent();
  const updateEvent = useUpdateEvents();

  const [title, setTitle] = useState(eventToEdit?.title || "");
  const [date, setDate] = useState(eventToEdit?.date || "");
  const [description, setDescription] = useState(
    eventToEdit?.description || "",
  );
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !date || !description.trim()) {
      setError("please fill in all fields.");
      return;
    }

    try {
      if (eventToEdit) {
        await updateEvent.mutateAsync({
          eventId: eventToEdit.id,
          updates: {
            title: title.trim(),
            date,
            description: description.trim(),
          },
        });
      } else {
        await CreateEvent.mutateAsync({
          title: title.trim(),
          date,
          description: description.trim(),
          hostId: user.uid,
        });
      }

      setTitle("");
      setDate("");
      setDescription("");
      onClose();
    } catch (error) {
      console.log(error);
      setError(
        eventToEdit
          ? "unable to save changes. please try again"
          : "unable to create event. please try again",
      );
    }
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

      <ErrorMessage message={error} />

      <button
        type="submit"
        disabled={CreateEvent.isPending || updateEvent.isPending}
        className="text-lg p-1 rounded-lg text-gray-300 bg-red-600 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring disabled:cursor-not-allowed"
      >
        {eventToEdit
          ? updateEvent.isPending
            ? "Saving changes..."
            : "Save Changes"
          : CreateEvent.isPending
            ? "Creating event..."
            : "Create Event"}
      </button>
    </form>
  );
}

export default CreateEvent;
