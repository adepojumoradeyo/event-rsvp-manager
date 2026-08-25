import { useState } from "react";
import useAddGuest from "../hooks/useAddGuest";
import useGuests from "../hooks/useGuests";
import { useUpdateGuest } from "../hooks/useUpdateGuest";
import { useDeleteGuest } from "../hooks/useDeleteGuest";
import { useNavigate, useParams } from "react-router-dom";
import useEvent from "../hooks/useEvent";
import backsvg from "/images/arrow-left.svg";

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

        <div className="mb-5">
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
              className="p-2 rounded-lg w-2/5 text-black outline-blue-300"
            />

            <button
              type="submit"
              className="text-base p-2 rounded-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
            >
              Add guest
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-center mb-5">Guests</h2>

          {guests.length === 0 ? (
            <p>No guests yet.</p>
          ) : (
            <div>
              {guests.map((guest) => (
                <div key={guest.id}>
                  <div className="flex">
                    <h2 className=" basis-2/4 p-3 capitalize">{guest.name}</h2>
                    <p className=" basis-1/6">{guest.status}</p>

                    <div className="basis-1/6 flex flex-col text-xs ">
                      <button
                        onClick={() =>
                          updateGuest.mutate({
                            guestId: guest.id,
                            status: "accepted",
                          })
                        }
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
                      >
                        Decline
                      </button>
                    </div>

                    <div className="basis-1/6 text-center">
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
      </div>
    </>
  );
}

export default EventDetails;
