import { AIDrawer } from "@llm/pc-components";
import { useState } from "react";
import { TextChecker } from "./components/TextChecker";

function App() {
  // Controls whether the drawer is visible.
  const [open, setOpen] = useState(false);

  /**
   * Demo AI handler.
   *
   * This function is passed into `AIDrawer` -> `AIContainer` and is called when
   * a descendant component (e.g. TextChecker) executes `sendMessage()`.
   *
   * Replace with real API integration:
   * - call your backend endpoint
   * - stream tokens if needed
   * - return the final response text
   */
  const handleAIRequest = async (msg: string) => {
    console.log("App received AI request:", msg);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return "Checked";
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>PC Components Demo</h1>
      <p>Click the button below to open the AI Text Checker Drawer.</p>

      <button
        onClick={() => setOpen(true)}
        style={{
          padding: "10px 20px",
          background: "#1890ff",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          fontSize: 16
        }}
      >
        Open AI Text Checker
      </button>

      <AIDrawer
        open={open}
        onClose={() => setOpen(false)}
        title={null} // Custom header in component
        width={400}
        onSendMessage={handleAIRequest}
        mockResponse={true}
        maskClosable={true}
        closable={false} // We handle close inside or assume standard drawer behavior
        bodyStyle={{ padding: 0, background: "#f5f5f5" }}
        headerStyle={{ display: "none" }} // Hide default header to match design
      >
        {/*
          Drawer content area:
          - This wrapper adds a small “Beta” badge + close affordance.
          - The actual business UI is `TextChecker`, which consumes AI via `useAI()`.
        */}
        <div style={{ position: "relative", height: "100%" }}>
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 10,
              display: "flex",
              gap: 8,
              alignItems: "center"
            }}
          >
            <span style={{ background: "#ccc", color: "#fff", fontSize: 10, padding: "2px 4px", borderRadius: 2 }}>
              Beta
            </span>
            <span onClick={() => setOpen(false)} style={{ cursor: "pointer", fontSize: 20, color: "#999" }}>
              ×
            </span>
          </div>
          {/* Business component: demonstrates a typical AI workflow inside a container. */}
          <TextChecker />
        </div>
      </AIDrawer>
    </div>
  );
}

export default App;
