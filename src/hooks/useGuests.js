import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function useGuests(eventId) {
  return useQuery({
    queryKey: ["guests", eventId],
    queryFn: async () => {
      const snapshot = await getDocs(
        collection(db, "events", eventId, "guests"),
      );

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
    enabled: !!eventId,
  });
}
