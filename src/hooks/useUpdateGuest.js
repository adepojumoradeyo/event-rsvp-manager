import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export function useUpdateGuest(eventId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ guestId, status }) => {
      await updateDoc(doc(db, "events", eventId, "guests", guestId), {
        status,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guests", eventId],
      });
    },
  });
}
