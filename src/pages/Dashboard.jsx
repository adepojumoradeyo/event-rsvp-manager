import CreateEvent from "../components/CreateEvent";
import { useAuth } from "../context/AuthContext";
import useEvents from "../hooks/useEvents";
import { useDeleteEvent } from "../hooks/useDeleteEvent";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import party from "/public/images/party.jpg";

function Dashboard() {
  const { user, signOut } = useAuth();
  const name = user?.email.split("@")[0];

  const navigate = useNavigate();

  const deleteEvent = useDeleteEvent();

  const { data: events = [], isLoading, error } = useEvents(user?.uid);

  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  if (isLoading) return <p>loading events...</p>;

  if (error) return <p>failed to load events.</p>;

  return (
    <div className="min-h-screen bg-zinc-800 p-4 text-white sm:p-6">
      {showCreateEvent && (
        // create event form overlay
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 text-black shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Create Event</h2>

              <button
                onClick={() => setShowCreateEvent(false)}
                className="text-2xl text-gray-500 hover:text-black "
              >
                ×
              </button>
            </div>

            <CreateEvent
              onClose={() => {
                setShowCreateEvent(false);
                setEditingEvent(null);
              }}
              eventToEdit={editingEvent}
            />
          </div>
        </div>
      )}
      {/* end of create event form */}

      <div className="text-center mb-8 rounded-2xl p-5">
        <button
          onClick={signOut}
          className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black hover:bg-gray-200"
        >
          ×
        </button>

        <h1 className="text-2xl font-bold text-gray-300 sm:text-3xl">
          Welcome, <br /> <span>{name} 👋</span>
        </h1>

        <p className="text-gray-300 mt-4">
          Manage your events, guests, and RSVPs all in one place.
        </p>
      </div>

      <div className="mb-5 flex items-center justify-between mt-10">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold sm:text-2xl">Your Events</h2>

          <span className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300">
            {events.length}
          </span>
        </div>
      </div>

      {/* Empty State */}
      {events.length === 0 ? (
        <div className="rounded-2xl bg-gray-900 p-10 text-center">
          <p className="text-gray-400">You don't have any events yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => navigate(`/events/${event.id}`)}
              className="rounded-xl border border-zinc-950 bg-red-900 p-4 transition hover:-translate-y-1 hover:border-zinc-700 hover:bg-red-900/80"
            >
              <div className=" basis-11/12 ">
                <img src={party} alt="" className="" />

                <h1 className="text-2xl font-bold my-5 text-center capitalize">
                  {event.title}
                </h1>

                {event.date && (
                  <p className="mb-3 font-bold text-center">
                    {new Date(event.date + "T00:00:00").toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </p>
                )}
                {event.description && (
                  <p className="pb-5 text-sm leading-5 text-gray-200 font-semibold">
                    {event.description}
                  </p>
                )}
              </div>

              <div className="flex gap-2 ">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingEvent(event);
                    setShowCreateEvent(true);
                  }}
                  className="flex-1 rounded-lg  px-3 py-2 text-sm font-medium bg-white/10 "
                >
                  Edit
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteEvent.mutate(event.id);
                  }}
                  className="flex-1 rounded-lg  px-3 py-2 text-sm font-medium bg-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className=" text-center mt-8">
        <button
          onClick={() => setShowCreateEvent(true)}
          className="text-center px-4 py-3 md:px-28 rounded-2xl bg-red-950/95"
        >
          Create Event
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
