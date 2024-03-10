import { create } from "zustand";

type PromptResponseStore = {
  response: string;
  addResponse: (response: string) => void;
  removePromptResponse: (prompt: string) => void;
};

export const usePromptResponseStore = create<PromptResponseStore>((set) => ({
  response: "",
  addResponse: (response) => set((state) => ({ response: response })),
  removePromptResponse: (response) =>
    set((state) => ({
      response: state.response.replace(
        `Prompt: ${prompt} - Response: ${state.response}`,
        ""
      ),
    })),
}));
