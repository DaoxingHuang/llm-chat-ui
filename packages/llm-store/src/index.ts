import type { ChatSession, Message, UserSettings } from "@llm/core";
import { del, get, set } from "idb-keyval";
import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

interface StoreState {
  sessions: ChatSession[];
  currentSessionId: string | null;
  messages: Message[];
  settings: UserSettings;
  setSessions: (sessions: ChatSession[] | ((prev: ChatSession[]) => ChatSession[])) => void;
  setCurrentSessionId: (id: string | null) => void;
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
  setSettings: (settings: UserSettings | ((prev: UserSettings) => UserSettings)) => void;
}

const DEFAULT_SETTINGS: UserSettings = {
  theme: "dark",
  language: "en",
  mode: "developer",
  enableThinking: true,
  enableTools: true,
  denseMode: false,
  safetyLevel: "medium",
  protocol: "mock"
};

// Storage Types
export type StorageType = "local" | "indexeddb" | "server";

// Storage Factory
class StorageFactory {
  static create(type: StorageType = "local"): StateStorage {
    switch (type) {
      case "indexeddb":
        return {
          getItem: async (name: string): Promise<string | null> => {
            return (await get(name)) || null;
          },
          setItem: async (name: string, value: string): Promise<void> => {
            await set(name, value);
          },
          removeItem: async (name: string): Promise<void> => {
            await del(name);
          }
        };
      case "server":
        return {
          getItem: async (name: string): Promise<string | null> => {
            console.warn("Server storage not implemented yet");
            // TODO: Implement server-side storage fetch
            return null;
          },
          setItem: async (name: string, value: string): Promise<void> => {
            console.warn("Server storage not implemented yet");
            // TODO: Implement server-side storage save
          },
          removeItem: async (name: string): Promise<void> => {
            console.warn("Server storage not implemented yet");
            // TODO: Implement server-side storage delete
          }
        };
      case "local":
      default:
        return localStorage;
    }
  }
}

// Configure storage type here
const CURRENT_STORAGE_TYPE: StorageType = "local";

export const useLLMStore = create<StoreState>()(
  persist(
    (set) => ({
      sessions: [],
      currentSessionId: null,
      messages: [],
      settings: DEFAULT_SETTINGS,
      setSessions: (sessions) =>
        set((state) => ({
          sessions: typeof sessions === "function" ? (sessions as Function)(state.sessions) : sessions
        })),
      setCurrentSessionId: (id) => set({ currentSessionId: id }),
      setMessages: (messages) =>
        set((state) => ({
          messages: typeof messages === "function" ? (messages as Function)(state.messages) : messages
        })),
      setSettings: (settings) =>
        set((state) => ({
          settings: typeof settings === "function" ? (settings as Function)(state.settings) : settings
        }))
    }),
    {
      name: "llm-chat-store",
      version: 1, // Increment this if you change the store structure
      migrate: (persistedState, version) => {
        if (version === 1) {
          // Ensure persistedState is an object before spreading to avoid TS errors
          if (persistedState != null && typeof persistedState === "object") {
            return { ...(persistedState as Record<string, unknown>), token: null };
          }
          return { token: null };
        }
        return persistedState;
      },
      // Use the factory to create the storage adapter
      storage: createJSONStorage(() => StorageFactory.create(CURRENT_STORAGE_TYPE))
    }
  )
);
