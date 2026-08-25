// import CreateEvent from "../components/CreateEvent";
// import { useAuth } from "../context/AuthContext";
// import useEvents from "../hooks/useEvents";
// import { useDeleteEvent } from "../hooks/useDeleteEvent";
// import { useUpdateEvents } from "../hooks/useUpdateEvents";
// import { useNavigate } from "react-router-dom";

// function Dashboard() {
//   const { user, signOut } = useAuth();
//   const name = user?.email.split("@")[0];

//   const navigate = useNavigate();

//   const deleteEvent = useDeleteEvent();

//   const updateEvent = useUpdateEvents();

//   const { data: events = [], isLoading, error } = useEvents(user?.uid);

//   if (isLoading) return <p>loading events...</p>;

//   if (error) return <p>failed to load events.</p>;

//   return (
//     <div className="min-h-screen bg-black text-white p-6">
//       <button onClick={signOut} className="w-6 h-6  rounded-full">
//         x
//       </button>

//       <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
//         <h1 className="text-3xl font-bold text-gray-900">
//           Welcome, <span>{name} 👋</span>
//         </h1>

//         <div className="flex items-center justify-between ">
//           <p className=" text-gray-500">
//             Manage your events, guests, and RSVPs all in one place.
//           </p>

//           <CreateEvent />
//         </div>
//       </div>

//       <div className="flex items-center gap-2">
//         <h2>Your Events</h2>
//         <p className="">Total Events: {events.length}</p>
//       </div>

//       {events.length === 0 ? (
//         <p>you dont have any events yet.</p>
//       ) : (
//         events.map((event) => (
//           <div
//             key={event.id}
//             className=" rounded-2xl bg-yellow-500 p-5 shadow-sm transition hover:shadow-md"
//           >
//             <div className="fle items-center justify-between ">
//               {/* Event title */}
//               <button
//                 onClick={() => navigate(`/events/${event.id}`)}
//                 className="text-xl font-bold text-gray-900 hover:text-blue-600"
//               >
//                 {event.title}
//               </button>

//               {/* Actions */}
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => {
//                     const title = prompt(
//                       "Enter the new event title:",
//                       event.title,
//                     );

//                     if (title && title !== event.title) {
//                       updateEvent.mutate({
//                         eventId: event.id,
//                         updates: { title },
//                       });
//                     }
//                   }}
//                   className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() => deleteEvent.mutate(event.id)}
//                   className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Dashboard;

import CreateEvent from "../components/CreateEvent";
import { useAuth } from "../context/AuthContext";
import useEvents from "../hooks/useEvents";
import { useDeleteEvent } from "../hooks/useDeleteEvent";
import { useUpdateEvents } from "../hooks/useUpdateEvents";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, signOut } = useAuth();
  const name = user?.email.split("@")[0];

  const navigate = useNavigate();

  const deleteEvent = useDeleteEvent();
  const updateEvent = useUpdateEvents();

  const { data: events = [], isLoading, error } = useEvents(user?.uid);

  if (isLoading) return <p>loading events...</p>;

  if (error) return <p>failed to load events.</p>;

  return (
    <div className="min-h-screen bg-black p-4 text-white sm:p-6">
      <button
        onClick={signOut}
        className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black hover:bg-gray-200"
      >
        ×
      </button>

      <div className="text-center mb-8 rounded-2xl p-5 sm:p-6">
        <h1 className="text-2xl font-bold text-gray-300 sm:text-3xl">
          Welcome, <br /> <span>{name} 👋</span>
        </h1>

        <p className="text-gray-300 mt-4">
          Manage your events, guests, and RSVPs all in one place.
        </p>
      </div>
      <CreateEvent />

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
              className="flex flex-col rounded-xl h-64 sm:h-64  border border-zinc-950 bg-zinc-950 p-4 transition hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900"
            >
              <button
                onClick={() => navigate(`/events/${event.id}`)}
                className=" basis-11/12 "
              >
                <span className="px-4 text-2xl font-bold text-white ">
                  {event.title}
                </span>
              </button>

              <div className="flex gap-2 ">
                <button
                  onClick={() => {
                    const title = prompt(
                      "Enter the new event title:",
                      event.title,
                    );

                    if (title && title !== event.title) {
                      updateEvent.mutate({
                        eventId: event.id,
                        updates: { title },
                      });
                    }
                  }}
                  className="flex-1 rounded-lg  px-3 py-2 text-sm font-medium "
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteEvent.mutate(event.id)}
                  className="flex-1 rounded-lg  px-3 py-2 text-sm font-medium "
                >
                  Delete
                </button>
              </div>
              {/* </di> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
