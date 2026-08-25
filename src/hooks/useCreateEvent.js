import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (event) => {
      const docRef = await addDoc(collection(db, "events"), event);

      return {
        id: docRef.id,
        ...event,
      };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });
}
