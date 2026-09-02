import { useState } from "react";
import useAddGuest from "../hooks/useAddGuest";
import useGuests from "../hooks/useGuests";
import { useUpdateGuest } from "../hooks/useUpdateGuest";
import { useDeleteGuest } from "../hooks/useDeleteGuest";
import { useNavigate, useParams } from "react-router-dom";
import useEvent from "../hooks/useEvent";
import backsvg from "/images/arrow-left.svg";
import savethedate from "/public/images/save-the-date.jpg";

function EventDetails() {
  const { eventId } = useParams();

  const navigate = useNavigate();

  const {
    data: event,
    isLoading: eventLoading,
    error: eventError,
  } = useEvent(eventId);

  const { data: guests = [], isloading, error } = useGuests(eventId);
  const addGuest = useAddGuest(eventId);
  const [name, setName] = useState("");
  const updateGuest = useUpdateGuest(eventId);
  const deleteGuest = useDeleteGuest(eventId);

  if (eventLoading) return <p>loading event...</p>;

  if (eventError) return <p>{eventError.message}</p>;

  if (isloading) return <p>loading guests...</p>;

  if (error) return <p>{error.message}</p>;
  return (
    <>
      <div className="min-h-screen p-5 bg-black text-white flex flex-col gap-3 ">
        <div
          className="inline-flex gap-1 self-start bg-white/15 p-2 rounded-full text-gray-200 mb-4"
          onClick={() => navigate("/")}
        >
          <img src={backsvg} alt="" />
          <button>Back</button>
        </div>

        <h1 className="text-center text-gray-300 font-semi-bold text-2xl self-center mb-5 capitalize">
          {event.title}
        </h1>

        <div>
          <h2 className="text-2xl font-semibold mb-5">Guests</h2>

          {guests.length === 0 ? (
            <p>No guests yet.</p>
          ) : (
            <div className=" grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {guests.map((guest) => (
                <div key={guest.id} className="bg-red-900 rounded-md p-5">
                  <img src={savethedate} alt="" className="" />

                  <div className=" flex flex-col gap-2 py-5">
                    <div>
                      <h1 className="text-2xl font-bold tracking-tight text-white capitalize">
                        {event.title}
                      </h1>

                      <p className="mt-1 text-sm text-gray-400">
                        You're invited to celebrate with us 🎉{" "}
                        <span className="text-white capitalize font-bold">
                          {guest.name}
                        </span>
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/5 p-4 space-y-3">
                      {event.date && (
                        <div>
                          <p className="text-xs uppercase tracking-wider text-gray-500">
                            Date
                          </p>
                          <p className="font-bold mt-1  text-gray-200">
                            {new Date(
                              event.date + "T00:00:00",
                            ).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      )}
                    </div>

                    {event.description && (
                      <p className="text-xs uppercase tracking-wider text-gray-500 ">
                        {event.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                      <span className="text-sm text-gray-400">RSVP Status</span>

                      <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium ">
                        {guest.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between py-2  rounded-lg  text-xs ">
                    <button
                      onClick={() =>
                        updateGuest.mutate({
                          guestId: guest.id,
                          status: "accepted",
                        })
                      }
                      className="bg-white/20 py-2 px-5 rounded-lg"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        updateGuest.mutate({
                          guestId: guest.id,
                          status: "declined",
                        })
                      }
                      className="bg-white/20 py-2 px-5 rounded-lg"
                    >
                      Decline
                    </button>

                    <div className="bg-white/20 py-2 px-5 rounded-lg">
                      <button onClick={() => deleteGuest.mutate(guest.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="my-5 text-center">
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              if (!name.trim()) {
                return;
              }

              await addGuest.mutateAsync({
                name,
                status: "pending",
              });

              setName("");
            }}
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="guest name"
              required
              className="p-2 rounded-lg w-2/5 text-black outline-blue-300 mr-2"
            />

            <button
              type="submit"
              className="text-base p-2 rounded-lg bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-violet-300"
            >
              Add guest
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EventDetails;
