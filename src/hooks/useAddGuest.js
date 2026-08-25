import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function useAddGuest(eventId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (guest) => {
      const docRef = await addDoc(
        collection(db, "events", eventId, "guests"),
        guest,
      );

      return {
        id: docRef.id,
        ...guest,
      };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guests", eventId],
      });
    },
  });
}
