import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export function useUpdateEvents() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ eventId, updates }) => {
      await updateDoc(doc(db, "events", eventId), updates);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });
}
