import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function useEvents(uid) {
  return useQuery({
    queryKey: ["events", uid],
    queryFn: async () => {
      const eventsQuery = query(
        collection(db, "events"),
        where("hostId", "==", uid),
      );

      const snapshot = await getDocs(eventsQuery);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
    enabled: !!uid,
  });
}
