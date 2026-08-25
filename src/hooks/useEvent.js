import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function useEvent(eventId) {
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: async () => {
      const eventRef = doc(db, "events", eventId);
      const snapshot = await getDoc(eventRef);

      if (!snapshot.exists()) {
        throw new Error("Event not found");
      }

      return {
        id: snapshot.id,
        ...snapshot.data(),
      };
    },
    enabled: !!eventId,
  });
}
