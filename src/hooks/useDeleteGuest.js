import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";

export function useDeleteGuest(eventId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (guestId) => {
      await deleteDoc(doc(db, "events", eventId, "guests", guestId));
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guests", eventId],
      });
    },
  });
}
