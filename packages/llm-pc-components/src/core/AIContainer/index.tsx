import React, { createContext, ReactNode, useCallback, useContext, useState } from "react";

/**
 * AIContainer
 *
 * This file defines the shared “AI runtime” context used by all AI HOC components
 * in `@llm/pc-components`.
 *
 * Why this exists:
 * - Many AI-enhanced UI components need the same capability surface:
 *   1) send a message to an agent/model
 *   2) read the last response
 *   3) keep a minimal message history for display/debugging
 *
 * This context is intentionally small and UI-agnostic.
 * Components like `AIDrawer`, future `AIInput`, etc. compose UI around this.
 */

export interface AIContextType {
  /**
   * Send a prompt/message to the AI layer and return the AI response.
   *
   * The concrete transport (HTTP, websocket, SDK call, etc.) is provided by
   * the `onSendMessage` prop on the container.
   */
  sendMessage: (content: string) => Promise<string>;

  /** Last AI response (if any). */
  lastMessage: string | null;

  /**
   * Simple log of messages for demo/debug.
   *
   * Format is currently plain strings like `User: ...` / `AI: ...`.
   * If you later need richer rendering, you can evolve this to structured items.
   */
  history: string[];
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    // Fail fast: this indicates the consumer component is not wrapped by AIContainer
    // (e.g. AIDrawer / AIInput should be the parent).
    throw new Error("useAI must be used within an AIContainer");
  }
  return context;
};

// --- AIContainer Component ---

export interface AIContainerProps {
  /**
   * Called when `sendMessage` is invoked.
   * Implement this to connect to your real AI service.
   */
  onSendMessage?: (content: string) => Promise<string>;

  /**
   * Demo-only switch:
   * When `onSendMessage` is not provided, enabling this will generate a mock response.
   */
  mockResponse?: boolean; // For testing/demo purposes

  /** Children rendered within the provider boundary. */
  children?: ReactNode;
}

export const AIContainer: React.FC<AIContainerProps> = ({ children, onSendMessage, mockResponse = false }) => {
  const [history, setHistory] = useState<string[]>([]);
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      // Record user message immediately (optimistic).
      setHistory((prev) => [...prev, `User: ${content}`]);

      let response = "";

      try {
        // Prefer the real handler if supplied by the host app.
        if (onSendMessage) {
          response = await onSendMessage(content);
        } else if (mockResponse) {
          // Demo fallback: simulate network/compute latency.
          await new Promise((resolve) => setTimeout(resolve, 1000));
          response = `AI Response to: "${content}"`;
        }

        // Record AI response (even if empty string) for debugging.
        setHistory((prev) => [...prev, `AI: ${response}`]);
        setLastMessage(response);
        return response;
      } catch (error) {
        console.error("AI Error:", error);
        return "Error processing request";
      }
    },
    [onSendMessage, mockResponse]
  );

  const contextValue: AIContextType = {
    sendMessage,
    lastMessage,
    history
  };

  // Provider boundary: any descendant can call `useAI()`.
  return <AIContext.Provider value={contextValue}>{children}</AIContext.Provider>;
};
