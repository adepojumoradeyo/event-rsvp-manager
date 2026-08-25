import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (eventId) => {
      const guestsRef = collection(db, "events", eventId, "guests");
      const guestsSnapshot = await getDocs(guestsRef);

      await Promise.all(
        guestsSnapshot.docs.map((guest) => deleteDoc(guest.ref)),
      );

      await deleteDoc(doc(db, "events", eventId));
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });
}
